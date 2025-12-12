"use client"

import { useRef, useEffect, useState } from "react"
import { Code } from "lucide-react"
import { JourneyWrapper } from "@/components/journey-wrapper"

export default function SkillsSection() {
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

  const skills = [
    { name: "Web Development", level: 85 },
    { name: "Software Engineering", level: 80 },
    { name: "Database Design", level: 75 },
    { name: "Cloud Technologies", level: 70 },
    { name: "AI/ML Basics", level: 65 },
    { name: "Leadership", level: 85 },
    { name: "Problem Solving", level: 88 },
  ]

  const SkillMeter = ({ name, level }: { name: string; level: number }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-semibold text-white">{name}</span>
        <span className="text-xs text-purple-400">{level}%</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-purple-500/30">
        <div
          className={`h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500`}
          style={{ width: isVisible ? `${level}%` : "0%" }}
        ></div>
      </div>
    </div>
  )

  return (
    <section
      ref={ref}
      className="relative min-h-fit w-full flex items-center justify-center py-20 px-4 bg-gradient-to-b from-slate-900/30 to-background"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <JourneyWrapper>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center neon-glow">My Skills</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">What I've learned along the way</p>
        </JourneyWrapper>

        <JourneyWrapper delay={0}>
          <div className="glass glass-hover p-8 rounded-xl">
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-6 h-6 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">Technical & Personal</h3>
            </div>
            <div className="space-y-4">
              {skills.map((skill, idx) => (
                <SkillMeter key={idx} name={skill.name} level={skill.level} />
              ))}
            </div>
          </div>
        </JourneyWrapper>
      </div>
    </section>
  )
}
