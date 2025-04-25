"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  MoreHorizontal, 
  Eye, 
  FileText, 
  Truck, 
  CheckCircle,
  XCircle,
  Search,
  Loader2 
} from "lucide-react"
import { getMockOrders } from "@/lib/data"

// Definisikan tipe Order
interface OrderItem {
  productId: string;
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
  userId: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  lastFourDigits?: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    setMounted(true);
    
    const fetchOrders = async () => {
      try {
        const data = await getMockOrders();
        setOrders(data as Order[]);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  // Filter orders berdasarkan pencarian dan filter
  const filteredOrders = orders.filter(order => {
    // Filter berdasarkan status
    if (statusFilter !== "all" && order.status !== statusFilter) {
      return false;
    }
    
    // Filter berdasarkan pencarian
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.orderNumber.toLowerCase().includes(query) ||
        order.shippingAddress.name.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  // Tampilkan loading state jika belum di-mount
  if (!mounted) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pesanan</h1>
          <p className="text-muted-foreground">
            Memuat data pesanan...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pesanan</h1>
        <p className="text-muted-foreground">
          Kelola pesanan pelanggan Anda.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
          <div>
            <label className="text-sm font-medium mb-1 block">Status</label>
            <Select 
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Semua status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua status</SelectItem>
                <SelectItem value="processing">Diproses</SelectItem>
                <SelectItem value="shipped">Dikirim</SelectItem>
                <SelectItem value="delivered">Terkirim</SelectItem>
                <SelectItem value="cancelled">Dibatalkan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Tanggal</label>
            <Select 
              value={dateFilter}
              onValueChange={setDateFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Semua waktu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua waktu</SelectItem>
                <SelectItem value="today">Hari ini</SelectItem>
                <SelectItem value="yesterday">Kemarin</SelectItem>
                <SelectItem value="week">Minggu ini</SelectItem>
                <SelectItem value="month">Bulan ini</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:w-72">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Cari pesanan..." 
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No. Pesanan</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="w-[100px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                    <p className="text-muted-foreground">Memuat data pesanan...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  {searchQuery || statusFilter !== "all" ? 
                    "Tidak ada pesanan yang sesuai dengan filter" : 
                    "Belum ada pesanan"}
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>{order.shippingAddress.name}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString("id-ID")}</TableCell>
                  <TableCell>
                    {order.status === "processing" && (
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        Diproses
                      </Badge>
                    )}
                    {order.status === "shipped" && (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        Dikirim
                      </Badge>
                    )}
                    {order.status === "delivered" && (
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Terkirim
                      </Badge>
                    )}
                    {order.status === "cancelled" && (
                      <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                        Dibatalkan
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>Rp {order.total.toLocaleString("id-ID")}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/orders/${order.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Lihat Detail
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/orders/${order.id}/invoice`}>
                            <FileText className="mr-2 h-4 w-4" />
                            Invoice
                          </Link>
                        </DropdownMenuItem>
                        {order.status === "processing" && (
                          <DropdownMenuItem>
                            <Truck className="mr-2 h-4 w-4" />
                            Tandai Dikirim
                          </DropdownMenuItem>
                        )}
                        {order.status === "shipped" && (
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Tandai Terkirim
                          </DropdownMenuItem>
                        )}
                        {(order.status === "processing" || order.status === "shipped") && (
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="mr-2 h-4 w-4" />
                            Batalkan
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 