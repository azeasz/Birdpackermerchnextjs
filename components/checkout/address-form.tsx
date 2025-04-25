"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddressFormProps {
  shippingInfo: {
    fullName: string
    email: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
    phone: string
  }
  setShippingInfo: React.Dispatch<
    React.SetStateAction<{
      fullName: string
      email: string
      address: string
      city: string
      state: string
      zipCode: string
      country: string
      phone: string
    }>
  >
}

export default function AddressForm({ shippingInfo, setShippingInfo }: AddressFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="md:col-span-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          value={shippingInfo.fullName}
          onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
          required
        />
      </div>

      <div className="md:col-span-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={shippingInfo.email}
          onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
          required
        />
      </div>

      <div className="md:col-span-2">
        <Label htmlFor="address">Street Address</Label>
        <Input
          id="address"
          value={shippingInfo.address}
          onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          value={shippingInfo.city}
          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="state">State / Province</Label>
        <Input
          id="state"
          value={shippingInfo.state}
          onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="zipCode">ZIP / Postal Code</Label>
        <Input
          id="zipCode"
          value={shippingInfo.zipCode}
          onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="country">Country</Label>
        <Select
          value={shippingInfo.country}
          onValueChange={(value) => setShippingInfo({ ...shippingInfo, country: value })}
        >
          <SelectTrigger id="country">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="United States">United States</SelectItem>
            <SelectItem value="Canada">Canada</SelectItem>
            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
            <SelectItem value="Australia">Australia</SelectItem>
            <SelectItem value="Germany">Germany</SelectItem>
            <SelectItem value="France">France</SelectItem>
            <SelectItem value="Japan">Japan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="md:col-span-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={shippingInfo.phone}
          onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
          required
        />
      </div>
    </div>
  )
}

