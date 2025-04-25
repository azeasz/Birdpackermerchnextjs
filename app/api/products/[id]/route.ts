import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/products/[id] - Mendapatkan produk berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: { category: true }
    })
    
    if (!product) {
      return NextResponse.json(
        { error: 'Produk tidak ditemukan' },
        { status: 404 }
      )
    }
    
    // Parse features dari JSON string menjadi array
    const productWithParsedFeatures = {
      ...product,
      features: JSON.parse(product.features || '[]')
    }
    
    return NextResponse.json(productWithParsedFeatures)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data produk' },
      { status: 500 }
    )
  }
}

// PUT /api/products/[id] - Memperbarui produk berdasarkan ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Validasi data
    if (!body.name || !body.description || !body.price || !body.categoryId) {
      return NextResponse.json(
        { error: 'Data produk tidak lengkap' },
        { status: 400 }
      )
    }
    
    // Periksa apakah produk ada
    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id }
    })
    
    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Produk tidak ditemukan' },
        { status: 404 }
      )
    }
    
    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        image: body.image || existingProduct.image,
        categoryId: body.categoryId,
        inStock: body.inStock !== undefined ? body.inStock : existingProduct.inStock,
        isNew: body.isNew !== undefined ? body.isNew : existingProduct.isNew,
        discount: body.discount !== undefined ? body.discount : existingProduct.discount,
        features: JSON.stringify(body.features || JSON.parse(existingProduct.features || '[]')),
        specifications: body.specifications || existingProduct.specifications,
      }
    })
    
    // Parse features dari JSON string menjadi array
    const updatedProductWithParsedFeatures = {
      ...updatedProduct,
      features: JSON.parse(updatedProduct.features || '[]')
    }
    
    return NextResponse.json(updatedProductWithParsedFeatures)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memperbarui produk' },
      { status: 500 }
    )
  }
}

// DELETE /api/products/[id] - Menghapus produk berdasarkan ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Periksa apakah produk ada
    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id }
    })
    
    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Produk tidak ditemukan' },
        { status: 404 }
      )
    }
    
    await prisma.product.delete({
      where: { id: params.id }
    })
    
    return NextResponse.json(
      { message: 'Produk berhasil dihapus' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menghapus produk' },
      { status: 500 }
    )
  }
} 