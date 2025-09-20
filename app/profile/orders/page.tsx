"use client"

import { useAuth } from "@/components/providers/auth-provider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Package, ChevronDown, ChevronUp, Eye } from "lucide-react"
import Link from "next/link"
import { getMockOrders } from "@/lib/data"
import type { Order } from "@/lib/types"

export default function OrdersPage() {
  const { user } = useAuth()
  const router = useRouter()

  const [orders, setOrders] = useState<Order[]>([])
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      // In a real app, we would fetch orders from an API
      const fetchOrders = async () => {
        try {
          const mockOrders = await getMockOrders()
          setOrders(mockOrders || []) // Ensure orders is always an array
        } catch (error) {
          console.error("Error fetching orders:", error)
          setOrders([]) // Set to empty array on error
        } finally {
          setIsLoading(false)
        }
      }

      fetchOrders()
    } else {
      setIsLoading(false)
    }
  }, [user])

  const toggleOrderExpand = (orderId: string) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null)
    } else {
      setExpandedOrderId(orderId)
    }
  }

  if (!user) {
    router.push("/login")
    return null
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500"
      case "shipped":
        return "bg-blue-500"
      case "processing":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Pesanan Saya</h1>

      {orders.length === 0 ? (
        <Card className="p-8 text-center">
          <Package className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-2xl font-bold mb-2">Belum ada pesanan</h2>
          <p className="text-gray-500 mb-6">Anda belum melakukan pemesanan apa pun.</p>
          <Button asChild>
            <Link href="/products">Mulai Belanja</Link>
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="p-6">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-bold mr-4">Pesanan #{order.orderNumber}</h3>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status === "delivered"
                        ? "Terkirim"
                        : order.status === "shipped"
                          ? "Dikirim"
                          : order.status === "processing"
                            ? "Diproses"
                            : "Dibatalkan"}
                    </Badge>
                  </div>
                  <p className="text-gray-500">Dipesan pada {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center mt-4 md:mt-0">
                  <p className="font-bold mr-4">Total: Rp.{order.total.toFixed(2)}</p>
                  <Button variant="outline" size="sm" onClick={() => toggleOrderExpand(order.id)}>
                    {expandedOrderId === order.id ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-2" />
                        Sembunyikan Detail
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-2" />
                        Lihat Detail
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {expandedOrderId === order.id && (
                <div className="mt-4">
                  <Separator className="mb-4" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="font-semibold mb-2">Alamat Pengiriman</h4>
                      <div className="bg-muted p-3 rounded-md">
                        <p>{order.shippingAddress.name}</p>
                        <p>{order.shippingAddress.street}</p>
                        <p>
                          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                        </p>
                        <p>{order.shippingAddress.country}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Informasi Pembayaran</h4>
                      <div className="bg-muted p-3 rounded-md">
                        <p>Metode Pembayaran: {order.paymentMethod}</p>
                        {order.paymentMethod === "Credit Card" && <p>Kartu berakhiran {order.lastFourDigits}</p>}
                      </div>
                    </div>
                  </div>

                  <h4 className="font-semibold mb-2">Item Pesanan</h4>
                  <div className="bg-muted rounded-md overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 p-3 font-medium bg-muted/50">
                      <div className="col-span-6">Produk</div>
                      <div className="col-span-2 text-center">Harga</div>
                      <div className="col-span-2 text-center">Jumlah</div>
                      <div className="col-span-2 text-center">Total</div>
                    </div>

                    {order.items.map((item, index) => (
                      <div key={index} className="grid grid-cols-12 gap-4 p-3 border-t border-border">
                        <div className="col-span-6">
                          <Link href={`/products/${item.productId}`} className="font-medium hover:underline">
                            {item.name}
                          </Link>
                        </div>
                        <div className="col-span-2 text-center">Rp.{item.price.toFixed(2)}</div>
                        <div className="col-span-2 text-center">{item.quantity}</div>
                        <div className="col-span-2 text-center">Rp.{(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    ))}

                    <div className="p-3 border-t border-border">
                      <div className="flex justify-end">
                        <div className="w-64">
                          <div className="flex justify-between mb-1">
                            <span>Subtotal:</span>
                            <span>Rp.{order.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span>Pengiriman:</span>
                            <span>Rp.{order.shipping.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span>Pajak:</span>
                            <span>Rp.{order.tax.toFixed(2)}</span>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between font-bold">
                            <span>Total:</span>
                            <span>Rp.{order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/profile/orders/${order.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Lihat Detail Pesanan
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}

