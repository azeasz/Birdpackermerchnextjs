"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import type { Product } from "@/lib/types"
import { getProducts } from "@/lib/data"

interface ProductsContextType {
  products: Product[]
  isLoading: boolean
  error: string | null
}

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  isLoading: false,
  error: null,
})

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (err) {
        setError("Failed to fetch products")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return <ProductsContext.Provider value={{ products, isLoading, error }}>{children}</ProductsContext.Provider>
}

export const useProducts = () => useContext(ProductsContext)

