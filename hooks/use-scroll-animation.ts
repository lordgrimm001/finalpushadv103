"use client"

import { useEffect, useRef, useState } from "react"

interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: options.threshold ?? 0.1,
        rootMargin: options.rootMargin ?? "0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options.threshold, options.rootMargin])

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const element = ref.current
        const elementTop = element.getBoundingClientRect().top
        const elementHeight = element.clientHeight
        const windowHeight = window.innerHeight

        const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)))
        setScrollProgress(progress)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return { ref, isVisible, scrollProgress }
}
