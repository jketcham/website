package main

import (
  "log"
  // "time"

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

  app.Static("/public", "./public")

  app.Get("/", func(c *fiber.Ctx) error {
    theme := c.Cookies("theme", "day")
    return c.Render("index", fiber.Map{
      "Title": "Hello, World!",
      "theme": theme,
      "theme_is_day": theme == "day",
    }, "layouts/main")
  })

  app.Post("/theme", func(c *fiber.Ctx) error {
    cookie := new(fiber.Cookie)
    cookie.Name = "theme"
    print(c.Cookies("theme"))

    if c.Cookies("theme", "day") == "day" {
      cookie.Value = "night"
    } else {
      cookie.Value = "day"
    }

    c.Cookie(cookie)

    c.Status(fiber.StatusOK)
    return c.Redirect("/")
  })

  log.Fatal(app.Listen(":3000"))
}