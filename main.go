package main

import (
  "bytes"
  "fmt"
  "encoding/json"
  "os"
  "log"

  "github.com/gofiber/fiber/v2"
  "github.com/gofiber/fiber/v2/middleware/logger"
  "github.com/gofiber/fiber/v2/middleware/compress"
  "github.com/gofiber/template/django"
  "github.com/dstotijn/go-notion"
)

var is_prod = os.Getenv("ENV") == "prod"

func ConvertRichText(t []notion.RichText) string {
  buf := &bytes.Buffer{}
  for _, word := range t {
    buf.WriteString(word.Text.Content)
  }

  return buf.String()
}

func main() {
  engine := django.New("./views", ".django")
  engine.AddFunc("ConvertRichText", ConvertRichText)

  app := fiber.New(fiber.Config{
    Prefork: is_prod,
    Views: engine,
    PassLocalsToViews: true,
  })

  if !is_prod {
    app.Use(logger.New())
  }
  app.Use(compress.New())

  app.Use(func(c *fiber.Ctx) error {
    c.Set("X-XSS-Protection", "1; mode=block")
    c.Set("X-Content-Type-Options", "nosniff")
    c.Set("X-Download-Options", "noopen")
    c.Set("Strict-Transport-Security", "max-age=63072000; includeSubdomains")
    c.Set("X-Frame-Options", "SAMEORIGIN")
    c.Set("X-DNS-Prefetch-Control", "off")
    c.Set("referrer-policy", "no-referrer, strict-origin-when-cross-origin")

    return c.Next()
  })

  app.Static("/", "./public", fiber.Static{
    Compress: true,
    ByteRange: true,
    MaxAge: 3600,
  })

  app.Get("/", func(c *fiber.Ctx) error {
    theme := c.Cookies("theme", "day")
    return c.Render("index", fiber.Map{
      "theme": theme,
      "theme_is_day": theme == "day",
    }, "layouts/main")
  })

  app.Get("/blog", func(c *fiber.Ctx) error {
    posts := GetPosts()
    s, _ := json.MarshalIndent(posts.Results[0].Properties, "", "\t")
    fmt.Println(fmt.Sprintf("%T", posts.Results[0].Properties.(notion.DatabasePageProperties)["Name"].Title))
    fmt.Printf(string(s))
    fmt.Println()
    test := posts.Results[0].Properties.(notion.DatabasePageProperties)["Name"].Title
    fmt.Println(ConvertRichText(test))
    return c.Render("blog", fiber.Map{
      "posts": posts.Results,
      "theme": "day",
      "theme_is_day": true,
    }, "layouts/main")
  })

  app.Get("/blog/:id", func(c *fiber.Ctx) error {
    post := GetPost(c.Params("id"))
    s, _ := json.MarshalIndent(post, "", "\t")
    fmt.Println(string(s))
    return c.Render("blog_post", fiber.Map{
      "post": post,
      "theme": "day",
      "theme_is_day": true,
    }, "layouts/main")
  })

  app.Post("/theme", func(c *fiber.Ctx) error {
    cookie := new(fiber.Cookie)
    cookie.Name = "theme"

    if c.Cookies("theme", "day") == "day" {
      cookie.Value = "night"
    } else {
      cookie.Value = "day"
    }

    c.Cookie(cookie)

    c.Status(fiber.StatusOK)
    return c.Redirect("/")
  })

  app.Use(func(c *fiber.Ctx) error {
    theme := c.Cookies("theme", "day")
    return c.Status(404).Render("404", fiber.Map{
      "theme": theme,
      "theme_is_day": theme == "day",
    }, "layouts/main")
  })

  log.Fatal(app.Listen(":3000"))
}
