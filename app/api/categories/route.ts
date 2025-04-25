import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/categories - Mendapatkan semua kategori
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data kategori' },
      { status: 500 }
    )
  }
}

// POST /api/categories - Membuat kategori baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validasi data
    if (!body.name || !body.description) {
      return NextResponse.json(
        { error: 'Data kategori tidak lengkap' },
        { status: 400 }
      )
    }
    
    const category = await prisma.category.create({
      data: {
        name: body.name,
        description: body.description,
        image: body.image || '/placeholder.svg',
      }
    })
    
    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat membuat kategori' },
      { status: 500 }
    )
  }
} 