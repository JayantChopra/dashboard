import * as React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { Label } from "./label"

// Mock the cn utility
vi.mock("@/lib/utils", () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" "),
}))

describe("Label", () => {
  describe("Basic Rendering", () => {
    it("should render a label element", () => {
      render(<Label>Test Label</Label>)
      const label = screen.getByText("Test Label")
      expect(label).toBeDefined()
      expect(label.tagName).toBe("LABEL")
    })

    it("should render children correctly", () => {
      render(
        <Label>
          <span data-testid="child">Child Content</span>
        </Label>
      )
      expect(screen.getByTestId("child")).toBeDefined()
      expect(screen.getByText("Child Content")).toBeDefined()
    })
  })

  describe("ClassName Merging", () => {
    it("should apply default classes", () => {
      render(<Label data-testid="label">Label</Label>)
      const label = screen.getByTestId("label")
      expect(label.className).toContain("text-sm")
      expect(label.className).toContain("font-medium")
      expect(label.className).toContain("leading-none")
      expect(label.className).toContain("peer-disabled:cursor-not-allowed")
      expect(label.className).toContain("peer-disabled:opacity-70")
    })

    it("should merge custom className with default classes", () => {
      render(
        <Label data-testid="label" className="custom-class text-lg">
          Label
        </Label>
      )
      const label = screen.getByTestId("label")
      expect(label.className).toContain("custom-class")
      expect(label.className).toContain("text-lg")
    })
  })

  describe("Ref Forwarding", () => {
    it("should forward ref to the label element", () => {
      const ref = React.createRef<HTMLLabelElement>()
      render(<Label ref={ref}>Label</Label>)
      expect(ref.current).toBeDefined()
      expect(ref.current).toBeInstanceOf(HTMLLabelElement)
    })
  })

  describe("Props Spreading", () => {
    it("should pass htmlFor attribute correctly", () => {
      render(<Label htmlFor="input-id">Label</Label>)
      const label = screen.getByText("Label")
      expect(label.getAttribute("for")).toBe("input-id")
    })

    it("should spread additional HTML attributes", () => {
      render(
        <Label
          data-testid="label"
          id="my-label"
          aria-describedby="description"
          title="Label Title"
        >
          Label
        </Label>
      )
      const label = screen.getByTestId("label")
      expect(label.id).toBe("my-label")
      expect(label.getAttribute("aria-describedby")).toBe("description")
      expect(label.title).toBe("Label Title")
    })
  })

  describe("Display Name", () => {
    it("should have correct displayName", () => {
      expect(Label.displayName).toBe("Label")
    })
  })
})
