"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Printer } from "lucide-react"
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

export default function OrderInvoicePage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  
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
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [orderId, router]);
  
  const handlePrint = () => {
    window.print();
  };

  // Tambahkan CSS global untuk keperluan cetak
  useEffect(() => {
    // Menambahkan style untuk print
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        body * {
          visibility: hidden;
        }
        .print-area, .print-area * {
          visibility: visible;
        }
        .print-area {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        .no-print {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  if (loading || !mounted || !order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Memuat invoice...</p>
      </div>
    )
  }
  
  const invoiceDate = new Date(order.date).toLocaleDateString("id-ID");
  const currentDate = new Date().toLocaleDateString("id-ID");
  
  return (
    <div className="p-4">
      <div className="print:hidden mb-6 flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/orders/${order.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Link>
        </Button>
        <Button onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Cetak Invoice
        </Button>
      </div>
      
      <div className="mx-auto max-w-4xl border border-gray-200 p-8 print:border-none">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">INVOICE</h1>
            <p className="text-sm text-muted-foreground">#{order.orderNumber}</p>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-semibold">Birdpacker Merch</h2>
            <p className="text-xs text-muted-foreground">Jalan Contoh No.123</p>
            <p className="text-xs text-muted-foreground">Jakarta, Indonesia 12345</p>
            <p className="text-xs text-muted-foreground">contact@birdpackermerch.com</p>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-xs font-semibold uppercase text-muted-foreground">Tagihan Kepada</h3>
            <p className="mt-1 font-medium">{order.shippingAddress.name}</p>
            <p className="mt-1 text-sm">
              {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}, {order.shippingAddress.country}
            </p>
          </div>
          <div className="text-right">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Nomor Invoice:</div>
              <div>{order.orderNumber}</div>
              <div className="text-muted-foreground">Tanggal Invoice:</div>
              <div>{invoiceDate}</div>
              <div className="text-muted-foreground">Tanggal Jatuh Tempo:</div>
              <div>{currentDate}</div>
              <div className="text-muted-foreground">Status Pembayaran:</div>
              <div className="font-medium">Lunas</div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300 text-left">
                <th className="py-2 font-semibold text-muted-foreground">Deskripsi</th>
                <th className="py-2 text-right font-semibold text-muted-foreground">Harga</th>
                <th className="py-2 text-center font-semibold text-muted-foreground">Jumlah</th>
                <th className="py-2 text-right font-semibold text-muted-foreground">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index} className={index !== order.items.length - 1 ? "border-b border-gray-200" : ""}>
                  <td className="py-4">{item.name}</td>
                  <td className="py-4 text-right">Rp {item.price.toLocaleString("id-ID")}</td>
                  <td className="py-4 text-center">{item.quantity}</td>
                  <td className="py-4 text-right">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 flex justify-end">
          <div className="w-80">
            <div className="flex justify-between border-b border-gray-200 py-2">
              <div className="text-muted-foreground">Subtotal</div>
              <div>Rp {order.subtotal.toLocaleString("id-ID")}</div>
            </div>
            <div className="flex justify-between border-b border-gray-200 py-2">
              <div className="text-muted-foreground">Pengiriman</div>
              <div>{order.shipping > 0 ? `Rp ${order.shipping.toLocaleString("id-ID")}` : "Gratis"}</div>
            </div>
            <div className="flex justify-between border-b border-gray-200 py-2">
              <div className="text-muted-foreground">Pajak</div>
              <div>Rp {order.tax.toLocaleString("id-ID")}</div>
            </div>
            <div className="flex justify-between py-2 font-semibold">
              <div>Total</div>
              <div>Rp {order.total.toLocaleString("id-ID")}</div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-6">
          <p className="text-center text-sm text-muted-foreground">
            Terima kasih atas pembelian Anda. Silakan hubungi kami jika ada pertanyaan terkait invoice ini.
          </p>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            contact@birdpackermerch.com | +62 123 4567 890
          </p>
        </div>
      </div>
    </div>
  )
} 