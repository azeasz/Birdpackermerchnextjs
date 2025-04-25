import CategoryForm from "@/components/admin/category-form"
import { getCategories } from "@/lib/data"
import { notFound } from "next/navigation"

interface EditCategoryPageProps {
  params: {
    id: string
  }
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const categories = await getCategories()
  const category = categories.find((cat) => cat.id === params.id)
  
  if (!category) {
    notFound()
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Kategori</h1>
        <p className="text-muted-foreground">
          Edit informasi kategori.
        </p>
      </div>
      
      <CategoryForm category={category} />
    </div>
  )
} 