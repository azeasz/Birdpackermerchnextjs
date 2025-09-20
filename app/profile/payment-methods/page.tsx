"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/providers/auth-provider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { CreditCard, Plus, Trash2, CheckCircle, AlertCircle } from "lucide-react"

interface PaymentMethod {
  id: string
  cardNumber: string
  cardName: string
  expiry: string
  isDefault: boolean
}

export default function PaymentMethodsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "card-1",
      cardNumber: "4242 4242 4242 4242",
      cardName: "Mbappe",
      expiry: "12/25",
      isDefault: true,
    },
  ])

  const [isAddingCard, setIsAddingCard] = useState(false)
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
  })

  if (!user) {
    router.push("/login")
    return null
  }

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate card details (simplified)
    if (!newCard.cardNumber.trim() || !newCard.cardName.trim() || !newCard.expiry.trim() || !newCard.cvc.trim()) {
      toast({
        title: "Validasi Gagal",
        description: "Silakan isi semua field yang diperlukan.",
        variant: "destructive",
      })
      return
    }

    const newPaymentMethod: PaymentMethod = {
      id: `card-${Date.now()}`,
      cardNumber: newCard.cardNumber,
      cardName: newCard.cardName,
      expiry: newCard.expiry,
      isDefault: paymentMethods.length === 0,
    }

    setPaymentMethods([...paymentMethods, newPaymentMethod])
    setNewCard({
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvc: "",
    })
    setIsAddingCard(false)

    toast({
      title: "Kartu Ditambahkan",
      description: "Metode pembayaran baru telah ditambahkan.",
    })
  }

  const handleRemoveCard = (id: string) => {
    const updatedMethods = paymentMethods.filter((method) => method.id !== id)

    // If we removed the default card and there are other cards, make the first one default
    if (paymentMethods.find((method) => method.id === id)?.isDefault && updatedMethods.length > 0) {
      updatedMethods[0].isDefault = true
    }

    setPaymentMethods(updatedMethods)

    toast({
      title: "Kartu Dihapus",
      description: "Metode pembayaran telah dihapus.",
    })
  }

  const setDefaultCard = (id: string) => {
    const updatedMethods = paymentMethods.map((method) => ({
      ...method,
      isDefault: method.id === id,
    }))

    setPaymentMethods(updatedMethods)

    toast({
      title: "Default Diperbarui",
      description: "Metode pembayaran default telah diperbarui.",
    })
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <CreditCard className="h-6 w-6 mr-2" />
        Metode Pembayaran
      </h1>

      <div className="grid grid-cols-1 gap-6 mb-8">
        {paymentMethods.map((method) => (
          <Card key={method.id} className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="mr-4">
                  <CreditCard className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-semibold">•••• •••• •••• {method.cardNumber.slice(-4)}</h3>
                    {method.isDefault && (
                      <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {method.cardName} • Exp: {method.expiry}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                {!method.isDefault && (
                  <Button variant="outline" size="sm" onClick={() => setDefaultCard(method.id)}>
                    Set Default
                  </Button>
                )}
                <Button variant="destructive" size="sm" onClick={() => handleRemoveCard(method.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {paymentMethods.length === 0 && (
          <Card className="p-8 text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h2 className="text-xl font-bold mb-2">Tidak Ada Metode Pembayaran</h2>
            <p className="text-muted-foreground mb-6">Anda belum menambahkan metode pembayaran apa pun.</p>
          </Card>
        )}
      </div>

      {isAddingCard ? (
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Tambah Kartu Baru</h2>
          <form onSubmit={handleAddCard}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="md:col-span-2">
                <Label htmlFor="cardNumber">Nomor Kartu</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={newCard.cardNumber}
                  onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="cardName">Nama pada Kartu</Label>
                <Input
                  id="cardName"
                  placeholder="Mbappe"
                  value={newCard.cardName}
                  onChange={(e) => setNewCard({ ...newCard, cardName: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="expiry">Tanggal Kadaluarsa</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={newCard.expiry}
                  onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  placeholder="123"
                  value={newCard.cvc}
                  onChange={(e) => setNewCard({ ...newCard, cvc: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button type="submit">Simpan Kartu</Button>
              <Button type="button" variant="outline" onClick={() => setIsAddingCard(false)}>
                Batal
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Button onClick={() => setIsAddingCard(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Metode Pembayaran
        </Button>
      )}
    </main>
  )
}

