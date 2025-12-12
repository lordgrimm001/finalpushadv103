"use client"

import type React from "react"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const categories = ["all", "Educational Trip", "Volunteer Work", "Certificates"]

  const galleryItems = [
    {
      id: 1,
      category: "Educational Trip",
      title: "PLDT Visit",
      image: "/pldt-data-center-server-room-infrastructure-techno.jpg",
    },
    {
      id: 2,
      category: "Educational Trip",
      title: "Jairosoft",
      image: "/software-development-office-tech-startup-environme.jpg",
    },
    { id: 3, category: "Educational Trip", title: "Central 911", image: "/placeholder.svg?height=400&width=600" },
    {
      id: 4,
      category: "Volunteer Work",
      title: "Medical Support",
      image: "/professional-it-student-volunteer-portrait-headsho.jpg",
    },
    { id: 5, category: "Volunteer Work", title: "Community Care", image: "/placeholder.svg?height=400&width=600" },
    { id: 6, category: "Certificates", title: "Achievement 1", image: "/placeholder.svg?height=400&width=600" },
  ]

  const filteredItems =
    selectedCategory === "all" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)

  const openImage = (id: number) => setSelectedImage(id)
  const closeImage = () => setSelectedImage(null)
  const currentImageIndex = filteredItems.findIndex((item) => item.id === selectedImage)

  const goToPrevious = () => {
    if (currentImageIndex > 0) {
      setSelectedImage(filteredItems[currentImageIndex - 1].id)
    }
  }

  const goToNext = () => {
    if (currentImageIndex < filteredItems.length - 1) {
      setSelectedImage(filteredItems[currentImageIndex + 1].id)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeImage()
    if (e.key === "ArrowLeft") goToPrevious()
    if (e.key === "ArrowRight") goToNext()
  }

  return (
    <div className="relative w-full">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 neon-glow">My Gallery</h2>
      <p className="text-gray-400 mb-8 leading-relaxed text-sm md:text-base">Moments that shaped my journey</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all duration-300 text-xs cursor-fancy ${
              selectedCategory === category
                ? "glass bg-purple-600/40 border border-purple-400 scale-105 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                : "glass hover:border-purple-400 hover:scale-105 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] active:scale-95"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            onClick={() => openImage(item.id)}
            className="group cursor-fancy relative h-32 rounded-lg overflow-hidden glass glass-hover border border-purple-500/30 hover:border-purple-400 transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] active:scale-95 text-left"
          >
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-3">
              <h3 className="text-sm font-bold text-white text-center w-full transform group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                {item.title}
              </h3>
              <p className="text-xs text-purple-300 text-center w-full transform group-hover:translate-y-0 translate-y-2 transition-transform duration-300 delay-75">
                {item.category}
              </p>
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          </button>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm">No items in this category yet.</p>
        </div>
      )}

      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-4xl w-full animate-in zoom-in-95 duration-300">
            <button
              onClick={closeImage}
              className="absolute -top-12 left-0 text-white hover:text-purple-400 transition-all duration-300 flex items-center gap-2 group md:-top-14"
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm font-medium">Back to Gallery</span>
            </button>

            <button
              onClick={closeImage}
              className="absolute -top-12 right-0 text-white hover:text-red-400 transition-all duration-300 hover:rotate-90 md:-top-14 md:-right-4"
            >
              <X className="w-8 h-8" />
            </button>

            <img
              src={galleryItems.find((item) => item.id === selectedImage)?.image || "/placeholder.svg"}
              alt="Gallery view"
              className="w-full h-auto rounded-lg max-h-[80vh] object-contain shadow-2xl shadow-purple-500/20"
            />

            <button
              onClick={goToPrevious}
              disabled={currentImageIndex === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 md:left-4 text-white hover:text-purple-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 active:scale-95 bg-black/50 rounded-full p-2 backdrop-blur-sm"
            >
              <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" />
            </button>

            <button
              onClick={goToNext}
              disabled={currentImageIndex === filteredItems.length - 1}
              className="absolute right-2 top-1/2 -translate-y-1/2 md:right-4 text-white hover:text-purple-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 active:scale-95 bg-black/50 rounded-full p-2 backdrop-blur-sm"
            >
              <ChevronRight className="w-8 h-8 md:w-12 md:h-12" />
            </button>

            <div className="mt-6 text-center">
              <p className="text-white text-sm md:text-base font-medium bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 inline-block">
                {currentImageIndex + 1} of {filteredItems.length}
              </p>
              <p className="text-gray-400 text-xs md:text-sm mt-2">Use arrow keys or buttons to navigate</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
