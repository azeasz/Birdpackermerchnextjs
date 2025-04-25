import type { Product, Category } from "./types"

// Mock data untuk kategori
export const mockCategories: Category[] = [
  {
    id: "category-1",
    name: "Baju",
    description: "Koleksi kaos dan pakaian dengan desain ilustrasi alam dan satwa",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VN3L2iezuQtxOxEcvlpvHltTn7dFst.png",
  },
  {
    id: "category-2",
    name: "Poster",
    description: "Poster ilustrasi ilmiah dan seni dengan tema alam dan satwa",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "category-3",
    name: "Peta Offline",
    description: "Peta fisik berbagai lokasi dan taman nasional di Indonesia",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "category-4",
    name: "Ilustrasi",
    description: "Karya ilustrasi alam, satwa, dan lingkungan",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "category-5",
    name: "Buku",
    description: "Buku panduan lapangan dan literatur tentang alam dan satwa",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kiJA60xRTI9U8rHERFPyvrQi4zjaeu.png",
  },
]

// Mock data untuk produk
export const mockProducts: Product[] = [
  {
    id: "product-1",
    name: "Kaos Black Hole Birding",
    description: "Kaos hitam dengan desain 'Black Hole Birding' untuk para pengamat burung dan pecinta alam.",
    price: 149000,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VN3L2iezuQtxOxEcvlpvHltTn7dFst.png",
    categoryId: "category-1",
    rating: 4.8,
    reviewCount: 24,
    inStock: true,
    isNew: true,
    discount: 0,
    features: [
      "100% katun organik",
      "Desain eksklusif",
      "Tersedia ukuran S, M, L, XL, XXL",
      "Sablon berkualitas tinggi",
      "Nyaman dipakai",
    ],
    specifications: {
      Brand: "NatureWear",
      Material: "Katun organik",
      Warna: "Hitam",
      Ukuran: "S-XXL",
      Perawatan: "Cuci dengan air dingin, jangan gunakan pemutih",
    },
    createdAt: "2023-11-15T10:00:00Z",
  },
  {
    id: "product-2",
    name: "Kaos I'm Not Creepy",
    description:
      "Kaos putih dengan desain 'I'm Not Creepy, It's Just Not Too Early For Magic' untuk para pengamat burung.",
    price: 149000,
    image: "/placeholder.svg?height=400&width=400",
    categoryId: "category-1",
    rating: 4.7,
    reviewCount: 18,
    inStock: true,
    isNew: true,
    discount: 10,
    features: [
      "100% katun organik",
      "Desain eksklusif",
      "Tersedia ukuran S, M, L, XL, XXL",
      "Sablon berkualitas tinggi",
      "Nyaman dipakai",
    ],
    specifications: {
      Brand: "NatureWear",
      Material: "Katun organik",
      Warna: "Putih",
      Ukuran: "S-XXL",
      Perawatan: "Cuci dengan air dingin, jangan gunakan pemutih",
    },
    createdAt: "2023-11-10T10:00:00Z",
  },
  {
    id: "product-3",
    name: "Poster Kupu-kupu Indonesia",
    description:
      "Poster ilmiah bergaya vintage yang menampilkan berbagai spesies kupu-kupu yang ditemukan di Indonesia.",
    price: 120000,
    image: "/placeholder.svg?height=400&width=400",
    categoryId: "category-2",
    rating: 4.9,
    reviewCount: 32,
    inStock: true,
    isNew: false,
    discount: 0,
    features: [
      "Ukuran A2 (42 x 59.4 cm)",
      "Dicetak pada kertas premium 200gsm",
      "Ilustrasi detail dengan label ilmiah",
      "Cocok untuk dibingkai",
      "Desain eksklusif",
    ],
    specifications: {
      Brand: "NatureArt",
      Ukuran: "A2 (42 x 59.4 cm)",
      Material: "Kertas premium 200gsm",
      Finishing: "Matte",
      Bingkai: "Tidak termasuk",
    },
    createdAt: "2023-10-05T10:00:00Z",
  },
  {
    id: "product-4",
    name: "Peta Taman Nasional Baluran",
    description:
      "Peta detail Taman Nasional Baluran dengan informasi jalur hiking, titik pengamatan satwa, dan informasi penting lainnya.",
    price: 85000,
    image: "/placeholder.svg?height=400&width=400",
    categoryId: "category-3",
    rating: 4.6,
    reviewCount: 15,
    inStock: true,
    isNew: false,
    discount: 0,
    features: [
      "Ukuran A1 (59.4 x 84.1 cm)",
      "Dicetak pada kertas tahan air",
      "Detail jalur hiking dan titik pengamatan",
      "Informasi flora dan fauna",
      "Termasuk tips keselamatan",
    ],
    specifications: {
      Brand: "MapExplore",
      Ukuran: "A1 (59.4 x 84.1 cm)",
      Material: "Kertas tahan air 120gsm",
      Finishing: "Laminasi matte",
      Lipatan: "Dapat dilipat menjadi ukuran A5",
    },
    createdAt: "2023-09-20T10:00:00Z",
  },
  {
    id: "product-5",
    name: "Ilustrasi Burung Sunda Besar",
    description:
      "Ilustrasi artistik yang menampilkan berbagai spesies burung yang dapat ditemukan di kawasan Sunda Besar.",
    price: 175000,
    image: "/placeholder.svg?height=400&width=400",
    categoryId: "category-4",
    rating: 4.9,
    reviewCount: 27,
    inStock: true,
    isNew: true,
    discount: 0,
    features: [
      "Ukuran A3 (29.7 x 42 cm)",
      "Dicetak pada kertas seni premium",
      "Ilustrasi detail dengan cat air",
      "Edisi terbatas dengan nomor seri",
      "Ditandatangani oleh seniman",
    ],
    specifications: {
      Brand: "NatureArt",
      Seniman: "Adi Sucipto",
      Ukuran: "A3 (29.7 x 42 cm)",
      Material: "Kertas seni 300gsm",
      Finishing: "Matte",
    },
    createdAt: "2023-08-15T10:00:00Z",
  },
  {
    id: "product-6",
    name: "Panduan Identifikasi Burung Terkomplit",
    description:
      "Buku panduan lapangan yang komprehensif untuk mengidentifikasi berbagai spesies burung di Indonesia. 100% Karya Anak Bangsa.",
    price: 250000,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kiJA60xRTI9U8rHERFPyvrQi4zjaeu.png",
    categoryId: "category-5",
    rating: 5.0,
    reviewCount: 42,
    inStock: true,
    isNew: true,
    discount: 0,
    features: [
      "Lebih dari 500 spesies burung",
      "Ilustrasi berwarna untuk setiap spesies",
      "Informasi habitat dan perilaku",
      "Peta distribusi",
      "Tips pengamatan dan fotografi",
    ],
    specifications: {
      Penulis: "Tim Ornitologi Indonesia",
      Penerbit: "NatureBooks",
      Halaman: "420",
      Bahasa: "Indonesia",
      Dimensi: "15 x 21 cm",
      Berat: "800 gram",
    },
    createdAt: "2023-11-01T10:00:00Z",
  },
  {
    id: "product-7",
    name: "Kaos Birdpacker",
    description: "Kaos hitam dengan desain 'Birdpacker' untuk para pengamat burung yang bersemangat.",
    price: 149000,
    image: "/placeholder.svg?height=400&width=400",
    categoryId: "category-1",
    rating: 4.6,
    reviewCount: 19,
    inStock: true,
    isNew: false,
    discount: 0,
    features: [
      "100% katun organik",
      "Desain eksklusif",
      "Tersedia ukuran S, M, L, XL, XXL",
      "Sablon berkualitas tinggi",
      "Nyaman dipakai",
    ],
    specifications: {
      Brand: "NatureWear",
      Material: "Katun organik",
      Warna: "Hitam",
      Ukuran: "S-XXL",
      Perawatan: "Cuci dengan air dingin, jangan gunakan pemutih",
    },
    createdAt: "2023-07-10T10:00:00Z",
  },
  {
    id: "product-8",
    name: "Kaos Turn Back Deforestation",
    description: "Kaos hitam dengan desain 'Turn Back Deforestation' untuk meningkatkan kesadaran tentang deforestasi.",
    price: 149000,
    image: "/placeholder.svg?height=400&width=400",
    categoryId: "category-1",
    rating: 4.8,
    reviewCount: 23,
    inStock: true,
    isNew: false,
    discount: 0,
    features: [
      "100% katun organik",
      "Desain eksklusif",
      "Tersedia ukuran S, M, L, XL, XXL",
      "Sablon berkualitas tinggi",
      "Nyaman dipakai",
    ],
    specifications: {
      Brand: "NatureWear",
      Material: "Katun organik",
      Warna: "Hitam",
      Ukuran: "S-XXL",
      Perawatan: "Cuci dengan air dingin, jangan gunakan pemutih",
    },
    createdAt: "2023-06-15T10:00:00Z",
  },
  {
    id: "product-9",
    name: "Peta Gunung Semeru",
    description: "Peta detail Gunung Semeru dengan jalur pendakian, shelter, dan informasi penting untuk pendaki.",
    price: 85000,
    image: "/placeholder.svg?height=400&width=400",
    categoryId: "category-3",
    rating: 4.7,
    reviewCount: 31,
    inStock: true,
    isNew: false,
    discount: 0,
    features: [
      "Ukuran A1 (59.4 x 84.1 cm)",
      "Dicetak pada kertas tahan air",
      "Detail jalur pendakian dan shelter",
      "Informasi ketinggian dan kontur",
      "Termasuk tips keselamatan",
    ],
    specifications: {
      Brand: "MapExplore",
      Ukuran: "A1 (59.4 x 84.1 cm)",
      Material: "Kertas tahan air 120gsm",
      Finishing: "Laminasi matte",
      Lipatan: "Dapat dilipat menjadi ukuran A5",
    },
    createdAt: "2023-05-20T10:00:00Z",
  },
  {
    id: "product-10",
    name: "Buku Panduan Flora Jawa",
    description:
      "Buku panduan komprehensif tentang flora yang dapat ditemukan di Pulau Jawa, lengkap dengan ilustrasi dan informasi detail.",
    price: 220000,
    image: "/placeholder.svg?height=400&width=400",
    categoryId: "category-5",
    rating: 4.9,
    reviewCount: 17,
    inStock: true,
    isNew: false,
    discount: 5,
    features: [
      "Lebih dari 300 spesies tumbuhan",
      "Ilustrasi berwarna untuk setiap spesies",
      "Informasi habitat dan distribusi",
      "Manfaat dan kegunaan tradisional",
      "Indeks lengkap nama ilmiah dan lokal",
    ],
    specifications: {
      Penulis: "Dr. Sutrisno Wijaya",
      Penerbit: "NatureBooks",
      Halaman: "380",
      Bahasa: "Indonesia",
      Dimensi: "15 x 21 cm",
      Berat: "750 gram",
    },
    createdAt: "2023-04-15T10:00:00Z",
  },
]

