export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  categoryId: string
  rating: number
  reviewCount: number
  inStock: boolean
  isNew: boolean
  discount: number
  /**
   * UI menggunakan string[] untuk features
   * Dalam database (Prisma schema) disimpan sebagai String @db.Text (JSON string)
   * API melakukan konversi antara keduanya
   */
  features?: string[]
  specifications?: Record<string, string>
  createdAt: string
  category?: Category
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  userImage: string
  rating: number
  comment: string
  date: string
  helpfulCount: number
}

export interface Order {
  id: string
  orderNumber: string
  userId: string
  date: string
  status: "processing" | "shipped" | "delivered" | "cancelled"
  items: {
    productId: string
    name: string
    price: number
    quantity: number
  }[]
  shippingAddress: {
    name: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentMethod: string
  lastFourDigits?: string
  subtotal: number
  shipping: number
  tax: number
  total: number
}

