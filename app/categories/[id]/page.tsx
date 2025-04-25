import { notFound } from "next/navigation"
import { Suspense } from "react"
import { getCategories, getProducts } from "@/lib/data"
import ProductGrid from "@/components/products/product-grid"
import { ProductsProvider } from "@/components/providers/products-provider"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import Loading from "@/app/loading"

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    id: category.id,
  }))
}

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const categories = await getCategories()
  const category = categories.find((c) => c.id === params.id)

  if (!category) {
    notFound()
  }

  const products = await getProducts()
  const categoryProducts = products.filter((product) => product.categoryId === params.id)

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/categories">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Kembali ke Kategori
          </Link>
        </Button>

        <div className="relative h-[200px] md:h-[300px] rounded-lg overflow-hidden mb-6">
          <img src={category.image || "/placeholder.svg"} alt={category.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center px-4">{category.name}</h1>
          </div>
        </div>

        <p className="text-muted-foreground mb-8">{category.description}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Produk dalam {category.name}</h2>
        <Suspense fallback={<Loading />}>
          <ProductsProvider>
            <ProductGrid initialProducts={categoryProducts} />
          </ProductsProvider>
        </Suspense>
      </div>
    </main>
  )
}

