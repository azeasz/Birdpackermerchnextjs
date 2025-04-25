import { Suspense } from "react"
import ProductGrid from "@/components/products/product-grid"
import ProductFilters from "@/components/products/product-filters"
import SearchBar from "@/components/ui/search-bar"
import { ProductsProvider } from "@/components/providers/products-provider"
import { Layers } from "lucide-react"
import Loading from "../loading"

export default function ProductsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Layers className="h-6 w-6 mr-2" />
        <h1 className="text-3xl font-bold">Semua Produk</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <p className="text-muted-foreground mb-4 md:mb-0">
          Jelajahi koleksi produk kami yang luas dan temukan apa yang Anda cari.
        </p>
        <div className="w-full md:w-auto">
          <SearchBar />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ProductFilters />
        </div>

        <div className="lg:col-span-3">
          <ProductsProvider>
            <Suspense fallback={<Loading />}>
              <ProductGrid />
            </Suspense>
          </ProductsProvider>
        </div>
      </div>
    </main>
  )
}

