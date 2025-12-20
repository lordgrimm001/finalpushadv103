"use client"

import { useRef, useEffect, useState } from "react"
import { JourneyWrapper } from "@/components/journey-wrapper"
import { Sparkles, ArrowRight } from "lucide-react"

export default function DreamSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full flex items-center justify-center py-20 px-4 bg-gradient-to-b from-background to-slate-900"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto w-full text-center">
        <JourneyWrapper delay={0}>
          <div className="mb-12">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-pulse"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-purple-600/20 to-transparent flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-purple-400" />
              </div>
            </div>
          </div>
        </JourneyWrapper>

        <JourneyWrapper delay={200}>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="neon-glow block mb-2">Where Innovation Meets Compassion,</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
              We Build a Safer Tomorrow
            </span>
          </h2>
        </JourneyWrapper>

        <JourneyWrapper delay={400}>
          <div className="glass glass-hover p-6 rounded-xl mb-8 inline-block">
            <p className="text-xl md:text-2xl text-gray-300 italic">
              "Technology and compassion are not opposites. They're partners in creating meaningful change."
            </p>
          </div>
        </JourneyWrapper>

        <JourneyWrapper delay={600}>
          <div className="glass glass-hover p-8 rounded-xl mb-8">
            <p className="text-gray-300 leading-relaxed text-lg">
              My vision is to become a technologist who doesn't just build systems, but builds bridges between
              innovation and humanity. I dream of creating software that serves both people and purpose, leveraging AI
              and intelligent systems to solve healthcare challenges, improve public services, and empower communities.
            </p>
          </div>
        </JourneyWrapper>

        <JourneyWrapper delay={800}>
          <button className="glass glass-hover px-8 py-4 rounded-full font-semibold text-white inline-flex items-center gap-2 hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-500/30">
            Join the Journey
            <ArrowRight className="w-5 h-5" />
          </button>
        </JourneyWrapper>
      </div>
    </section>
  )
}
