"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/providers/auth-provider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, ShoppingCart, Trash2, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/providers/cart-provider"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/types"

export default function WishlistPage() {
  const { user } = useAuth()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [wishlist, setWishlist] = useState<Product[]>([])

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll use localStorage
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist))
      } catch (error) {
        console.error("Failed to parse wishlist:", error)
      }
    }
  }, [])

  const removeFromWishlist = (productId: string) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== productId)
    setWishlist(updatedWishlist)
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))

    toast({
      title: "Dihapus dari wishlist",
      description: "Produk telah dihapus dari wishlist Anda.",
    })
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    toast({
      title: "Ditambahkan ke keranjang",
      description: `${product.name} telah ditambahkan ke keranjang Anda.`,
    })
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
        <h1 className="text-3xl font-bold mb-4">Login Diperlukan</h1>
        <p className="text-gray-500 mb-8">Silakan login untuk melihat wishlist Anda.</p>
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    )
  }

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
        <h1 className="text-3xl font-bold mb-4">Wishlist Anda kosong</h1>
        <p className="text-gray-500 mb-8">Anda belum menambahkan produk ke wishlist Anda.</p>
        <Button asChild>
          <Link href="/products">Mulai Belanja</Link>
        </Button>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <Heart className="h-6 w-6 mr-2" />
        Wishlist Saya
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative aspect-square">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={() => removeFromWishlist(product.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4">
              <Link href={`/products/${product.id}`} className="block">
                <h3 className="font-medium mb-1 hover:underline">{product.name}</h3>
              </Link>
              <div className="flex items-center mb-4">
                {product.discount > 0 ? (
                  <>
                    <span className="font-bold">${(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                    <span className="ml-2 text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                )}
              </div>
              <Button className="w-full" onClick={() => handleAddToCart(product)}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Tambahkan ke Keranjang
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </main>
  )
}

