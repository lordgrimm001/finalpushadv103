"use client"

import { useEffect, useRef } from "react"
import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import EducationalTripSection from "@/components/sections/educational-trip-section"
import SkillsSection from "@/components/sections/skills-section"
import GallerySection from "@/components/sections/gallery-section"
import DreamSection from "@/components/sections/dream-section"
import FooterSection from "@/components/sections/footer-section"
import NeuralBackground from "@/components/neural-background"
import Navigation from "@/components/navigation"
import CursorTrail from "@/components/cursor-trail"

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollProgress =
          scrollContainerRef.current.scrollTop /
          (scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight)
        document.documentElement.style.setProperty("--scroll-progress", `${scrollProgress * 100}%`)
      }
    }

    const container = scrollContainerRef.current
    container?.addEventListener("scroll", handleScroll)
    return () => container?.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <CursorTrail />
      <Navigation />
      <div ref={scrollContainerRef} className="w-full h-screen overflow-y-scroll scroll-smooth bg-background">
        <NeuralBackground />
        <div id="home" className="min-h-screen flex items-center justify-center">
          <HeroSection />
        </div>
        <div id="about" className="min-h-screen flex items-center justify-center py-12">
          <AboutSection />
        </div>
        <div
          id="journey"
          className="min-h-screen flex items-center justify-center py-12 bg-gradient-to-b from-background to-slate-900/20"
        >
          <div className="max-w-4xl mx-auto px-4 w-full">
            <EducationalTripSection />
          </div>
        </div>
        <div id="gallery" className="min-h-screen flex items-center justify-center py-12">
          <div className="max-w-4xl mx-auto px-4 w-full">
            <GallerySection />
          </div>
        </div>
        <div
          id="skills"
          className="min-h-screen flex items-center justify-center py-12 bg-gradient-to-b from-slate-900/20 to-background"
        >
          <SkillsSection />
        </div>
        <div id="vision" className="min-h-screen flex items-center justify-center py-12">
          <DreamSection />
        </div>
        <FooterSection />
      </div>
    </>
  )
}
