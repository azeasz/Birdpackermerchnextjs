import CategoryForm from "@/components/admin/category-form"

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tambah Kategori Baru</h1>
        <p className="text-muted-foreground">
          Tambahkan kategori baru untuk produk di toko Anda.
        </p>
      </div>
      
      <CategoryForm />
    </div>
  )
} 