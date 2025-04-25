import ContentForm from "@/components/admin/content-form"

export default function NewContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tambah Konten Baru</h1>
        <p className="text-muted-foreground">
          Tambahkan konten statis baru untuk situs web Anda.
        </p>
      </div>
      
      <ContentForm />
    </div>
  )
} 