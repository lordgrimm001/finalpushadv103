"use client"

import type React from "react"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface JourneyWrapperProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function JourneyWrapper({ children, className = "", delay = 0 }: JourneyWrapperProps) {
  const { ref, isVisible, scrollProgress } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0.3,
        transform: `translateY(${isVisible ? 0 : 40}px)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
