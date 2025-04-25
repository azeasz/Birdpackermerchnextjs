import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Birdpacker Store</h3>
            <p className="text-muted-foreground mb-4">
              Toko online untuk para pecinta alam dan pengamat satwa. Kami menyediakan baju, poster, peta offline,
              ilustrasi, dan buku panduan berkualitas tinggi.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Kategori</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products?category=category-1"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Baju
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=category-2"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Poster
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=category-3"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Peta Offline
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=category-4"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Ilustrasi
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=category-5"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Buku
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Layanan Pelanggan</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Hubungi Kami
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pengiriman & Pengembalian
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Berlangganan</h3>
            <p className="text-muted-foreground mb-4">
              Dapatkan informasi terbaru tentang produk dan promo spesial kami.
            </p>
            <div className="flex">
              <Input type="email" placeholder="Email Anda" className="rounded-r-none" />
              <Button className="rounded-l-none">
                <Mail className="h-4 w-4 mr-2" />
                Langganan
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Birdpacker Store. Hak Cipta Dilindungi.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <img src="/placeholder.svg?height=30&width=40" alt="BCA" className="h-6" />
            <img src="/placeholder.svg?height=30&width=40" alt="Mandiri" className="h-6" />
            <img src="/placeholder.svg?height=30&width=40" alt="BNI" className="h-6" />
            <img src="/placeholder.svg?height=30&width=40" alt="QRIS" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  )
}

