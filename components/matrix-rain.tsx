"use client"

import { useEffect, useRef } from "react"

interface MatrixRainProps {
  side: "left" | "right"
}

export function MatrixRain({ side }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = 60
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Matrix characters (katakana + numbers + symbols)
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*"
    const charArray = chars.split("")

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    // Array to track the y position of each column
    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    const draw = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Green text
      ctx.fillStyle = "#0f0"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Vary the green color slightly for depth
        const brightness = Math.random()
        if (brightness > 0.95) {
          ctx.fillStyle = "#fff" // Occasional white for "leading" character
        } else if (brightness > 0.8) {
          ctx.fillStyle = "#0f0" // Bright green
        } else {
          ctx.fillStyle = `rgb(0, ${100 + Math.floor(Math.random() * 155)}, 0)` // Varying green
        }

        ctx.fillText(char, x, y)

        // Reset drop to top with random delay when it reaches bottom
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 ${side === "left" ? "left-0" : "right-0"} pointer-events-none z-0 opacity-70`}
      style={{ width: "60px" }}
    />
  )
}
