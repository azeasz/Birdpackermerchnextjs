"use client"

import { useCart } from "@/components/providers/cart-provider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const handleCheckout = () => {
    setIsProcessing(true)
    // Simulate checkout process
    setTimeout(() => {
      router.push("/checkout")
      setIsProcessing(false)
    }, 1000)
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mb-6 flex justify-center">
          <ShoppingBag className="h-24 w-24 text-gray-300" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added any products to your cart yet.</p>
        <Button asChild>
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="hidden md:grid grid-cols-12 gap-4 mb-4 font-medium">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
            </div>

            <Separator className="mb-6" />

            {cart.map((item) => (
              <div key={item.id} className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="col-span-6 flex items-center space-x-4">
                    <div className="relative h-20 w-20 rounded overflow-hidden flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        <Link href={`/products/${item.id}`} className="hover:underline">
                          {item.name}
                        </Link>
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 p-0 h-auto mt-1"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        <span className="text-xs">Remove</span>
                      </Button>
                    </div>
                  </div>

                  <div className="col-span-2 text-center">
                    <div className="md:hidden text-sm text-gray-500 mb-1">Price:</div>${item.price.toFixed(2)}
                  </div>

                  <div className="col-span-2 flex items-center justify-center">
                    <div className="md:hidden text-sm text-gray-500 mb-1 mr-2">Quantity:</div>
                    <div className="flex items-center border rounded">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="col-span-2 text-center font-medium">
                    <div className="md:hidden text-sm text-gray-500 mb-1">Total:</div>$
                    {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>

                {cart.indexOf(item) < cart.length - 1 && <Separator className="my-6" />}
              </div>
            ))}

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button variant="outline" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(cartTotal * 0.1).toFixed(2)}</span>
              </div>

              <Separator className="my-3" />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${(cartTotal + cartTotal * 0.1).toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full" onClick={handleCheckout} disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Proceed to Checkout"}
            </Button>
          </Card>
        </div>
      </div>
    </main>
  )
}

