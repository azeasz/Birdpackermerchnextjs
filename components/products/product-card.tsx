"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useCart } from "@/components/providers/cart-provider"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/types"
import { ShoppingCart, Eye } from "lucide-react"

interface ProductCardProps {
  product: Product
  listView?: boolean
}

export default function ProductCard({ product, listView = false }: ProductCardProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product)
    toast({
      title: "Ditambahkan ke keranjang",
      description: `${product.name} telah ditambahkan ke keranjang Anda.`,
    })
  }

  // Pastikan tidak ada pembaruan state yang tidak perlu dalam komponen ini
  // Fungsi handleQuickView sudah benar, tapi pastikan tidak ada pembaruan state yang tidak perlu
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push(`/products/${product.id}`)
  }

  if (listView) {
    return (
      <Card className="overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="relative h-48 sm:h-auto sm:w-48 flex-shrink-0">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            {product.isNew && <Badge className="absolute top-2 left-2">Baru</Badge>}
            {product.discount > 0 && (
              <Badge variant="destructive" className="absolute top-2 right-2">
                -{product.discount}%
              </Badge>
            )}
          </div>

          <div className="p-4 flex flex-col flex-grow">
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">
                  <Link href={`/products/${product.id}`} className="hover:underline">
                    {product.name}
                  </Link>
                </h3>
                <div className="flex items-center">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  <span className="ml-1 text-sm text-gray-500">({product.reviewCount})</span>
                </div>
              </div>

              <p className="text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

              <div className="flex items-center mb-2">
                {product.discount > 0 ? (
                  <>
                    <span className="text-xl font-bold">
                      Rp {Math.round(product.price * (1 - product.discount / 100)).toLocaleString('id-ID')}
                    </span>
                    <span className="ml-2 text-muted-foreground line-through">Rp {product.price.toLocaleString('id-ID')}</span>
                  </>
                ) : (
                  <span className="text-xl font-bold">Rp {product.price.toLocaleString('id-ID')}</span>
                )}
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              <Button size="sm" onClick={handleAddToCart}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Tambahkan ke Keranjang
              </Button>
              <Button size="sm" variant="outline" onClick={handleQuickView}>
                <Eye className="h-4 w-4 mr-2" />
                Lihat Detail
              </Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card
      className="overflow-hidden transition-all duration-200 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300"
          style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
        />

        {product.isNew && <Badge className="absolute top-2 left-2">Baru</Badge>}

        {product.discount > 0 && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            -{product.discount}%
          </Badge>
        )}

        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center space-x-2 transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Button size="icon" variant="secondary" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Tambahkan ke Keranjang</span>
          </Button>
          <Button size="icon" variant="secondary" onClick={handleQuickView}>
            <Eye className="h-4 w-4" />
            <span className="sr-only">Lihat Detail</span>
          </Button>
        </div>
      </div>

      <Link href={`/products/${product.id}`} className="block p-4">
        <div className="flex items-center mb-2">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          <span className="ml-1 text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        <h3 className="font-medium mb-1 line-clamp-1">{product.name}</h3>

        <div className="flex items-center">
          {product.discount > 0 ? (
            <>
              <span className="font-bold">Rp {Math.round(product.price * (1 - product.discount / 100)).toLocaleString('id-ID')}</span>
              <span className="ml-2 text-sm text-muted-foreground line-through">Rp {product.price.toLocaleString('id-ID')}</span>
            </>
          ) : (
            <span className="font-bold">Rp {product.price.toLocaleString('id-ID')}</span>
          )}
        </div>
      </Link>
    </Card>
  )
}

