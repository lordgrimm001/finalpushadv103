"use client"

import { MapPin, Briefcase, Phone, Building2 } from "lucide-react"
import { JourneyWrapper } from "@/components/journey-wrapper"

export default function EducationalTripSection() {
  const stops = [
    {
      location: "PLDT Vitro Davao",
      category: "Telecommunications",
      description: "Discovered how digital infrastructure connects communities",
      learnings: ["Fiber Optics", "Data Centers", "Network Systems"],
      icon: Building2,
      gradient: "from-red-600 to-orange-600",
      bgGlow: "bg-red-600/20",
      images: ["/pldt 1.jpg", "/pldt 2.jpg", "/pldt 3.jpg"],
    },
    {
      location: "Jairosoft Corporation",
      category: "Software Development",
      description: "Learned how passion drives meaningful software solutions",
      learnings: ["Agile Workflows", "Team Collaboration", "Product Design"],
      icon: Briefcase,
      gradient: "from-orange-600 to-red-500",
      bgGlow: "bg-orange-600/20",
      images: ["/jai 1.jpg", "/jai 2.jpg", "/jai 3.jpg"],
    },
    {
      location: "Central 911 Davao",
      category: "Emergency Services",
      description: "Witnessed technology's power to save lives",
      learnings: ["Emergency Tech", "Communication", "Public Safety"],
      icon: Phone,
      gradient: "from-red-500 to-rose-600",
      bgGlow: "bg-red-500/20",
      images: ["/cent 1.jpg", "/cent 2.jpg", "/cent 3.jpg"],
    },
  ]

  return (
    <section className="relative w-full">
      <JourneyWrapper>
        <h2 className="text-3xl md:text-4xl font-bold mb-3 neon-glow">
          Learning Journey
        </h2>
        <p className="text-gray-400 mb-8 text-sm md:text-base">
          Real-world experiences that shaped my understanding of technology
        </p>
      </JourneyWrapper>

      <JourneyWrapper delay={100}>
        <div className="grid grid-cols-1 gap-8">
          {stops.map((stop, index) => {
            const Icon = stop.icon

            return (
              <div
                key={index}
                className="glass p-6 rounded-2xl border-2 border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.25)] relative"
              >
                <div
                  className={`absolute top-0 right-0 w-40 h-40 ${stop.bgGlow} blur-3xl -z-10`}
                />

                {/* HEADER */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${stop.gradient} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {stop.location}
                    </h3>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {stop.category}
                    </p>
                  </div>
                </div>

                {/* IMAGES */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {stop.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="w-full h-56 md:h-64 rounded-xl border-4 border-red-500/50 shadow-lg shadow-red-500/20 p-1 overflow-hidden"
                    >
                      <img
                        src={img}
                        alt={`${stop.location} ${idx + 1}`}
                        className="w-full h-full object-contain rounded-lg bg-black"
                      />
                    </div>
                  ))}
                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-300 text-sm mb-5">
                  {stop.description}
                </p>

                {/* LEARNINGS */}
                <h4 className="text-xs font-semibold text-red-400 mb-3 uppercase">
                  Key Learnings
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {stop.learnings.map((learning, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300"
                    >
                      {learning}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </JourneyWrapper>
    </section>
  )
}
