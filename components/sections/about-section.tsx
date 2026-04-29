"use client"

import { useRef, useEffect, useState } from "react"
import { Heart } from "lucide-react"
import { JourneyWrapper } from "@/components/journey-wrapper"

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const highlightImages = [
    { url: "/h5.jpg", label: "Highlight 5" },
    { url: "/h8.jpg", label: "Highlight 8" },
    { url: "/h1.jpg", label: "Highlight 1" },
    { url: "/h4.jpg", label: "Highlight 4" },
    { url: "/h7.jpg", label: "Highlight 7" },
    { url: "/h6.jpg", label: "Highlight 6" },
    { url: "/h3.jpg", label: "Highlight 3" },
    { url: "/h2.jpg", label: "Highlight 2" },
  ]

  return (
    <section
      id="about"
      ref={ref}
      className="
        relative w-full
        pt-12 pb-20 px-4
        scroll-mt-24
        bg-gradient-to-b from-slate-900/20 to-background
        overflow-hidden
      "
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(239,68,68,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(220,38,38,0.08),transparent_50%)]" />
        <div
          className={`absolute inset-0 bg-gradient-to-b from-red-900/0 via-red-900/10 to-red-900/0 transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/15 rounded-full blur-3xl animate-float" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Title */}
        <JourneyWrapper>
          <h2 className="text-4xl font-bold mb-6 text-center neon-glow">
            A Little About Me
          </h2>
        </JourneyWrapper>

        {/* Description */}
        <JourneyWrapper delay={200}>
          <div className="glass p-8 rounded-xl mb-10 border border-red-500/20">
            <div className="flex items-start gap-3">
              <Heart className="w-6 h-6 text-red-400 mt-1" />
              <div>
                <p className="text-gray-200 text-lg mb-3">
                  I’m Francis, a 3rd-year BSIT student. I believe technology can save lives and make the world better for humanity.
                </p>
                <p className="text-gray-200 text-lg mb-3">
               I want to utilise my knowledge to help others and create a safer and a brighter future.</p>
                <p className="text-gray-200 text-lg">
                 Every project and experience teaches me that real impact grows from purpose and care.
                </p>
              </div>
            </div>
          </div>
        </JourneyWrapper>

        {/* Continuous IMAGE STRIP */}
        <JourneyWrapper delay={300}>
          <div className="overflow-hidden relative">
            <div className="flex gap-6 animate-scroll-left-infinite">
              {[...highlightImages, ...highlightImages].map((image, index) => (
                <div
                  key={index}
                  className="
                    flex-shrink-0
                    w-[280px] h-[360px]
                    rounded-xl
                    border-4 border-red-500/50
                    shadow-lg shadow-red-500/25
                    bg-black
                    p-1
                    overflow-hidden
                  "
                >
                  <img
                    src={image.url}
                    alt={image.label}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </JourneyWrapper>
      </div>
    </section>
  )
}
