"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { FileText, ArrowLeft, Truck, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { getMockOrders } from "@/lib/data"

// Definisikan tipe untuk Order
interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  lastFourDigits?: string;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
}

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    setMounted(true);
    
    const fetchOrder = async () => {
      try {
        const orders = await getMockOrders();
        const foundOrder = orders.find(o => o.id === orderId);
        if (!foundOrder) {
          router.push('/404');
          return;
        }
        setOrder(foundOrder as Order);
      } catch (error) {
        console.error("Error fetching order:", error);
        setError("Gagal memuat data pesanan");
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [orderId, router]);
  
  function getStatusBadge(status: string) {
    switch (status) {
      case "processing":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Diproses</Badge>
      case "shipped":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Dikirim</Badge>
      case "delivered":
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Terkirim</Badge>
      case "cancelled":
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Dibatalkan</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Tampilkan state loading
  if (loading || !mounted) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Memuat detail pesanan...</p>
        </div>
      </div>
    );
  }

  // Tampilkan error jika ada
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => router.push('/admin/orders')}>
            Kembali ke Daftar Pesanan
          </Button>
        </div>
      </div>
    );
  }

  // Pastikan order sudah dimuat
  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <p className="mb-4">Pesanan tidak ditemukan</p>
          <Button onClick={() => router.push('/admin/orders')}>
            Kembali ke Daftar Pesanan
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link href="/admin/orders">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Detail Pesanan</h1>
          <p className="text-muted-foreground">
            Nomor Pesanan: #{order.orderNumber}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button asChild variant="outline">
            <Link href={`/admin/orders/${order.id}/invoice`}>
              <FileText className="mr-2 h-4 w-4" />
              Invoice
            </Link>
          </Button>
          
          {order.status === "processing" && (
            <Button>
              <Truck className="mr-2 h-4 w-4" />
              Tandai Dikirim
            </Button>
          )}
          
          {order.status === "shipped" && (
            <Button>
              <CheckCircle className="mr-2 h-4 w-4" />
              Tandai Terkirim
            </Button>
          )}
          
          {(order.status === "processing" || order.status === "shipped") && (
            <Button variant="destructive">
              <XCircle className="mr-2 h-4 w-4" />
              Batalkan
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Pesanan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <div className="mt-1">{getStatusBadge(order.status)}</div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tanggal</p>
                <p className="font-medium">{new Date(order.date).toLocaleDateString("id-ID")}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Metode Pembayaran</p>
                <p className="font-medium">{order.paymentMethod}</p>
              </div>
              {order.lastFourDigits && (
                <div>
                  <p className="text-sm text-muted-foreground">Nomor Kartu</p>
                  <p className="font-medium">**** **** **** {order.lastFourDigits}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Informasi Pelanggan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Nama</p>
              <p className="font-medium">{order.shippingAddress.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Alamat Pengiriman</p>
              <p className="font-medium">
                {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}, {order.shippingAddress.country}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Produk</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produk</TableHead>
                <TableHead className="text-right">Harga</TableHead>
                <TableHead className="text-center">Jumlah</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-right">Rp {item.price.toLocaleString("id-ID")}</TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-right">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rp {order.subtotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between">
              <span>Pengiriman</span>
              <span>{order.shipping > 0 ? `Rp ${order.shipping.toLocaleString("id-ID")}` : "Gratis"}</span>
            </div>
            <div className="flex justify-between">
              <span>Pajak</span>
              <span>Rp {order.tax.toLocaleString("id-ID")}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>Rp {order.total.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 