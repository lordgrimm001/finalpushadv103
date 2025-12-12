"use client"

import { useState, useEffect } from "react"
import { Home, User, Map, Camera, Lightbulb, Award, Menu, X } from "lucide-react"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setIsMobileMenuOpen(false)
    }
  }

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "journey", label: "Journey", icon: Map },
    { id: "gallery", label: "Gallery", icon: Camera },
    { id: "skills", label: "Skills", icon: Award },
    { id: "vision", label: "Vision", icon: Lightbulb },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-900/95 border-b border-purple-500/30 backdrop-blur-lg shadow-lg shadow-purple-500/10"
            : "bg-slate-900/80 backdrop-blur-md shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="hidden md:flex items-center justify-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="group flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 hover:bg-purple-600/20 border border-transparent hover:border-purple-500/50"
                >
                  <Icon className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex justify-between items-center">
            <h1 className="text-lg font-bold text-white">Francis Baclao</h1>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-purple-400 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/95 backdrop-blur-lg animate-in fade-in duration-300">
          <div className="flex flex-col items-center justify-center h-full gap-6 p-8">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-3 text-2xl font-medium text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-6 h-6 text-purple-400" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
