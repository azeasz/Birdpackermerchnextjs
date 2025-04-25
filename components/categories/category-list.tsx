"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { getCategories } from "@/lib/data"
import type { Category } from "@/lib/types"

export function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories()
      setCategories(data)
    }

    fetchCategories()
  }, [])

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Link key={category.id} href={`/products?category=${category.id}`} className="block">
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <div className="aspect-square relative">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white font-bold text-lg text-center px-2">{category.name}</h3>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}

