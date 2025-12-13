import * as React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button, buttonVariants } from "./button"

describe("Button", () => {
  describe("rendering", () => {
    it("should render with children", () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument()
    })

    it("should render as a button element by default", () => {
      render(<Button>Test</Button>)
      const button = screen.getByRole("button")
      expect(button.tagName).toBe("BUTTON")
    })

    it("should have displayName set to Button", () => {
      expect(Button.displayName).toBe("Button")
    })
  })

  describe("variants", () => {
    it("should apply default variant classes when no variant specified", () => {
      render(<Button>Default</Button>)
      const button = screen.getByRole("button")
      expect(button.className).toContain("bg-primary")
      expect(button.className).toContain("text-primary-foreground")
    })

    it("should apply destructive variant classes", () => {
      render(<Button variant="destructive">Delete</Button>)
      const button = screen.getByRole("button")
      expect(button.className).toContain("bg-destructive")
      expect(button.className).toContain("text-destructive-foreground")
    })

    it("should apply outline variant classes", () => {
      render(<Button variant="outline">Outline</Button>)
      const button = screen.getByRole("button")
      expect(button.className).toContain("border")
      expect(button.className).toContain("bg-background")
    })

    it("should apply secondary variant classes", () => {
      render(<Button variant="secondary">Secondary</Button>)
      const button = screen.getByRole("button")
      expect(button.className).toContain("bg-secondary")
      expect(button.className).toContain("text-secondary-foreground")
    })

    it("should apply ghost variant classes", () => {
      render(<Button variant="ghost">Ghost</Button>)
      const button = screen.getByRole("button")
      expect(button.className).toContain("hover:bg-accent")
    })

    it("should apply link variant classes", () => {
      render(<Button variant="link">Link</Button>)
      const button = screen.getByRole("button")
      expect(button.className).toContain("text-primary")
      expect(button.className).toContain("underline-offset-4")
    })
  })

  describe("sizes", () => {
    it("should apply default size classes when no size specified", () => {
      render(<Button>Default Size</Button>)
      const button = screen.getByRole("button")
      expect(button.className).toContain("h-10")
      expect(button.className).toContain("px-4")
      expect(button.className).toContain("py-2")
    })

    it("should apply sm size classes", () => {
      render(<Button size="sm">Small</Button>)
      const button = screen.getByRole("button")
      expect(button.className).toContain("h-9")
      expect(button.className).toContain("px-3")
    })

    it("should apply lg size classes", () => {
      render(<Button size="lg">Large</Button>)
      const button = screen.getByRole("button")
      expect(button.className).toContain("h-11")
      expect(button.className).toContain("px-8")
    })

    it("should apply icon size classes", () => {
      render(<Button size="icon">🔍</Button>)
      const button = screen.getByRole("button")
      expect(button.className).toContain("h-10")
      expect(button.className).toContain("w-10")
    })
  })

  describe("props and refs", () => {
    it("should merge custom className with default classes", () => {
      render(<Button className="custom-class">Custom</Button>)
      const button = screen.getByRole("button")
      expect(button.className).toContain("custom-class")
      expect(button.className).toContain("inline-flex")
    })

    it("should forward ref to button element", () => {
      const ref = React.createRef<HTMLButtonElement>()
      render(<Button ref={ref}>Ref Test</Button>)
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
      expect(ref.current?.textContent).toBe("Ref Test")
    })

    it("should pass through HTML button attributes", async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(
        <Button type="submit" onClick={handleClick} disabled={false}>
          Submit
        </Button>
      )
      const button = screen.getByRole("button")
      expect(button).toHaveAttribute("type", "submit")
      await user.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe("accessibility", () => {
    it("should support disabled state", () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole("button")
      expect(button).toBeDisabled()
      expect(button.className).toContain("disabled:pointer-events-none")
      expect(button.className).toContain("disabled:opacity-50")
    })

    it("should have proper focus styles", () => {
      render(<Button>Focus Test</Button>)
      const button = screen.getByRole("button")
      expect(button.className).toContain("focus-visible:outline-none")
      expect(button.className).toContain("focus-visible:ring-2")
    })
  })
})

describe("buttonVariants", () => {
  it("should return correct classes for default variant and size", () => {
    const classes = buttonVariants()
    expect(classes).toContain("bg-primary")
    expect(classes).toContain("h-10")
  })

  it("should return correct classes for custom variant and size combination", () => {
    const classes = buttonVariants({ variant: "destructive", size: "lg" })
    expect(classes).toContain("bg-destructive")
    expect(classes).toContain("h-11")
    expect(classes).toContain("px-8")
  })

  it("should include additional className when provided", () => {
    const classes = buttonVariants({ className: "extra-class" })
    expect(classes).toContain("extra-class")
  })
})