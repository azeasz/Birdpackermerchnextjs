import ProductForm from "@/components/admin/product-form"

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tambah Produk Baru</h1>
        <p className="text-muted-foreground">
          Tambahkan produk baru ke toko Anda.
        </p>
      </div>
      
      <ProductForm />
    </div>
  )
} 