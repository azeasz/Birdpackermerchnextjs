"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Pesan Terkirim",
        description: "Terima kasih telah menghubungi kami. Kami akan segera merespons.",
      })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Hubungi Kami</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <MapPin className="h-5 w-5 text-primary mr-3" />
            <h3 className="text-lg font-semibold">Alamat Kami</h3>
          </div>
          <p className="text-muted-foreground mb-2">Jl. jalan</p>
          <p className="text-muted-foreground">Batu, Indonesia 12345</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Phone className="h-5 w-5 text-primary mr-3" />
            <h3 className="text-lg font-semibold">Telepon</h3>
          </div>
          <p className="text-muted-foreground mb-2">Layanan Pelanggan: +62 21 1234 5678</p>
          <p className="text-muted-foreground">Dukungan Teknis: +62 21 8765 4321</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Mail className="h-5 w-5 text-primary mr-3" />
            <h3 className="text-lg font-semibold">Email</h3>
          </div>
          <p className="text-muted-foreground mb-2">info@birdpackerstore.com</p>
          <p className="text-muted-foreground">support@birdpacker.com</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Kirim Pesan</h2>
          <Card className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div>
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div>
                  <Label htmlFor="subject">Subjek</Label>
                  <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                </div>

                <div>
                  <Label htmlFor="message">Pesan</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Mengirim..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Kirim Pesan
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Jam Operasional</h2>
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Clock className="h-5 w-5 text-primary mr-3" />
              <h3 className="text-lg font-semibold">Kami Siap Melayani</h3>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Senin - Jumat</span>
                <span>09:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sabtu</span>
                <span>10:00 - 16:00</span>
              </div>
              <div className="flex justify-between">
                <span>Minggu</span>
                <span>Tutup</span>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-2">Catatan Penting</h4>
              <p className="text-sm text-muted-foreground">
                Layanan pelanggan online tersedia 24/7 melalui email. Respons mungkin tertunda di luar jam operasional.
              </p>
            </div>
          </Card>

          <h2 className="text-2xl font-bold mt-8 mb-6">Lokasi Kami</h2>
          <Card className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src="/placeholder.svg?height=300&width=600"
                alt="Peta lokasi"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-background/80 backdrop-blur-sm p-4 rounded-md">
                  <h3 className="font-semibold">Birdpacker Store</h3>
                  <p className="text-sm">Jl. jalan jalan</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}

