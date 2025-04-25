"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getCategories } from "@/lib/data"
import type { Category } from "@/lib/types"

export default function ProductFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Inisialisasi state langsung dari searchParams untuk menghindari pembaruan berulang
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get("category"))
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get("minPrice") || 0),
    Number(searchParams.get("maxPrice") || 500000),
  ])
  const [sort, setSort] = useState<string>(searchParams.get("sort") || "newest")
  const [availability, setAvailability] = useState<string | null>(searchParams.get("availability"))

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories()
      setCategories(data)
    }

    fetchCategories()
  }, [])

  const createQueryString = (params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString())

    // Update or remove params
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key)
      } else {
        newParams.set(key, value)
      }
    })

    return newParams.toString()
  }

  const applyFilters = () => {
    const queryString = createQueryString({
      category: selectedCategory,
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
      sort: sort,
      availability: availability,
    })

    router.push(`${pathname}?${queryString}`)
  }

  const resetFilters = () => {
    setSelectedCategory(null)
    setPriceRange([0, 500000])
    setSort("newest")
    setAvailability(null)

    router.push(pathname)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Filter</h3>
        <div className="flex space-x-2">
          <Button onClick={applyFilters} className="flex-1">
            Terapkan
          </Button>
          <Button variant="outline" onClick={resetFilters} className="flex-1">
            Reset
          </Button>
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "price", "sort", "availability"]}>
        <AccordionItem value="categories">
          <AccordionTrigger>Kategori</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategory === category.id}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCategory(category.id)
                      } else {
                        setSelectedCategory(null)
                      }
                    }}
                  />
                  <Label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Rentang Harga</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={priceRange}
                min={0}
                max={500000}
                step={10000}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">Rp {priceRange[0].toLocaleString('id-ID')}</span>
                <span className="text-sm">Rp {priceRange[1].toLocaleString('id-ID')}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="sort">
          <AccordionTrigger>Urutkan Berdasarkan</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[
                { value: "newest", label: "Terbaru" },
                { value: "price-asc", label: "Harga: Rendah ke Tinggi" },
                { value: "price-desc", label: "Harga: Tinggi ke Rendah" },
                { value: "name-asc", label: "Nama: A ke Z" },
                { value: "name-desc", label: "Nama: Z ke A" },
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`sort-${option.value}`}
                    checked={sort === option.value}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSort(option.value)
                      }
                    }}
                  />
                  <Label htmlFor={`sort-${option.value}`} className="text-sm cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability">
          <AccordionTrigger>Ketersediaan</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={availability === "in-stock"}
                  onCheckedChange={(checked) => {
                    setAvailability(checked ? "in-stock" : null)
                  }}
                />
                <Label htmlFor="in-stock" className="text-sm cursor-pointer">
                  Tersedia
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="out-of-stock"
                  checked={availability === "out-of-stock"}
                  onCheckedChange={(checked) => {
                    setAvailability(checked ? "out-of-stock" : null)
                  }}
                />
                <Label htmlFor="out-of-stock" className="text-sm cursor-pointer">
                  Tidak Tersedia
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

