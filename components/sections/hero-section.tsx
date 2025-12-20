"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Github, Linkedin } from "lucide-react"
import { JourneyWrapper } from "@/components/journey-wrapper"
import { FaFacebookF, FaInstagram } from "react-icons/fa"

export default function HeroSection() {
  const [displayName, setDisplayName] = useState("")
  const [isTypingName, setIsTypingName] = useState(true)
  const nameRef = useRef("Francis Xavier C. Baclao")

  // Updated subtitle phrases
  const subtitles = [
    "Where Innovation Meets Compassion, We Build a Safer Tomorrow",
    "Using Technology to Make a Difference",
    "Serving with Heart"
  ]
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0)
  const [displaySubtitle, setDisplaySubtitle] = useState("")
  const [isTypingSubtitle, setIsTypingSubtitle] = useState(true)

  // Type effect for name
  useEffect(() => {
    if (!isTypingName || displayName.length >= nameRef.current.length) {
      setIsTypingName(false)
      return
    }

    const timeout = setTimeout(() => {
      setDisplayName(prev => prev + nameRef.current[prev.length])
    }, 80)

    return () => clearTimeout(timeout)
  }, [displayName, isTypingName])

  // Type effect for subtitle rotation
  useEffect(() => {
    let typingTimeout: NodeJS.Timeout
    let holdTimeout: NodeJS.Timeout
    const currentText = subtitles[currentSubtitleIndex]

    if (isTypingSubtitle) {
      if (displaySubtitle.length < currentText.length) {
        typingTimeout = setTimeout(() => {
          setDisplaySubtitle(prev => prev + currentText[prev.length])
        }, 60)
      } else {
        setIsTypingSubtitle(false)
        holdTimeout = setTimeout(() => {
          setDisplaySubtitle("")
          setCurrentSubtitleIndex((prev) => (prev + 1) % subtitles.length)
          setIsTypingSubtitle(true)
        }, 1500)
      }
    }

    return () => {
      clearTimeout(typingTimeout)
      clearTimeout(holdTimeout)
    }
  }, [displaySubtitle, isTypingSubtitle, currentSubtitleIndex])

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) section.scrollIntoView({ behavior: "smooth" })
  }

  // Highlight only important words in subtitle
  const highlightWords = (text: string) => {
    return text.split(" ").map((word, index) => {
      let colorClass = "text-white"
      if (word.includes("Innovation") || word.includes("Technology")) colorClass = "text-red-400 font-bold"
      if (word.includes("Compassion") || word.includes("Safer") || word.includes("Tomorrow") || word.includes("Humanity")) colorClass = "text-green-400 font-bold"
      return <span key={index} className={colorClass}>{word} </span>
    })
  }

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-slate-900/20 px-4 pt-20 pb-6">
      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Profile Image with spinning glow */}
        <JourneyWrapper delay={0}>
          <div className="mb-12 flex justify-center">
            <div className="relative w-32 h-32 animate-glow-pulse">
              <div
                className="absolute inset-0 rounded-full border-2 border-gray-500/50 border-t-gray-400 border-r-gray-400 border-b-gray-400 animate-spin"
                style={{ animationDuration: "4s" }}
              />
              <div className="absolute inset-2 rounded-full border border-gray-500/30 flex items-center justify-center">
                <img
                  src="/Profile.jpg"
                  alt="Profile Image"
                  className="w-28 h-28 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </JourneyWrapper>

        {/* Name */}
        <JourneyWrapper delay={200}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-50">
            {displayName}
            {isTypingName && <span className="animate-pulse text-red-400">|</span>}
          </h1>
        </JourneyWrapper>

        {/* Animated Subtitle */}
        <JourneyWrapper delay={400}>
          <p className="text-xl md:text-2xl font-semibold mb-4 max-w-3xl mx-auto leading-relaxed">
            {highlightWords(displaySubtitle)}
          </p>

          {/* Mission Statement */}
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            On a mission to bridge <span className="text-red-400 font-bold">TECHNOLOGY</span> and{" "}
            <span className="text-green-400 font-bold">HUMANITY</span> through a purpose-driven development.
          </p>
        </JourneyWrapper>

        {/* Buttons */}
        <JourneyWrapper delay={600}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center my-8">
            <button
              onClick={() => scrollToSection("about")}
              className="glass glass-hover px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition-transform text-gray-50 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:from-gray-600 hover:to-gray-500"
            >
              Explore My Journey
              <ArrowRight className="w-4 h-4 text-gray-50" />
            </button>
            <a
              href="/resume.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-red-400 px-8 py-3 rounded-full font-semibold transition-all hover:scale-105 inline-flex items-center justify-center text-gray-50 hover:bg-red-500 hover:text-white"
            >
              View Resume
            </a>
          </div>
        </JourneyWrapper>

        {/* Social Icons */}
        <JourneyWrapper delay={700}>
          <div className="flex gap-4 justify-center mb-6">
            <a
              href="https://github.com/LordGrimm001"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass glass-hover flex items-center justify-center hover:scale-110 transition text-gray-50"
            >
              <Github className="w-5 h-5 text-gray-50" />
            </a>
            <a
              href="https://www.linkedin.com/in/francis-xavier-baclao-0740bb2a6/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass glass-hover flex items-center justify-center hover:scale-110 transition text-gray-50"
            >
              <Linkedin className="w-5 h-5 text-gray-50" />
            </a>
            <a
              href="https://www.facebook.com/francisxavier.baclao"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass glass-hover flex items-center justify-center hover:scale-110 transition text-gray-50"
            >
              <FaFacebookF className="w-5 h-5 text-gray-50" />
            </a>
            <a
              href="https://www.instagram.com/francis.lifeline_jrny/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass glass-hover flex items-center justify-center hover:scale-110 transition text-gray-50"
            >
              <FaInstagram className="w-5 h-5 text-gray-50" />
            </a>
          </div>
        </JourneyWrapper>

        {/* Scroll Indicator */}
        <JourneyWrapper delay={800}>
          <div className="flex justify-center animate-bounce">
            <div className="w-6 h-10 border-2 border-red-400 rounded-full flex items-center justify-center">
              <div className="w-1 h-2 bg-red-400 rounded-full animate-pulse" />
            </div>
          </div>
        </JourneyWrapper>

      </div>
    </section>
  )
}
