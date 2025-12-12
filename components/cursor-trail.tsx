"use client"

import { useEffect, useRef } from "react"

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Array<{ x: number; y: number; vx: number; vy: number; life: number; type: string }>>([])
  const mousePos = useRef({ x: 0, y: 0 })
  const lastMouse = useRef({ x: 0, y: 0 })

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

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      const dx = mousePos.current.x - lastMouse.current.x
      const dy = mousePos.current.y - lastMouse.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance > 8) {
        // Create medical-themed particles (hearts and plus signs)
        const particleType = Math.random() > 0.5 ? "heart" : "plus"
        particles.current.push({
          x: mousePos.current.x + (Math.random() - 0.5) * 15,
          y: mousePos.current.y + (Math.random() - 0.5) * 15,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 1, // Float upward
          life: 1,
          type: particleType,
        })
      }

      lastMouse.current = { ...mousePos.current }
    }

    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current = particles.current.filter((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy -= 0.02 // Gentle float upward
        particle.life -= 0.015

        if (particle.life <= 0) return false

        const alpha = particle.life * 0.6
        const size = 12 * particle.life

        // Draw soft glow
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, size * 1.5)
        gradient.addColorStop(0, `rgba(239, 68, 68, ${alpha * 0.3})`) // Soft red
        gradient.addColorStop(0.5, `rgba(239, 68, 68, ${alpha * 0.15})`)
        gradient.addColorStop(1, `rgba(239, 68, 68, 0)`)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size * 1.5, 0, Math.PI * 2)
        ctx.fill()

        // Draw particle shape
        ctx.fillStyle = `rgba(239, 68, 68, ${alpha})`

        if (particle.type === "heart") {
          // Draw heart shape
          const heartSize = size * 0.5
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y + heartSize * 0.3)
          ctx.bezierCurveTo(
            particle.x - heartSize * 0.5,
            particle.y - heartSize * 0.3,
            particle.x - heartSize,
            particle.y + heartSize * 0.3,
            particle.x,
            particle.y + heartSize * 0.8,
          )
          ctx.bezierCurveTo(
            particle.x + heartSize,
            particle.y + heartSize * 0.3,
            particle.x + heartSize * 0.5,
            particle.y - heartSize * 0.3,
            particle.x,
            particle.y + heartSize * 0.3,
          )
          ctx.fill()
        } else {
          // Draw plus sign
          const plusSize = size * 0.6
          ctx.fillRect(particle.x - plusSize / 6, particle.y - plusSize / 2, plusSize / 3, plusSize)
          ctx.fillRect(particle.x - plusSize / 2, particle.y - plusSize / 6, plusSize, plusSize / 3)
        }

        return true
      })

      // Limit particle count for performance
      if (particles.current.length > 40) {
        particles.current = particles.current.slice(-40)
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" style={{ mixBlendMode: "screen" }} />
  )
}
