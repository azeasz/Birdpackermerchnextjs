import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/categories/[id] - Mendapatkan kategori berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            image: true,
          },
        },
      },
    })
    
    if (!category) {
      return NextResponse.json(
        { error: 'Kategori tidak ditemukan' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(category)
  } catch (error) {
    console.error('Error fetching category:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data kategori' },
      { status: 500 }
    )
  }
}

// PUT /api/categories/[id] - Memperbarui kategori berdasarkan ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Validasi data
    if (!body.name || !body.description) {
      return NextResponse.json(
        { error: 'Data kategori tidak lengkap' },
        { status: 400 }
      )
    }
    
    // Periksa apakah kategori ada
    const existingCategory = await prisma.category.findUnique({
      where: { id: params.id }
    })
    
    if (!existingCategory) {
      return NextResponse.json(
        { error: 'Kategori tidak ditemukan' },
        { status: 404 }
      )
    }
    
    const updatedCategory = await prisma.category.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        image: body.image || existingCategory.image,
      },
    })
    
    return NextResponse.json(updatedCategory)
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memperbarui kategori' },
      { status: 500 }
    )
  }
}

// DELETE /api/categories/[id] - Menghapus kategori berdasarkan ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Periksa apakah kategori ada
    const existingCategory = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        products: {
          select: { id: true },
        },
      },
    })
    
    if (!existingCategory) {
      return NextResponse.json(
        { error: 'Kategori tidak ditemukan' },
        { status: 404 }
      )
    }
    
    // Periksa apakah kategori masih memiliki produk
    if (existingCategory.products.length > 0) {
      return NextResponse.json(
        { error: 'Kategori masih memiliki produk. Hapus produk terlebih dahulu atau pindahkan ke kategori lain.' },
        { status: 400 }
      )
    }
    
    await prisma.category.delete({
      where: { id: params.id }
    })
    
    return NextResponse.json(
      { message: 'Kategori berhasil dihapus' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menghapus kategori' },
      { status: 500 }
    )
  }
} 