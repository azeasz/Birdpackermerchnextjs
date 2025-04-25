"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Data untuk slides
const slides = [
  {
    id: 1,
    title: "Eksplorasi Alam Indonesia",
    description:
      "Temukan koleksi baju, poster, peta offline, ilustrasi, dan buku panduan alam yang dirancang khusus untuk para pecinta alam dan pengamat satwa.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kiJA60xRTI9U8rHERFPyvrQi4zjaeu.png",
    bgColor: "bg-blue-50",
    buttonText: "Belanja Sekarang",
    buttonLink: "/products",
    secondaryButtonText: "Lihat Kategori",
    secondaryButtonLink: "/categories",
  },
  {
    id: 2,
    title: "Koleksi Kaos Eksklusif",
    description:
      "Tampilkan kecintaan Anda pada alam dengan koleksi kaos eksklusif kami. Desain unik dengan bahan berkualitas tinggi.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VN3L2iezuQtxOxEcvlpvHltTn7dFst.png",
    bgColor: "bg-green-50",
    buttonText: "Lihat Koleksi",
    buttonLink: "/products?category=category-1",
    secondaryButtonText: "Pelajari Lebih Lanjut",
    secondaryButtonLink: "/about",
  },
  {
    id: 3,
    title: "Panduan Identifikasi Burung Terkomplit",
    description:
      "Buku panduan lapangan yang komprehensif untuk mengidentifikasi berbagai spesies burung di Indonesia. 100% Karya Anak Bangsa.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PsRT0rjTYBQhD3WlmX6lHihpul1IKs.png",
    bgColor: "bg-blue-50",
    buttonText: "Beli Sekarang",
    buttonLink: "/products/product-6",
    secondaryButtonText: "Lihat Detail",
    secondaryButtonLink: "/products?category=category-5",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState("next")

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setDirection("next")
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
      setIsAnimating(false)
    }, 500)
  }, [isAnimating])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    setDirection("prev")
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
      setIsAnimating(false)
    }, 500)
  }, [isAnimating])

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <section className={`relative overflow-hidden transition-colors duration-500 ${slides[currentSlide].bgColor}`}>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="z-10">
            <div
              className={`transition-all duration-500 transform ${
                isAnimating
                  ? direction === "next"
                    ? "-translate-x-10 opacity-0"
                    : "translate-x-10 opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">{slides[currentSlide].description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href={slides[currentSlide].buttonLink}>{slides[currentSlide].buttonText}</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href={slides[currentSlide].secondaryButtonLink}>
                    {slides[currentSlide].secondaryButtonText}
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <div
              className={`absolute inset-0 transition-all duration-500 transform ${
                isAnimating
                  ? direction === "next"
                    ? "translate-x-full opacity-0"
                    : "-translate-x-full opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 mix-blend-overlay z-10" />
              <img
                src={slides[currentSlide].image || "/placeholder.svg"}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/80 hover:bg-white"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/80 hover:bg-white"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? "bg-primary w-4" : "bg-gray-400"
              }`}
              onClick={() => {
                setDirection(index > currentSlide ? "next" : "prev")
                setCurrentSlide(index)
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

