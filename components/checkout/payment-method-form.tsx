"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PaymentMethodFormProps {
  cardInfo: {
    cardNumber: string
    cardName: string
    expiry: string
    cvc: string
  }
  setCardInfo: React.Dispatch<
    React.SetStateAction<{
      cardNumber: string
      cardName: string
      expiry: string
      cvc: string
    }>
  >
}

export default function PaymentMethodForm({ cardInfo, setCardInfo }: PaymentMethodFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input
          id="cardNumber"
          placeholder="1234 5678 9012 3456"
          value={cardInfo.cardNumber}
          onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="cardName">Name on Card</Label>
        <Input
          id="cardName"
          placeholder="Mbappe"
          value={cardInfo.cardName}
          onChange={(e) => setCardInfo({ ...cardInfo, cardName: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expiry">Expiry Date</Label>
          <Input
            id="expiry"
            placeholder="MM/YY"
            value={cardInfo.expiry}
            onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="cvc">CVC</Label>
          <Input
            id="cvc"
            placeholder="123"
            value={cardInfo.cvc}
            onChange={(e) => setCardInfo({ ...cardInfo, cvc: e.target.value })}
            required
          />
        </div>
      </div>
    </div>
  )
}

