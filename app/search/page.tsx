import { Suspense } from "react"
import { getProducts } from "@/lib/data"
import ProductGrid from "@/components/products/product-grid"
import { ProductsProvider } from "@/components/providers/products-provider"
import SearchBar from "@/components/ui/search-bar"
import { Search } from "lucide-react"
import Loading from "../loading"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q || ""
  const products = await getProducts()

  // Filter products based on search query
  const filteredProducts = query
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()),
      )
    : []

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Search className="h-6 w-6 mr-2" />
        <h1 className="text-3xl font-bold">Hasil Pencarian</h1>
      </div>

      <div className="mb-8 max-w-xl">
        <SearchBar initialValue={query} />
      </div>

      {query ? (
        <>
          <p className="text-muted-foreground mb-8">
            {filteredProducts.length} hasil untuk "{query}"
          </p>

          <Suspense fallback={<Loading />}>
            <ProductsProvider>
              <ProductGrid initialProducts={filteredProducts} />
            </ProductsProvider>
          </Suspense>
        </>
      ) : (
        <div className="text-center py-12">
          <Search className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-2xl font-bold mb-2">Cari Produk</h2>
          <p className="text-muted-foreground mb-6">Masukkan kata kunci untuk menemukan produk yang Anda cari.</p>
        </div>
      )}
    </main>
  )
}

