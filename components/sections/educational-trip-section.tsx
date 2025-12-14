"use client"

import { useState } from "react"
import { MapPin, Briefcase, Phone, Building2, ChevronDown } from "lucide-react"
import { JourneyWrapper } from "@/components/journey-wrapper"

export default function EducationalTripSection() {
  const [expandedStop, setExpandedStop] = useState<number | null>(null)

  const stops = [
    {
      location: "PLDT Vitro Davao",
      category: "Telecommunications",
      description: "Discovered how digital infrastructure connects communities",
      learnings: ["Fiber Optics", "Data Centers", "Network Systems"],
      icon: Building2,
      gradient: "from-red-600 to-orange-600",
      bgGlow: "bg-red-600/20",
    },
    {
      location: "Jairosoft Corporation",
      category: "Software Development",
      description: "Learned how passion drives meaningful software solutions",
      learnings: ["Agile Workflows", "Team Collaboration", "Product Design"],
      icon: Briefcase,
      gradient: "from-orange-600 to-red-500",
      bgGlow: "bg-orange-600/20",
    },
    {
      location: "Central 911 Davao",
      category: "Emergency Services",
      description: "Witnessed technology's power to save lives",
      learnings: ["Emergency Tech", "Communication", "Public Safety"],
      icon: Phone,
      gradient: "from-red-500 to-rose-600",
      bgGlow: "bg-red-500/20",
    },
  ]

  const toggleExpand = (index: number) => {
    setExpandedStop(expandedStop === index ? null : index)
  }

  return (
    <div className="relative w-full">
      <JourneyWrapper>
        <h2 className="text-3xl md:text-4xl font-bold mb-3 neon-glow">Learning Journey</h2>
        <p className="text-gray-400 mb-6 leading-relaxed text-sm md:text-base">
          Real-world experiences that shaped my understanding of technology
        </p>
      </JourneyWrapper>

      <JourneyWrapper delay={100}>
        <div className="grid grid-cols-1 gap-3">
          {stops.map((stop, index) => {
            const Icon = stop.icon
            const isExpanded = expandedStop === index

            return (
              <div key={index}>
                <button
                  onClick={() => toggleExpand(index)}
                  className={`group relative p-4 rounded-xl transition-all duration-500 cursor-pointer text-left w-full ${
                    isExpanded
                      ? "glass scale-[1.01] shadow-[0_0_25px_rgba(239,68,68,0.3)] border-2 border-red-500"
                      : "glass-hover hover:scale-[1.005] border border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${stop.gradient} flex items-center justify-center transition-all duration-500 flex-shrink-0 ${
                        isExpanded ? "scale-110 shadow-lg shadow-red-500/50" : "group-hover:scale-105"
                      }`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-bold mb-0.5 transition-colors duration-300 truncate ${
                          isExpanded ? "text-red-300 text-base" : "text-white text-sm group-hover:text-red-300"
                        }`}
                      >
                        {stop.location}
                      </h3>
                      <p
                        className={`text-xs flex items-center gap-1 transition-colors ${
                          isExpanded ? "text-orange-300" : "text-gray-400"
                        }`}
                      >
                        <MapPin className="w-3 h-3" />
                        {stop.category}
                      </p>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-red-400 flex-shrink-0 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="mt-3 glass p-5 rounded-xl border border-red-500/30 shadow-lg shadow-red-500/10 animate-in fade-in zoom-in-95 duration-300">
                    <div
                      className={`absolute top-0 right-0 w-32 h-32 ${stop.bgGlow} rounded-full blur-3xl -z-10`}
                    ></div>

                    <p className="text-gray-300 text-sm mb-5 leading-relaxed">{stop.description}</p>

                    <div>
                      <h4 className="text-xs font-semibold text-red-400 mb-3 uppercase tracking-wide">Key Learnings</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {stop.learnings.map((learning, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 hover:scale-[1.02] transition-all duration-300 cursor-default group"
                          >
                            <div className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0"></div>
                            <span className="text-xs text-red-300 font-medium">{learning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </JourneyWrapper>
    </div>
  )
}
