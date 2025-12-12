"use client"

import { useEffect, useRef } from "react"

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      opacity: number
    }> = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    const animate = () => {
      ctx.fillStyle = "rgba(8, 18, 35, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.fillStyle = `rgba(168, 85, 247, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw connections
      ctx.strokeStyle = "rgba(59, 130, 246, 0.1)"
      ctx.lineWidth = 1
      particles.forEach((particle1, i) => {
        particles.slice(i + 1).forEach((particle2) => {
          const distance = Math.hypot(particle2.x - particle1.x, particle2.y - particle1.y)
          if (distance < 150) {
            ctx.globalAlpha = 1 - distance / 150
            ctx.beginPath()
            ctx.moveTo(particle1.x, particle1.y)
            ctx.lineTo(particle2.x, particle2.y)
            ctx.stroke()
          }
        })
      })
      ctx.globalAlpha = 1

      requestAnimationFrame(animate)
    }

    animate()

    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}
