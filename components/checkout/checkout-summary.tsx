import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { CartItem } from "@/components/providers/cart-provider"

interface CheckoutSummaryProps {
  cart: CartItem[]
  cartTotal: number
  shippingMethod: string
}

export default function CheckoutSummary({ cart, cartTotal, shippingMethod }: CheckoutSummaryProps) {
  const shippingCost = shippingMethod === "express" ? 15 : 0
  const taxAmount = cartTotal * 0.1
  const totalAmount = cartTotal + shippingCost + taxAmount

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      <div className="mb-4">
        <div className="text-sm text-muted-foreground mb-2">
          {cart.length} {cart.length === 1 ? "item" : "items"}
        </div>

        <div className="max-h-60 overflow-y-auto mb-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between py-2 border-b">
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
              </div>
              <div className="text-right">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax (10%)</span>
          <span>${taxAmount.toFixed(2)}</span>
        </div>

        <Separator className="my-3" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </Card>
  )
}

