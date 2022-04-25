package main

import (
  "log"

  "github.com/gofiber/fiber/v2"
  "github.com/gofiber/fiber/v2/middleware/logger"
  "github.com/gofiber/fiber/v2/middleware/compress"
  "github.com/gofiber/template/pug"
)

func main() {
  engine := pug.New("./views", ".pug")

  app := fiber.New(fiber.Config{
    Views: engine,
  })

  app.Use(logger.New())
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
