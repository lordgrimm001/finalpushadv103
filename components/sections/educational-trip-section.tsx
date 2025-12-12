"use client"

import { useState } from "react"
import { MapPin, Briefcase, Phone, Building2, ChevronRight } from "lucide-react"
import { JourneyWrapper } from "@/components/journey-wrapper"

export default function EducationalTripSection() {
  const [activeStop, setActiveStop] = useState(0)

  const stops = [
    {
      location: "PLDT Vitro Davao",
      category: "Telecommunications",
      description: "Discovered how digital infrastructure connects communities",
      learnings: ["Fiber Optics", "Data Centers", "Network Systems"],
      icon: Building2,
      gradient: "from-purple-600 to-blue-600",
      bgGlow: "bg-purple-600/20",
    },
    {
      location: "Jairosoft Corporation",
      category: "Software Development",
      description: "Learned how passion drives meaningful software solutions",
      learnings: ["Agile Workflows", "Team Collaboration", "Product Design"],
      icon: Briefcase,
      gradient: "from-blue-600 to-cyan-600",
      bgGlow: "bg-blue-600/20",
    },
    {
      location: "Central 911 Davao",
      category: "Emergency Services",
      description: "Witnessed technology's power to save lives",
      learnings: ["Emergency Tech", "Communication", "Public Safety"],
      icon: Phone,
      gradient: "from-cyan-600 to-emerald-600",
      bgGlow: "bg-cyan-600/20",
    },
  ]

  return (
    <div className="relative w-full">
      <JourneyWrapper>
        <h2 className="text-3xl md:text-4xl font-bold mb-3 neon-glow">Learning Journey</h2>
        <p className="text-gray-400 mb-8 leading-relaxed text-sm md:text-base">
          Real-world experiences that shaped my understanding of technology
        </p>
      </JourneyWrapper>

      <JourneyWrapper delay={100}>
        <div className="grid grid-cols-1 gap-3 mb-8">
          {stops.map((stop, index) => {
            const Icon = stop.icon
            const isActive = activeStop === index

            return (
              <button
                key={index}
                onClick={() => setActiveStop(index)}
                className={`group relative p-4 rounded-xl transition-all duration-500 cursor-pointer text-left ${
                  isActive
                    ? "glass scale-[1.02] shadow-[0_0_30px_rgba(168,85,247,0.4)] border-2 border-purple-500"
                    : "glass-hover hover:scale-[1.01] border border-white/10"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${stop.gradient} flex items-center justify-center transition-all duration-500 flex-shrink-0 ${
                      isActive ? "scale-110 shadow-lg" : "group-hover:scale-105"
                    }`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-bold mb-0.5 transition-colors duration-300 truncate ${
                        isActive ? "text-purple-300 text-base" : "text-white text-sm group-hover:text-purple-300"
                      }`}
                    >
                      {stop.location}
                    </h3>
                    <p
                      className={`text-xs flex items-center gap-1 transition-colors ${
                        isActive ? "text-blue-300" : "text-gray-400"
                      }`}
                    >
                      <MapPin className="w-3 h-3" />
                      {stop.category}
                    </p>
                  </div>

                  {isActive && <ChevronRight className="w-5 h-5 text-purple-400 animate-pulse flex-shrink-0" />}
                </div>
              </button>
            )
          })}
        </div>
      </JourneyWrapper>

      <JourneyWrapper delay={200}>
        <div className="relative overflow-hidden">
          {stops.map((stop, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                activeStop === index
                  ? "opacity-100 translate-x-0 relative"
                  : "opacity-0 absolute inset-0 pointer-events-none translate-x-8"
              }`}
            >
              <div className="glass p-6 rounded-2xl border border-purple-500/20">
                <div className={`absolute top-0 right-0 w-48 h-48 ${stop.bgGlow} rounded-full blur-3xl -z-10`}></div>

                <div className="flex items-start gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stop.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}
                  >
                    {(() => {
                      const Icon = stop.icon
                      return <Icon className="w-6 h-6 text-white" />
                    })()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white mb-1 truncate">{stop.location}</h3>
                    <p className="text-blue-400 font-semibold flex items-center gap-2 text-sm">
                      <MapPin className="w-3 h-3" />
                      {stop.category}
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-6 leading-relaxed">{stop.description}</p>

                <div>
                  <h4 className="text-xs font-semibold text-purple-400 mb-3 uppercase tracking-wide">Key Learnings</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {stop.learnings.map((learning, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 hover:scale-[1.02] transition-all duration-300 cursor-default group"
                      >
                        <ChevronRight className="w-3 h-3 text-purple-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                        <span className="text-xs text-purple-300 font-medium">{learning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </JourneyWrapper>
    </div>
  )
}
