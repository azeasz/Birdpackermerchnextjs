import ContentForm from "@/components/admin/content-form"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

interface EditContentPageProps {
  params: {
    id: string
  }
}

export default async function EditContentPage({ params }: EditContentPageProps) {
  const content = await prisma.content.findUnique({
    where: { id: params.id }
  })
  
  if (!content) {
    notFound()
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Konten</h1>
        <p className="text-muted-foreground">
          Edit konten statis untuk situs web Anda.
        </p>
      </div>
      
      <ContentForm content={content} />
    </div>
  )
} 