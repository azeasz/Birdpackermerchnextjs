import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/products - Mendapatkan semua produk
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const sort = searchParams.get('sort')
    const search = searchParams.get('search')
    
    let whereClause: any = {}
    
    // Filter berdasarkan kategori
    if (category) {
      whereClause.categoryId = category
    }
    
    // Filter berdasarkan harga
    if (minPrice || maxPrice) {
      whereClause.price = {}
      if (minPrice) whereClause.price.gte = parseInt(minPrice)
      if (maxPrice) whereClause.price.lte = parseInt(maxPrice)
    }
    
    // Filter berdasarkan pencarian
    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { description: { contains: search } }
      ]
    }
    
    // Pengurutan
    let orderBy: any = {}
    if (sort) {
      switch (sort) {
        case 'price-asc':
          orderBy = { price: 'asc' }
          break
        case 'price-desc':
          orderBy = { price: 'desc' }
          break
        case 'name-asc':
          orderBy = { name: 'asc' }
          break
        case 'name-desc':
          orderBy = { name: 'desc' }
          break
        case 'newest':
          orderBy = { createdAt: 'desc' }
          break
        default:
          orderBy = { createdAt: 'desc' }
      }
    } else {
      orderBy = { createdAt: 'desc' }
    }
    
    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy,
      include: {
        category: true
      }
    })
    
    // Parse features dari JSON string menjadi array
    const productsWithParsedFeatures = products.map((product: any) => ({
      ...product,
      features: JSON.parse(product.features || '[]')
    }))
    
    return NextResponse.json(productsWithParsedFeatures)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data produk' },
      { status: 500 }
    )
  }
}

// POST /api/products - Membuat produk baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validasi data
    if (!body.name || !body.description || !body.price || !body.categoryId) {
      return NextResponse.json(
        { error: 'Data produk tidak lengkap' },
        { status: 400 }
      )
    }
    
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        image: body.image || '/placeholder.svg',
        categoryId: body.categoryId,
        rating: 0,
        reviewCount: 0,
        inStock: body.inStock || true,
        isNew: body.isNew || false,
        discount: body.discount || 0,
        features: JSON.stringify(body.features || []),
        specifications: body.specifications || {},
      }
    })
    
    // Parse features dari JSON string menjadi array untuk respons
    const productWithParsedFeatures = {
      ...product,
      features: JSON.parse(product.features || '[]')
    }
    
    return NextResponse.json(productWithParsedFeatures, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat membuat produk' },
      { status: 500 }
    )
  }
} 