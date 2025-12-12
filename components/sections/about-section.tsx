"use client"

import { useRef, useEffect, useState } from "react"
import { Heart, Code2, Zap } from "lucide-react"
import { JourneyWrapper } from "@/components/journey-wrapper"

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const timeline = [
    {
      year: "2022",
      title: "3rd Year BSIT Student",
      description: "Holy Cross of Davao College",
      icon: Code2,
    },
    {
      year: "2023-2024",
      title: "Medical Volunteer",
      description: "Dedicated to community health initiatives",
      icon: Heart,
    },
    {
      year: "Present",
      title: "Tech & Service Fusion",
      description: "Building solutions that matter",
      icon: Zap,
    },
  ]

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full flex items-center justify-center py-20 px-4 bg-gradient-to-b from-slate-900/20 to-background overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div
          className={`absolute inset-0 bg-gradient-to-b from-purple-900/0 via-purple-900/10 to-purple-900/0 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <JourneyWrapper>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-center neon-glow">A Little About Me</h2>
        </JourneyWrapper>

        <JourneyWrapper delay={200}>
          <div className="glass glass-hover p-8 rounded-xl mb-12">
            <div className="flex items-start gap-3 mb-4">
              <Heart className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-300 leading-relaxed text-lg mb-4">
                  I'm Francis, a 3rd-year BSIT student who believes technology is at its best when it helps people.
                  Through my studies and volunteer work, I've learned that the greatest code solves real problems for
                  real people.
                </p>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Whether I'm exploring new tech or serving my community, I'm driven by one simple truth: meaningful
                  work comes from a genuine desire to make a difference.
                </p>
              </div>
            </div>
          </div>
        </JourneyWrapper>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500/0 via-purple-500/50 to-purple-500/0"></div>

          <div className="space-y-12">
            {timeline.map((item, index) => {
              const Icon = item.icon
              return (
                <JourneyWrapper key={index} delay={400 + index * 200}>
                  <div className={`flex items-center gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                      <div
                        className={`glass glass-hover p-6 rounded-lg inline-block hover:scale-105 transition-transform ${index % 2 === 0 ? "mr-auto ml-0" : "ml-auto mr-0"}`}
                      >
                        <p className="text-purple-400 font-bold text-lg mb-2">{item.year}</p>
                        <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-gray-300">{item.description}</p>
                      </div>
                    </div>

                    <div className="relative flex justify-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center animate-glow-pulse border-4 border-background shadow-lg shadow-purple-500/50">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <div className="flex-1"></div>
                  </div>
                </JourneyWrapper>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
