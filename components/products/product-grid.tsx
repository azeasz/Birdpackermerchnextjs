"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import ProductCard from "./product-card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"
import { getProducts } from "@/lib/data"
import { LayoutGrid, LayoutList } from "lucide-react"

interface ProductGridProps {
  initialProducts?: Product[]
}

export default function ProductGrid({ initialProducts }: ProductGridProps) {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>(initialProducts || [])
  const [isGridView, setIsGridView] = useState(true)
  const [isLoading, setIsLoading] = useState(!initialProducts)

  const category = searchParams.get("category")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const sort = searchParams.get("sort")
  const search = searchParams.get("search")

  useEffect(() => {
    const fetchProducts = async () => {
      if (initialProducts) {
        setProducts(initialProducts)
        return
      }

      setIsLoading(true)
      try {
        // In a real app, we would pass these filters to the API
        const allProducts = await getProducts()

        // Apply filters
        let filteredProducts = [...allProducts]

        if (category) {
          filteredProducts = filteredProducts.filter((product) => product.categoryId === category)
        }

        if (minPrice) {
          filteredProducts = filteredProducts.filter((product) => product.price >= Number(minPrice))
        }

        if (maxPrice) {
          filteredProducts = filteredProducts.filter((product) => product.price <= Number(maxPrice))
        }

        if (search) {
          const searchLower = search.toLowerCase()
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.name.toLowerCase().includes(searchLower) ||
              product.description.toLowerCase().includes(searchLower),
          )
        }

        // Apply sorting
        if (sort) {
          switch (sort) {
            case "price-asc":
              filteredProducts.sort((a, b) => a.price - b.price)
              break
            case "price-desc":
              filteredProducts.sort((a, b) => b.price - a.price)
              break
            case "name-asc":
              filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
              break
            case "name-desc":
              filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
              break
            case "newest":
              filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              break
            default:
              break
          }
        }

        setProducts(filteredProducts)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
    // Tambahkan dependency array yang tepat untuk menghindari pembaruan berulang
  }, [category, minPrice, maxPrice, sort, search, initialProducts])

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="bg-muted animate-pulse rounded-lg h-80"></div>
          ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">Tidak ada produk ditemukan</h3>
        <p className="text-muted-foreground mb-6">
          Coba sesuaikan filter atau istilah pencarian Anda untuk menemukan apa yang Anda cari.
        </p>
        <Button asChild>
          <a href="/products">Lihat Semua Produk</a>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">Menampilkan {products.length} produk</p>
        <div className="flex space-x-2">
          <Button variant={isGridView ? "default" : "outline"} size="icon" onClick={() => setIsGridView(true)}>
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button variant={!isGridView ? "default" : "outline"} size="icon" onClick={() => setIsGridView(false)}>
            <LayoutList className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isGridView ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} listView />
          ))}
        </div>
      )}
    </div>
  )
}

