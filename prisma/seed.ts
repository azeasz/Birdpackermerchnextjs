import { PrismaClient } from '@prisma/client'
import { mockCategories, mockProducts } from '../lib/data'

const prisma = new PrismaClient()

async function main() {
  // Seed categories
  for (const category of mockCategories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: {
        id: category.id,
        name: category.name,
        description: category.description,
        image: category.image,
      },
    })
  }

  console.log('Categories seeded successfully')

  // Seed products
  for (const product of mockProducts) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        categoryId: product.categoryId,
        rating: product.rating,
        reviewCount: product.reviewCount,
        inStock: product.inStock,
        isNew: product.isNew,
        discount: product.discount,
        features: JSON.stringify(product.features || []),
        specifications: product.specifications || {},
        createdAt: new Date(product.createdAt),
      },
    })
  }

  console.log('Products seeded successfully')

  // Seed admin user
  await prisma.user.upsert({
    where: { email: 'admin@birdpacker.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@birdpacker.com',
      password: '$2a$10$GmQzRpV6Nz.dMnS5VpnRnOQwu2tCH2MgFTRYT1wA.jIBLi7UNgmPK', // 'password123' hashed
      role: 'ADMIN',
    },
  })

  console.log('Admin user seeded successfully')

  // Seed content
  await prisma.content.upsert({
    where: { id: 'about-1' },
    update: {},
    create: {
      id: 'about-1',
      type: 'ABOUT',
      title: 'Tentang Birdpacker Merch',
      content: 'Birdpacker Merch adalah toko online yang menyediakan berbagai produk berkualitas untuk para pengamat burung dan pecinta alam. Kami berkomitmen untuk menyediakan produk yang ramah lingkungan dan mendukung konservasi alam.',
    },
  })

  await prisma.content.upsert({
    where: { id: 'faq-1' },
    update: {},
    create: {
      id: 'faq-1',
      type: 'FAQ',
      title: 'Pertanyaan Umum',
      content: 'Berikut adalah beberapa pertanyaan yang sering diajukan oleh pelanggan kami:\n\n1. Berapa lama waktu pengiriman?\nWaktu pengiriman tergantung pada lokasi Anda, biasanya 2-5 hari kerja.\n\n2. Apakah ada garansi produk?\nYa, semua produk kami memiliki garansi 30 hari.',
    },
  })

  console.log('Content seeded successfully')

  // Seed settings
  await prisma.setting.upsert({
    where: { key: 'store_name' },
    update: {},
    create: {
      key: 'store_name',
      value: 'Birdpacker Merch',
    },
  })

  await prisma.setting.upsert({
    where: { key: 'store_description' },
    update: {},
    create: {
      key: 'store_description',
      value: 'Toko online untuk para pengamat burung dan pecinta alam',
    },
  })

  await prisma.setting.upsert({
    where: { key: 'currency' },
    update: {},
    create: {
      key: 'currency',
      value: 'IDR',
    },
  })

  console.log('Settings seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 