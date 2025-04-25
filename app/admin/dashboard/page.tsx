import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Ringkasan dan statistik toko Birdpacker Merch Anda.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 12.500.000</div>
            <p className="text-xs text-muted-foreground">+20% dari bulan lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pesanan</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+15% dari bulan lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produk</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">2 produk baru bulan ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pelanggan</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-muted-foreground">+8% dari bulan lalu</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Pesanan Terbaru</CardTitle>
            <CardDescription>
              5 pesanan terbaru yang diterima.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 text-sm text-muted-foreground">
                <div>ID Pesanan</div>
                <div>Pelanggan</div>
                <div>Status</div>
                <div className="text-right">Total</div>
              </div>
              <div className="grid grid-cols-4 items-center text-sm">
                <div className="font-medium">#ORD-001</div>
                <div>Budi Santoso</div>
                <div>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Selesai
                  </span>
                </div>
                <div className="text-right">Rp 298.000</div>
              </div>
              <div className="grid grid-cols-4 items-center text-sm">
                <div className="font-medium">#ORD-002</div>
                <div>Siti Rahayu</div>
                <div>
                  <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                    Dikirim
                  </span>
                </div>
                <div className="text-right">Rp 149.000</div>
              </div>
              <div className="grid grid-cols-4 items-center text-sm">
                <div className="font-medium">#ORD-003</div>
                <div>Ahmad Hidayat</div>
                <div>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    Diproses
                  </span>
                </div>
                <div className="text-right">Rp 250.000</div>
              </div>
              <div className="grid grid-cols-4 items-center text-sm">
                <div className="font-medium">#ORD-004</div>
                <div>Dewi Lestari</div>
                <div>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    Diproses
                  </span>
                </div>
                <div className="text-right">Rp 175.000</div>
              </div>
              <div className="grid grid-cols-4 items-center text-sm">
                <div className="font-medium">#ORD-005</div>
                <div>Eko Prasetyo</div>
                <div>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    Diproses
                  </span>
                </div>
                <div className="text-right">Rp 120.000</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Produk Terlaris</CardTitle>
            <CardDescription>
              Produk dengan penjualan tertinggi bulan ini.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-[46px] h-[46px] rounded bg-muted mr-3"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Kaos Black Hole Birding</p>
                  <p className="text-sm text-muted-foreground">24 terjual</p>
                </div>
                <div className="font-medium">Rp 149.000</div>
              </div>
              <div className="flex items-center">
                <div className="w-[46px] h-[46px] rounded bg-muted mr-3"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Panduan Identifikasi Burung</p>
                  <p className="text-sm text-muted-foreground">18 terjual</p>
                </div>
                <div className="font-medium">Rp 250.000</div>
              </div>
              <div className="flex items-center">
                <div className="w-[46px] h-[46px] rounded bg-muted mr-3"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Kaos I'm Not Creepy</p>
                  <p className="text-sm text-muted-foreground">15 terjual</p>
                </div>
                <div className="font-medium">Rp 149.000</div>
              </div>
              <div className="flex items-center">
                <div className="w-[46px] h-[46px] rounded bg-muted mr-3"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Poster Kupu-kupu Indonesia</p>
                  <p className="text-sm text-muted-foreground">12 terjual</p>
                </div>
                <div className="font-medium">Rp 120.000</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 