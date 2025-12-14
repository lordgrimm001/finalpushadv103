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

      if (distance > 5) {
        const particleType = Math.random() > 0.5 ? "heart" : "plus"
        particles.current.push({
          x: mousePos.current.x + (Math.random() - 0.5) * 20,
          y: mousePos.current.y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 1.5,
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
        particle.vy -= 0.03
        particle.life -= 0.012

        if (particle.life <= 0) return false

        const alpha = particle.life * 0.5
        const size = 18 * particle.life

        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, size * 2)
        gradient.addColorStop(0, `rgba(239, 68, 68, ${alpha * 0.3})`)
        gradient.addColorStop(0.5, `rgba(239, 68, 68, ${alpha * 0.15})`)
        gradient.addColorStop(1, `rgba(239, 68, 68, 0)`)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size * 2, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(239, 68, 68, ${alpha * 0.8})`

        if (particle.type === "heart") {
          const heartSize = size * 0.7
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
          const plusSize = size * 0.8
          ctx.fillRect(particle.x - plusSize / 5, particle.y - plusSize / 2, plusSize / 2.5, plusSize)
          ctx.fillRect(particle.x - plusSize / 2, particle.y - plusSize / 5, plusSize, plusSize / 2.5)
        }

        return true
      })

      if (particles.current.length > 60) {
        particles.current = particles.current.slice(-60)
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
