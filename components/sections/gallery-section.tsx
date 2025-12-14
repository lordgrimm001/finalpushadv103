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
      description: "Exploring data center infrastructure",
    },
    {
      id: 2,
      category: "Educational Trip",
      title: "Jairosoft",
      image: "/software-development-office-tech-startup-environme.jpg",
      description: "Learning from software developers",
    },
    {
      id: 3,
      category: "Educational Trip",
      title: "Central 911",
      image: "/emergency-response-center-technology.jpg",
      description: "Emergency response technology",
    },
    {
      id: 4,
      category: "Volunteer Work",
      title: "Medical Support",
      image: "/professional-it-student-volunteer-portrait-headsho.jpg",
      description: "Supporting healthcare initiatives",
    },
    {
      id: 5,
      category: "Volunteer Work",
      title: "Community Care",
      image: "/medical-volunteer-community-health.jpg",
      description: "Community health programs",
    },
    {
      id: 6,
      category: "Volunteer Work",
      title: "Health Campaign",
      image: "/volunteer-health-awareness-campaign.jpg",
      description: "Health awareness initiatives",
    },
    {
      id: 7,
      category: "Certificates",
      title: "Achievement 1",
      image: "/certificate-of-recognition-volunteer.jpg",
      description: "Recognition certificate",
    },
    {
      id: 8,
      category: "Certificates",
      title: "Achievement 2",
      image: "/medical-volunteer-training-certificate.jpg",
      description: "Training completion",
    },
  ]

  const filteredItems =
    selectedCategory === "all" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)

  const openImage = (id: number) => setSelectedImage(id)
  const closeImage = () => setSelectedImage(null)
  const currentImageIndex = filteredItems.findIndex((item) => item.id === selectedImage)
  const currentItem = filteredItems[currentImageIndex]

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
      <p className="text-gray-400 mb-6 leading-relaxed text-sm md:text-base">Moments that shaped my journey</p>

      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 text-sm cursor-fancy ${
              selectedCategory === category
                ? "glass bg-red-600/30 border-2 border-red-400 scale-105 shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                : "glass hover:border-red-400 hover:scale-105 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] active:scale-95 border border-white/10"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            onClick={() => openImage(item.id)}
            className="group cursor-fancy relative h-40 md:h-48 rounded-xl overflow-hidden glass glass-hover border border-red-500/30 hover:border-red-400 transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] active:scale-95 text-left"
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
              <p className="text-xs text-red-300 text-center w-full transform group-hover:translate-y-0 translate-y-2 transition-transform duration-300 delay-75">
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
        <div className="text-center py-12">
          <p className="text-gray-400 text-base">No items in this category yet.</p>
        </div>
      )}

      {selectedImage !== null && currentItem && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-5xl w-full animate-in zoom-in-95 duration-300">
            <button
              onClick={closeImage}
              className="absolute -top-14 left-0 text-white hover:text-red-400 transition-all duration-300 flex items-center gap-2 group"
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-base font-medium">Back to Gallery</span>
            </button>

            <button
              onClick={closeImage}
              className="absolute -top-14 right-0 text-white hover:text-red-400 transition-all duration-300 hover:rotate-90"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="relative rounded-xl overflow-hidden border-2 border-red-500/40 shadow-2xl shadow-red-500/30">
              <img
                src={currentItem.image || "/placeholder.svg"}
                alt={currentItem.title}
                className="w-full h-auto max-h-[75vh] object-contain bg-black"
              />
            </div>

            <button
              onClick={goToPrevious}
              disabled={currentImageIndex === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-red-400 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 active:scale-95 bg-black/70 rounded-full p-3 backdrop-blur-sm border border-red-500/30"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <button
              onClick={goToNext}
              disabled={currentImageIndex === filteredItems.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-red-400 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 active:scale-95 bg-black/70 rounded-full p-3 backdrop-blur-sm border border-red-500/30"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <div className="mt-6 text-center">
              <h3 className="text-white text-xl font-bold mb-2">{currentItem.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{currentItem.description}</p>
              <p className="text-white text-sm font-medium bg-black/60 backdrop-blur-sm rounded-full px-6 py-2 inline-block border border-red-500/30">
                {currentImageIndex + 1} of {filteredItems.length}
              </p>
              <p className="text-gray-400 text-sm mt-3">Use arrow keys or buttons to navigate • ESC to close</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
