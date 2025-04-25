import { Suspense } from "react"
import ProductGrid from "@/components/products/product-grid"
import ProductFilters from "@/components/products/product-filters"
import SearchBar from "@/components/ui/search-bar"
import { ProductsProvider } from "@/components/providers/products-provider"
import { CategoryList } from "@/components/categories/category-list"
import FeaturedProducts from "@/components/products/featured-products"
import HeroSection from "@/components/sections/hero-section"
import Loading from "./loading"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <HeroSection />

      <section className="my-8">
        <h2 className="text-3xl font-bold mb-6">Categories</h2>
        <CategoryList />
      </section>

      <section className="my-8">
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <Suspense fallback={<Loading />}>
          <FeaturedProducts />
        </Suspense>
      </section>

      <section className="my-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">All Products</h2>
          <SearchBar />
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
      </section>
    </main>
  )
}

