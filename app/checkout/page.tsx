"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "@/components/providers/cart-provider"
import { useAuth } from "@/components/providers/auth-provider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { CreditCard, Landmark, Truck, Home, CreditCardIcon } from "lucide-react"
import CheckoutSummary from "@/components/checkout/checkout-summary"
import AddressForm from "@/components/checkout/address-form"
import PaymentMethodForm from "@/components/checkout/payment-method-form"

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const [isProcessing, setIsProcessing] = useState(false)
  const [activeStep, setActiveStep] = useState("shipping")
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
  })
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("credit_card")
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
  })

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setActiveStep("payment")
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setActiveStep("review")
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true)

    // Simulate order processing
    setTimeout(() => {
      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been placed and will be processed shortly.",
      })
      clearCart()
      router.push("/profile/orders")
      setIsProcessing(false)
    }, 2000)
  }

  if (cart.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs value={activeStep} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="shipping" disabled={activeStep !== "shipping"}>
                Shipping
              </TabsTrigger>
              <TabsTrigger value="payment" disabled={activeStep !== "payment" && activeStep !== "shipping"}>
                Payment
              </TabsTrigger>
              <TabsTrigger value="review" disabled={activeStep !== "review" && activeStep !== "payment"}>
                Review
              </TabsTrigger>
            </TabsList>

            <TabsContent value="shipping">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                <form onSubmit={handleShippingSubmit}>
                  <AddressForm shippingInfo={shippingInfo} setShippingInfo={setShippingInfo} />

                  <Separator className="my-6" />

                  <h3 className="text-lg font-semibold mb-4">Shipping Method</h3>
                  <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-4">
                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Truck className="mr-2 h-5 w-5" />
                            <span>Standard Shipping (3-5 business days)</span>
                          </div>
                          <span>Free</span>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Truck className="mr-2 h-5 w-5" />
                            <span>Express Shipping (1-2 business days)</span>
                          </div>
                          <span>$15.00</span>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="mt-6 flex justify-end">
                    <Button type="submit">Continue to Payment</Button>
                  </div>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="payment">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                <form onSubmit={handlePaymentSubmit}>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4 mb-6">
                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                      <RadioGroupItem value="credit_card" id="credit_card" />
                      <Label htmlFor="credit_card" className="flex-1 cursor-pointer">
                        <div className="flex items-center">
                          <CreditCard className="mr-2 h-5 w-5" />
                          <span>Credit / Debit Card</span>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                        <div className="flex items-center">
                          <CreditCardIcon className="mr-2 h-5 w-5" />
                          <span>PayPal</span>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                      <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                      <Label htmlFor="bank_transfer" className="flex-1 cursor-pointer">
                        <div className="flex items-center">
                          <Landmark className="mr-2 h-5 w-5" />
                          <span>Bank Transfer</span>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "credit_card" && (
                    <PaymentMethodForm cardInfo={cardInfo} setCardInfo={setCardInfo} />
                  )}

                  <div className="mt-6 flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveStep("shipping")}>
                      Back to Shipping
                    </Button>
                    <Button type="submit">Review Order</Button>
                  </div>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="review">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Review Your Order</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <Home className="mr-2 h-5 w-5" />
                      Shipping Information
                    </h3>
                    <div className="bg-muted p-4 rounded-md">
                      <p className="font-medium">{shippingInfo.fullName}</p>
                      <p>{shippingInfo.address}</p>
                      <p>
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                      </p>
                      <p>{shippingInfo.country}</p>
                      <p>Email: {shippingInfo.email}</p>
                      <p>Phone: {shippingInfo.phone}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <Truck className="mr-2 h-5 w-5" />
                      Shipping Method
                    </h3>
                    <div className="bg-muted p-4 rounded-md">
                      <p>
                        {shippingMethod === "standard"
                          ? "Standard Shipping (3-5 business days)"
                          : "Express Shipping (1-2 business days)"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Payment Method
                    </h3>
                    <div className="bg-muted p-4 rounded-md">
                      {paymentMethod === "credit_card" && (
                        <div>
                          <p>Credit Card</p>
                          <p>Card ending in {cardInfo.cardNumber.slice(-4)}</p>
                        </div>
                      )}
                      {paymentMethod === "paypal" && <p>PayPal</p>}
                      {paymentMethod === "bank_transfer" && <p>Bank Transfer</p>}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveStep("payment")}>
                    Back to Payment
                  </Button>
                  <Button onClick={handlePlaceOrder} disabled={isProcessing}>
                    {isProcessing ? "Processing..." : "Place Order"}
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <CheckoutSummary cart={cart} cartTotal={cartTotal} shippingMethod={shippingMethod} />
        </div>
      </div>
    </main>
  )
}

