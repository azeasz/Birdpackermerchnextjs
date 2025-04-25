"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminSettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    store_name: "",
    store_description: "",
    currency: "",
    contact_email: "",
    contact_phone: "",
    address: "",
    social_facebook: "",
    social_instagram: "",
    social_twitter: "",
  })

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/settings")
        const data = await response.json()
        
        // Ubah array menjadi objek untuk mempermudah penggunaan
        const settingsObject = data.reduce((acc: any, setting: any) => {
          acc[setting.key] = setting.value
          return acc
        }, {})
        
        setSettings({
          ...settings,
          ...settingsObject
        })
      } catch (error) {
        console.error("Error fetching settings:", error)
        toast({
          title: "Error",
          description: "Gagal mengambil data pengaturan",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings({
      ...settings,
      [name]: value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Ubah objek menjadi array dengan format yang diharapkan API
      const settingsArray = Object.entries(settings).map(([key, value]) => ({
        key,
        value: value || ""
      }))

      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settingsArray),
      })

      if (!response.ok) {
        throw new Error("Failed to update settings")
      }

      toast({
        title: "Berhasil",
        description: "Pengaturan berhasil disimpan",
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: "Gagal menyimpan pengaturan",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pengaturan</h1>
        <p className="text-muted-foreground">
          Kelola pengaturan toko dan situs web Anda.
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="contact">Kontak</TabsTrigger>
          <TabsTrigger value="social">Media Sosial</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Umum</CardTitle>
                <CardDescription>
                  Atur informasi dasar tentang toko Anda.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="store_name">Nama Toko</Label>
                  <Input
                    id="store_name"
                    name="store_name"
                    value={settings.store_name}
                    onChange={handleChange}
                    placeholder="Masukkan nama toko"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store_description">Deskripsi Toko</Label>
                  <Textarea
                    id="store_description"
                    name="store_description"
                    value={settings.store_description}
                    onChange={handleChange}
                    placeholder="Deskripsi singkat tentang toko Anda"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Mata Uang</Label>
                  <Input
                    id="currency"
                    name="currency"
                    value={settings.currency}
                    onChange={handleChange}
                    placeholder="IDR"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Kontak</CardTitle>
                <CardDescription>
                  Atur informasi kontak untuk toko Anda.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact_email">Email</Label>
                  <Input
                    id="contact_email"
                    name="contact_email"
                    type="email"
                    value={settings.contact_email}
                    onChange={handleChange}
                    placeholder="contact@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_phone">Nomor Telepon</Label>
                  <Input
                    id="contact_phone"
                    name="contact_phone"
                    value={settings.contact_phone}
                    onChange={handleChange}
                    placeholder="+62 123 4567 890"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Alamat</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={settings.address}
                    onChange={handleChange}
                    placeholder="Alamat toko atau kantor Anda"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Media Sosial</CardTitle>
                <CardDescription>
                  Hubungkan toko Anda dengan akun media sosial.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="social_facebook">Facebook</Label>
                  <Input
                    id="social_facebook"
                    name="social_facebook"
                    value={settings.social_facebook}
                    onChange={handleChange}
                    placeholder="https://facebook.com/birdpacker"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="social_instagram">Instagram</Label>
                  <Input
                    id="social_instagram"
                    name="social_instagram"
                    value={settings.social_instagram}
                    onChange={handleChange}
                    placeholder="https://instagram.com/birdpacker"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="social_twitter">Twitter</Label>
                  <Input
                    id="social_twitter"
                    name="social_twitter"
                    value={settings.social_twitter}
                    onChange={handleChange}
                    placeholder="https://twitter.com/birdpacker"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="mt-6 flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan Pengaturan
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  )
} 