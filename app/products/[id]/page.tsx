import { notFound } from "next/navigation"
import Image from "next/image"
import { getProductById } from "@/lib/data"
import AddToCartButton from "@/components/products/add-to-cart-button"
import ProductReviews from "@/components/products/product-reviews"
import RelatedProducts from "@/components/products/related-products"
import { Suspense } from "react"
import Loading from "@/app/loading"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  // Menentukan apakah produk adalah baju
  const isClothing = product.categoryId === "category-1"

  // Menentukan apakah produk adalah buku
  const isBook = product.categoryId === "category-5"

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="relative h-[400px] md:h-[600px] rounded-lg overflow-hidden">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" priority />
        </div>

        <div className="flex flex-col">
          <div className="mb-4">
            {product.inStock ? (
              <Badge className="bg-green-500">Tersedia</Badge>
            ) : (
              <Badge variant="destructive">Stok Habis</Badge>
            )}
            {product.isNew && <Badge className="ml-2">Baru</Badge>}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
            </div>
            <span className="ml-2 text-gray-500">({product.reviewCount} ulasan)</span>
          </div>

          <p className="text-3xl font-bold mb-4">Rp {product.price.toLocaleString("id-ID")}</p>

          <p className="text-gray-600 mb-6">{product.description}</p>

          {isClothing && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Ukuran</h3>
              <div className="flex flex-wrap gap-2">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 border rounded-md hover:bg-primary hover:text-white transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isBook && (
            <div className="mb-6 bg-muted p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Informasi Buku</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>Penulis:</div>
                <div>{product.specifications?.Penulis || "Tim Penulis"}</div>
                <div>Penerbit:</div>
                <div>{product.specifications?.Penerbit || "NatureBooks"}</div>
                <div>Halaman:</div>
                <div>{product.specifications?.Halaman || "N/A"}</div>
                <div>Bahasa:</div>
                <div>{product.specifications?.Bahasa || "Indonesia"}</div>
              </div>
            </div>
          )}

          <Separator className="my-6" />

          <div className="mt-auto">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Detail Produk</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Fitur</h3>
            <ul className="list-disc pl-5 space-y-2">
              {product.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Spesifikasi</h3>
            <div className="space-y-2">
              {Object.entries(product.specifications || {}).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2">
                  <span className="font-medium">{key}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Ulasan Pelanggan</h2>
        <Suspense fallback={<Loading />}>
          <ProductReviews productId={params.id} />
        </Suspense>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Produk Terkait</h2>
        <Suspense fallback={<Loading />}>
          <RelatedProducts categoryId={product.categoryId} currentProductId={params.id} />
        </Suspense>
      </section>
    </main>
  )
}

