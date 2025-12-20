"use client"

import type React from "react"
import { useState } from "react"
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"

type GalleryItem = {
  id: number
  category: string
  title: string
  images: string[]
  description: string
}

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [activeAlbum, setActiveAlbum] = useState<GalleryItem | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const categories = [
    "All",
    "Educational Trip",
    "Volunteer Work",
    "Journal & Certificates",
  ]

  const galleryItems: GalleryItem[] = [
    // ─── Educational Trips ───
    {
      id: 1,
      category: "Educational Trip",
      title: "PLDT Vitro Davao",
      images: ["/pldt 1.jpg", "/pldt 2.jpg", "/pldt 3.jpg"],
      description: "Exploring modern data center infrastructure",
    },
    {
      id: 2,
      category: "Educational Trip",
      title: "Jairosoft Corporation",
      images: ["/jai 1.jpg", "/jai 2.jpg", "/jai 3.jpg"],
      description: "Learning from real-world software teams",
    },
    {
      id: 3,
      category: "Educational Trip",
      title: "Central 911 Davao",
      images: ["/cent 1.jpg", "/cent 2.jpg", "/cent 3.jpg"],
      description: "Technology behind emergency response systems",
    },

    // ─── Volunteer Work ───
    {
      id: 4,
      category: "Volunteer Work",
      title: "Volunteer Experience",
      images: Array.from({ length: 19 }, (_, i) => `/s1 (${i + 1}).jpg`),
      description: "Community and healthcare support activities",
    },

    // ─── Journal & Certificates (KEEP ONLY THIS ONE) ───
    {
      id: 100,
      category: "Journal & Certificates",
      title: "Journal & Certificates",
      images: [
        "/journal 1.jpg",
        "/journal 2.jpg",
        "/journal 3.jpg",
        "/journal 4.jpg",
        "/cert.jpg",
      ],
      description: "Scanned journal pages and official certificates",
    },
  ]

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory)

  const openAlbum = (item: GalleryItem) => {
    setActiveAlbum(item)
    setActiveIndex(0)
  }

  const closeAlbum = () => setActiveAlbum(null)

  const prevImage = () => setActiveIndex((i) => Math.max(i - 1, 0))
  const nextImage = () =>
    setActiveIndex((i) =>
      activeAlbum ? Math.min(i + 1, activeAlbum.images.length - 1) : i
    )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeAlbum()
    if (e.key === "ArrowLeft") prevImage()
    if (e.key === "ArrowRight") nextImage()
  }

  return (
    <section className="relative w-full mt-24 px-4">
      <h2 className="text-3xl md:text-4xl font-bold neon-glow mb-2 text-center">
        My Gallery
      </h2>
      <p className="text-gray-400 mb-10 text-sm md:text-base max-w-xl mx-auto text-center">
        A curated collection of experiences
      </p>

      {/* FILTERS */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border-2 ${
              selectedCategory === category
                ? "border-red-500 text-white bg-red-600/20 shadow-lg shadow-red-400/40"
                : "border-gray-500 text-white hover:border-red-500 hover:scale-105 hover:shadow-lg hover:shadow-red-400/20"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            onClick={() => openAlbum(item)}
            className="relative h-56 rounded-2xl overflow-hidden glass border border-red-500/30 transition-all duration-500 hover:border-red-400 hover:shadow-[0_0_25px_rgba(239,68,68,0.35)]"
          >
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex flex-col justify-end">
              <h3 className="text-white font-bold text-sm">{item.title}</h3>
              <p className="text-red-300 text-xs">
                {item.images.length} photo(s)
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* MODAL */}
      {activeAlbum && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={closeAlbum}
              className="absolute -top-12 left-0 flex items-center gap-2 text-white hover:text-red-400"
            >
              <ArrowLeft className="w-6 h-6" /> Back to Gallery
            </button>

            <button
              onClick={closeAlbum}
              className="absolute -top-12 right-0 text-white hover:text-red-400"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="rounded-2xl overflow-hidden border-4 border-red-500/40 bg-black shadow-2xl shadow-red-500/30">
              <img
                src={activeAlbum.images[activeIndex]}
                alt={activeAlbum.title}
                className="w-full max-h-[60vh] object-contain"
              />
            </div>

            <button
              onClick={prevImage}
              disabled={activeIndex === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 p-3 rounded-full border border-red-500/30 text-white disabled:opacity-30"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <button
              onClick={nextImage}
              disabled={activeIndex === activeAlbum.images.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 p-3 rounded-full border border-red-500/30 text-white disabled:opacity-30"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
  