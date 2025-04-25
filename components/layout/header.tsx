"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/components/providers/auth-provider"
import { useCart } from "@/components/providers/cart-provider"
import { useMobile } from "@/hooks/use-mobile"
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  LogIn,
  LogOut,
  Package,
  Heart,
  X,
  Home,
  Shirt,
  BookOpen,
  Map,
  ImageIcon,
} from "lucide-react"

export default function Header() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { cart } = useCart()
  
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)

  // Set mounted state setelah render pertama
  useEffect(() => {
    setMounted(true)
    
    // Hanya jalankan logika window setelah mounted
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768)
    }
    
    // Cek ukuran layar saat pertama kali mounted
    checkMobile()
    
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", checkMobile)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const navLinks = [
    { name: "Beranda", href: "/", icon: <Home className="h-5 w-5 mr-2" /> },
    { name: "Baju", href: "/products?category=category-1", icon: <Shirt className="h-5 w-5 mr-2" /> },
    { name: "Poster", href: "/products?category=category-2", icon: <ImageIcon className="h-5 w-5 mr-2" /> },
    { name: "Peta Offline", href: "/products?category=category-3", icon: <Map className="h-5 w-5 mr-2" /> },
    { name: "Ilustrasi", href: "/products?category=category-4", icon: <ImageIcon className="h-5 w-5 mr-2" /> },
    { name: "Buku", href: "/products?category=category-5", icon: <BookOpen className="h-5 w-5 mr-2" /> },
  ]

  // Jika komponen belum di-mount, render versi dasar header untuk SSR
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full bg-background">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="font-bold text-xl">
              Birdpacker Store
            </Link>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            {isMobileView && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between py-4 border-b">
                      <Link href="/" className="font-bold text-xl">
                        NatureShop
                      </Link>
                      <SheetClose asChild>
                        <Button variant="ghost" size="icon">
                          <X className="h-5 w-5" />
                        </Button>
                      </SheetClose>
                    </div>

                    <nav className="flex flex-col gap-1 py-4">
                      {navLinks.map((link) => (
                        <SheetClose asChild key={link.href}>
                          <Link
                            href={link.href}
                            className={`flex items-center px-4 py-2 rounded-md ${
                              pathname === link.href ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                            }`}
                          >
                            {link.icon}
                            {link.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </nav>

                    <div className="mt-auto border-t py-4">
                      {user ? (
                        <div className="space-y-3">
                          <div className="px-4 py-2">
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                          <SheetClose asChild>
                            <Link href="/profile" className="flex items-center px-4 py-2 rounded-md hover:bg-muted">
                              <User className="mr-2 h-5 w-5" />
                              Profil Saya
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link
                              href="/profile/orders"
                              className="flex items-center px-4 py-2 rounded-md hover:bg-muted"
                            >
                              <Package className="mr-2 h-5 w-5" />
                              Pesanan Saya
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Button
                              variant="ghost"
                              className="w-full justify-start px-4 py-2 rounded-md hover:bg-muted text-red-500"
                              onClick={logout}
                            >
                              <LogOut className="mr-2 h-5 w-5" />
                              Keluar
                            </Button>
                          </SheetClose>
                        </div>
                      ) : (
                        <div className="space-y-2 px-4">
                          <SheetClose asChild>
                            <Button asChild className="w-full">
                              <Link href="/login">
                                <LogIn className="mr-2 h-5 w-5" />
                                Masuk
                              </Link>
                            </Button>
                          </SheetClose>
                          <SheetClose asChild>
                            <Button asChild variant="outline" className="w-full">
                              <Link href="/login?tab=register">
                                <User className="mr-2 h-5 w-5" />
                                Daftar
                              </Link>
                            </Button>
                          </SheetClose>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}

            <Link href="/" className="flex items-center">
              <span className="font-bold text-xl">Birdpacker Store</span>
            </Link>

            {!isMobileView && (
              <nav className="ml-8 hidden md:flex items-center space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      pathname === link.href ? "bg-primary/10 text-primary" : "hover:bg-muted"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {!isMobileView && !isSearchOpen ? (
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            ) : isSearchOpen ? (
              <div className="relative w-full max-w-xs">
                <Input type="search" placeholder="Cari produk..." className="pr-8" autoFocus />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : null}

            <ThemeToggle />

            <Button variant="ghost" size="icon" asChild>
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Link>
            </Button>

            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cart.length}
                  </Badge>
                )}
                <span className="sr-only">Cart</span>
              </Link>
            </Button>

            {!isMobileView &&
              (user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <User className="h-5 w-5" />
                      <span className="sr-only">User menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        Profil Saya
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile/orders">
                        <Package className="mr-2 h-4 w-4" />
                        Pesanan Saya
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500 focus:text-red-500" onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Keluar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Masuk
                  </Link>
                </Button>
              ))}
          </div>
        </div>
      </div>
    </header>
  )
}

