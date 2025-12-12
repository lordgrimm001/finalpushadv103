"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Brain, Github, Linkedin, Mail } from "lucide-react"
import { JourneyWrapper } from "@/components/journey-wrapper"

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const textRef = useRef("Francis Xavier C. Baclao")
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if (!isTyping || displayText.length >= textRef.current.length) {
      setIsTyping(false)
      return
    }

    const timeout = setTimeout(() => {
      setDisplayText((prev) => prev + textRef.current[prev.length])
    }, 80)

    return () => clearTimeout(timeout)
  }, [displayText, isTyping])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-slate-900/20 px-4 pt-20">
      {/* Animated background glow with parallax */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-float-slow"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        ></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Holographic circle with icon */}
        <JourneyWrapper delay={0}>
          <div className="mb-12 flex justify-center">
            <div className="relative w-32 h-32 animate-glow-pulse">
              <div
                className="absolute inset-0 rounded-full border-2 border-purple-500/50 border-t-purple-400 border-r-blue-400 border-b-cyan-400 animate-spin"
                style={{ animationDuration: "4s" }}
              ></div>
              <div className="absolute inset-2 rounded-full border border-purple-500/30 flex items-center justify-center">
                <Brain className="w-12 h-12 text-purple-400" />
              </div>
            </div>
          </div>
        </JourneyWrapper>

        {/* Typing animation text with fade-in */}
        <JourneyWrapper delay={200}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 neon-glow">
            {displayText}
            {isTyping && <span className="animate-pulse">|</span>}
          </h1>
        </JourneyWrapper>

        {/* Subtitle */}
        <JourneyWrapper delay={400}>
          <p className="text-lg md:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto">
            3rd Year BSIT Student | Technologist | Volunteer
          </p>
          <p className="text-sm md:text-base text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            On a mission to bridge technology and humanity through innovation, service, and purpose-driven development.
          </p>
        </JourneyWrapper>

        {/* Node-styled action buttons */}
        <JourneyWrapper delay={600}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="glass glass-hover px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 text-white hover:scale-105 transition-transform">
              Explore My Journey
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border-2 border-purple-500/50 hover:border-purple-400 px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105">
              View Resume
            </button>
          </div>
        </JourneyWrapper>

        <JourneyWrapper delay={700}>
          <div className="flex gap-4 justify-center mb-12">
            <a
              href="#"
              className="w-12 h-12 rounded-full glass glass-hover flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-gray-300" />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full glass glass-hover flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-gray-300" />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full glass glass-hover flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 text-gray-300" />
            </a>
          </div>
        </JourneyWrapper>

        {/* Scroll indicator */}
        <JourneyWrapper delay={800}>
          <div className="flex justify-center mt-12 animate-bounce">
            <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex items-center justify-center">
              <div className="w-1 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </JourneyWrapper>
      </div>
    </section>
  )
}
