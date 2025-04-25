"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"

interface ContentFormProps {
  content?: {
    id: string
    type: string
    title: string
    content: string
  }
}

export default function ContentForm({ content }: ContentFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: content?.title || "",
    type: content?.type || "ABOUT",
    content: content?.content || "",
  })
  const [error, setError] = useState("")

  const contentTypes = [
    { value: "ABOUT", label: "Tentang Kami" },
    { value: "FAQ", label: "FAQ" },
    { value: "TERMS", label: "Syarat & Ketentuan" },
    { value: "PRIVACY", label: "Kebijakan Privasi" },
    { value: "SHIPPING", label: "Pengiriman" },
    { value: "RETURNS", label: "Pengembalian" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const url = content ? `/api/content/${content.id}` : "/api/content"
      const method = content ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Terjadi kesalahan")
      }

      // Refresh data kemudian navigasi
      router.refresh()
      
      // Tunggu sebentar untuk memastikan data di-refresh
      setTimeout(() => {
        router.push("/admin/content")
      }, 300)
    } catch (error) {
      console.error("Error saving content:", error)
      setError(error instanceof Error ? error.message : "Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 p-4 rounded-md text-red-500 mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Judul</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Tipe Konten</Label>
          <Select
            value={formData.type}
            onValueChange={handleTypeChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih tipe konten" />
            </SelectTrigger>
            <SelectContent>
              {contentTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Konten</Label>
          <Textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={15}
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/content")}
          disabled={loading}
        >
          Batal
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {content ? "Perbarui Konten" : "Simpan Konten"}
        </Button>
      </div>
    </form>
  )
} 