// Helper functions to simulate API calls

export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockProducts
}

export async function getProductById(id: string): Promise<Product | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockProducts.find((product) => product.id === id)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  // Return products marked as new or with discount
  return mockProducts.filter((product) => product.isNew || product.discount > 0)
}

export async function getRelatedProducts(categoryId: string, currentProductId: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  // Return products in the same category, excluding the current product
  return mockProducts
    .filter((product) => product.categoryId === categoryId && product.id !== currentProductId)
    .slice(0, 4) // Limit to 4 related products
}

export async function getCategories(): Promise<Category[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockCategories
}

// Sisanya tetap sama seperti sebelumnya
export async function getReviews(productId: string): Promise<any[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400))
  return mockReviews.filter((review) => review.productId === productId)
}

export async function getMockOrders(): Promise<any[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400))
  return mockOrders
}

// Mock data untuk reviews
const mockReviews = [
  {
    id: "review-1",
    productId: "product-1",
    userId: "user-1",
    userName: "Budi Santoso",
    userImage: "/placeholder.svg?height=50&width=50",
    rating: 5,
    comment:
      "Kaos ini sangat nyaman dipakai dan desainnya keren! Saya suka sekali dengan detail gambarnya. Bahan kaosnya juga bagus dan tidak luntur setelah dicuci.",
    date: "2023-11-10T10:00:00Z",
    helpfulCount: 12,
  },
  {
    id: "review-2",
    productId: "product-1",
    userId: "user-2",
    userName: "Siti Rahayu",
    userImage: "/placeholder.svg?height=50&width=50",
    rating: 4,
    comment:
      "Kaosnya bagus, tapi ukurannya agak kecil dari yang saya harapkan. Sebaiknya pesan satu ukuran lebih besar dari biasanya. Desainnya sangat keren!",
    date: "2023-10-25T10:00:00Z",
    helpfulCount: 8,
  },
  {
    id: "review-3",
    productId: "product-1",
    userId: "user-3",
    userName: "Agus Wijaya",
    userImage: "/placeholder.svg?height=50&width=50",
    rating: 5,
    comment:
      "Saya sangat puas dengan kaos ini. Desainnya unik dan menjadi favorit di kalangan teman-teman pengamat burung. Kualitasnya juga sangat baik.",
    date: "2023-10-15T10:00:00Z",
    helpfulCount: 5,
  },
  {
    id: "review-4",
    productId: "product-6",
    userId: "user-4",
    userName: "Dewi Lestari",
    userImage: "/placeholder.svg?height=50&width=50",
    rating: 5,
    comment:
      "Buku panduan yang sangat lengkap! Ilustrasinya detail dan membantu sekali untuk identifikasi di lapangan. Sangat direkomendasikan untuk pengamat burung pemula maupun yang sudah berpengalaman.",
    date: "2023-11-05T10:00:00Z",
    helpfulCount: 15,
  },
  {
    id: "review-5",
    productId: "product-6",
    userId: "user-5",
    userName: "Rudi Hartono",
    userImage: "/placeholder.svg?height=50&width=50",
    rating: 5,
    comment:
      "Ini adalah buku panduan burung terbaik dalam Bahasa Indonesia yang pernah saya miliki. Informasinya lengkap dan akurat. Sangat membantu untuk kegiatan birdwatching saya.",
    date: "2023-10-20T10:00:00Z",
    helpfulCount: 10,
  },
]

