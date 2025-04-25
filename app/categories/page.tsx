import { Suspense } from "react"
import { getCategories } from "@/lib/data"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Layers } from "lucide-react"
import Loading from "../loading"

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Layers className="h-6 w-6 mr-2" />
        <h1 className="text-3xl font-bold">Kategori Produk</h1>
      </div>

      <p className="text-muted-foreground mb-8">
        Jelajahi produk kami berdasarkan kategori untuk menemukan apa yang Anda cari dengan lebih mudah.
      </p>

      <Suspense fallback={<Loading />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.id}`} className="block">
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-video relative">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-white font-bold text-xl text-center px-2">{category.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-muted-foreground line-clamp-2">{category.description}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Suspense>
    </main>
  )
}

