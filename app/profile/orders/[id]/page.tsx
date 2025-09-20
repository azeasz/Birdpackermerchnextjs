"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/providers/auth-provider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { ChevronLeft, Package, Truck, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { getMockOrders } from "@/lib/data"
import type { Order } from "@/lib/types"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // In a real app, we would fetch the specific order from an API
        const orders = await getMockOrders()
        const foundOrder = orders.find((o) => o.id === params.id)
        setOrder(foundOrder || null)
      } catch (error) {
        console.error("Error fetching order:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchOrder()
    }
  }, [user, params.id])

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

  if (!order) {
    return (
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/profile/orders">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Kembali ke Pesanan
          </Link>
        </Button>

        <Card className="p-8 text-center">
          <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-2xl font-bold mb-2">Pesanan Tidak Ditemukan</h2>
          <p className="text-muted-foreground mb-6">Maaf, kami tidak dapat menemukan pesanan yang Anda cari.</p>
          <Button asChild>
            <Link href="/profile/orders">Lihat Semua Pesanan</Link>
          </Button>
        </Card>
      </main>
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-5 w-5" />
      case "shipped":
        return <Truck className="h-5 w-5" />
      case "processing":
        return <Clock className="h-5 w-5" />
      case "cancelled":
        return <AlertTriangle className="h-5 w-5" />
      default:
        return <Package className="h-5 w-5" />
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Button variant="ghost" size="sm" asChild className="mb-8">
        <Link href="/profile/orders">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Kembali ke Pesanan
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-1">Pesanan #{order.orderNumber}</h1>
                <p className="text-muted-foreground">Dipesan pada {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <Badge className={`${getStatusColor(order.status)} flex items-center mt-2 md:mt-0`}>
                {getStatusIcon(order.status)}
                <span className="ml-1">
                  {order.status === "delivered"
                    ? "Terkirim"
                    : order.status === "shipped"
                      ? "Dikirim"
                      : order.status === "processing"
                        ? "Diproses"
                        : "Dibatalkan"}
                </span>
              </Badge>
            </div>

            <div className="space-y-6">
              {order.status === "shipped" && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                  <h3 className="font-semibold flex items-center text-blue-700 dark:text-blue-300">
                    <Truck className="h-5 w-5 mr-2" />
                    Informasi Pengiriman
                  </h3>
                  <p className="text-sm mt-2">
                    Pesanan Anda sedang dalam perjalanan! Nomor pelacakan: <strong>TRK12345678</strong>
                  </p>
                  <Button variant="link" className="p-0 h-auto text-blue-700 dark:text-blue-300">
                    Lacak Pesanan
                  </Button>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-3">Item Pesanan</h3>
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
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-3">Alamat Pengiriman</h3>
              <div className="bg-muted p-3 rounded-md">
                <p className="font-medium">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-3">Metode Pembayaran</h3>
              <div className="bg-muted p-3 rounded-md">
                <p>Metode: {order.paymentMethod}</p>
                {order.paymentMethod === "Credit Card" && <p>Kartu berakhiran {order.lastFourDigits}</p>}
                <p className="mt-2 font-medium">Status: Dibayar</p>
              </div>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 mb-6">
            <h3 className="font-semibold mb-4">Tindakan</h3>
            <div className="space-y-3">
              <Button className="w-full">Hubungi Dukungan</Button>
              {order.status !== "delivered" && order.status !== "cancelled" && (
                <Button variant="outline" className="w-full">
                  Batalkan Pesanan
                </Button>
              )}
              {order.status === "delivered" && (
                <Button variant="outline" className="w-full">
                  Kembalikan Item
                </Button>
              )}
              <Button variant="outline" className="w-full">
                Unduh Invoice
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Status Pesanan</h3>
            <div className="relative">
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-muted-foreground/30"></div>

              <div className="relative pl-8 pb-6">
                <div className="absolute left-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium">Pesanan Diterima</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div className="relative pl-8 pb-6">
                <div
                  className={`absolute left-0 w-6 h-6 rounded-full ${
                    order.status === "processing" || order.status === "shipped" || order.status === "delivered"
                      ? "bg-primary"
                      : "bg-muted"
                  } flex items-center justify-center`}
                >
                  {order.status === "processing" || order.status === "shipped" || order.status === "delivered" ? (
                    <CheckCircle className="h-4 w-4 text-white" />
                  ) : (
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium">Diproses</h4>
                  <p className="text-sm text-muted-foreground">
                    {order.status === "processing" || order.status === "shipped" || order.status === "delivered"
                      ? "Pesanan Anda sedang diproses"
                      : "Menunggu pemrosesan"}
                  </p>
                </div>
              </div>

              <div className="relative pl-8 pb-6">
                <div
                  className={`absolute left-0 w-6 h-6 rounded-full ${
                    order.status === "shipped" || order.status === "delivered" ? "bg-primary" : "bg-muted"
                  } flex items-center justify-center`}
                >
                  {order.status === "shipped" || order.status === "delivered" ? (
                    <CheckCircle className="h-4 w-4 text-white" />
                  ) : (
                    <Truck className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium">Dikirim</h4>
                  <p className="text-sm text-muted-foreground">
                    {order.status === "shipped" || order.status === "delivered"
                      ? "Pesanan Anda dalam perjalanan"
                      : "Menunggu pengiriman"}
                  </p>
                </div>
              </div>

              <div className="relative pl-8">
                <div
                  className={`absolute left-0 w-6 h-6 rounded-full ${
                    order.status === "delivered" ? "bg-primary" : "bg-muted"
                  } flex items-center justify-center`}
                >
                  {order.status === "delivered" ? (
                    <CheckCircle className="h-4 w-4 text-white" />
                  ) : (
                    <Package className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium">Terkirim</h4>
                  <p className="text-sm text-muted-foreground">
                    {order.status === "delivered" ? "Pesanan Anda telah diterima" : "Menunggu pengiriman"}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}