// Mock data untuk orders
const mockOrders = [
  {
    id: "order-1",
    orderNumber: "10001",
    userId: "user-1",
    date: "2023-11-15T10:00:00Z",
    status: "delivered",
    items: [
      {
        productId: "product-1",
        name: "Kaos Black Hole Birding",
        price: 149000,
        quantity: 1,
      },
      {
        productId: "product-6",
        name: "Panduan Identifikasi Burung Terkomplit",
        price: 250000,
        quantity: 1,
      },
    ],
    shippingAddress: {
      name: "Budi Santoso",
      street: "Jl. Merdeka No. 123",
      city: "Jakarta",
      state: "DKI Jakarta",
      zipCode: "10110",
      country: "Indonesia",
    },
    paymentMethod: "Credit Card",
    lastFourDigits: "4242",
    subtotal: 399000,
    shipping: 0,
    tax: 39900,
    total: 438900,
  },
  {
    id: "order-2",
    orderNumber: "10002",
    userId: "user-1",
    date: "2023-10-20T10:00:00Z",
    status: "shipped",
    items: [
      {
        productId: "product-3",
        name: "Poster Kupu-kupu Indonesia",
        price: 120000,
        quantity: 1,
      },
    ],
    shippingAddress: {
      name: "Budi Santoso",
      street: "Jl. Merdeka No. 123",
      city: "Jakarta",
      state: "DKI Jakarta",
      zipCode: "10110",
      country: "Indonesia",
    },
    paymentMethod: "PayPal",
    subtotal: 120000,
    shipping: 0,
    tax: 12000,
    total: 132000,
  },
  {
    id: "order-3",
    orderNumber: "10003",
    userId: "user-1",
    date: "2023-09-05T10:00:00Z",
    status: "processing",
    items: [
      {
        productId: "product-4",
        name: "Peta Taman Nasional Baluran",
        price: 85000,
        quantity: 1,
      },
      {
        productId: "product-9",
        name: "Peta Gunung Semeru",
        price: 85000,
        quantity: 1,
      },
    ],
    shippingAddress: {
      name: "Budi Santoso",
      street: "Jl. Merdeka No. 123",
      city: "Jakarta",
      state: "DKI Jakarta",
      zipCode: "10110",
      country: "Indonesia",
    },
    paymentMethod: "Credit Card",
    lastFourDigits: "4242",
    subtotal: 170000,
    shipping: 0,
    tax: 17000,
    total: 187000,
  },
]

