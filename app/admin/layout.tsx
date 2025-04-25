"use client"

import type React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Package, 
  Tag, 
  ShoppingCart, 
  Settings, 
  FileText,
  LogOut
} from "lucide-react"

// Dalam implementasi nyata, kita akan menggunakan autentikasi
// dan memeriksa apakah pengguna adalah admin
const isAdmin = true

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Dalam implementasi nyata, kita akan memeriksa sesi pengguna
  if (!isAdmin) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/40">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/admin" className="font-semibold">
            Birdpacker Admin
          </Link>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          <NavLink href="/admin/dashboard" icon={<LayoutDashboard className="mr-2 h-4 w-4" />}>
            Dashboard
          </NavLink>
          <NavLink href="/admin/products" icon={<Package className="mr-2 h-4 w-4" />}>
            Produk
          </NavLink>
          <NavLink href="/admin/categories" icon={<Tag className="mr-2 h-4 w-4" />}>
            Kategori
          </NavLink>
          <NavLink href="/admin/orders" icon={<ShoppingCart className="mr-2 h-4 w-4" />}>
            Pesanan
          </NavLink>
          <NavLink href="/admin/content" icon={<FileText className="mr-2 h-4 w-4" />}>
            Konten
          </NavLink>
          <NavLink href="/admin/settings" icon={<Settings className="mr-2 h-4 w-4" />}>
            Pengaturan
          </NavLink>
          <div className="mt-auto pt-4">
            <Link
              href="/"
              className="flex items-center rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Kembali ke Toko
            </Link>
          </div>
        </nav>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="h-14 border-b flex items-center px-6">
          <h1 className="text-lg font-medium">Admin Panel</h1>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}

function NavLink({ 
  href, 
  icon, 
  children 
}: { 
  href: string
  icon: React.ReactNode
  children: React.ReactNode 
}) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`flex items-center rounded-md px-3 py-2 text-sm transition-colors ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      {icon}
      {children}
    </Link>
  )
} 