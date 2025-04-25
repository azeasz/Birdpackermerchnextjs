"use client"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ThemeTestPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Pastikan komponen hanya dirender di sisi klien
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Pengujian Tema</h1>

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Status Tema Saat Ini</h2>
        <p className="mb-4">
          Tema aktif: <strong>{theme}</strong>
        </p>

        <div className="flex flex-wrap gap-4 mb-6">
          <Button onClick={() => setTheme("light")}>Tema Terang</Button>
          <Button onClick={() => setTheme("dark")}>Tema Gelap</Button>
          <Button onClick={() => setTheme("system")}>Tema Sistem</Button>
        </div>

        <div className="flex items-center gap-2">
          <span>Toggle Tema:</span>
          <ThemeToggle />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-background text-foreground">
          <h3 className="font-bold mb-2">Warna Latar Belakang</h3>
          <p>Ini adalah warna latar belakang default (bg-background)</p>
        </Card>

        <Card className="p-6 bg-primary text-primary-foreground">
          <h3 className="font-bold mb-2">Warna Utama</h3>
          <p>Ini adalah warna utama (bg-primary)</p>
        </Card>

        <Card className="p-6 bg-secondary text-secondary-foreground">
          <h3 className="font-bold mb-2">Warna Sekunder</h3>
          <p>Ini adalah warna sekunder (bg-secondary)</p>
        </Card>

        <Card className="p-6 bg-muted text-muted-foreground">
          <h3 className="font-bold mb-2">Warna Muted</h3>
          <p>Ini adalah warna muted (bg-muted)</p>
        </Card>
      </div>
    </main>
  )
}

