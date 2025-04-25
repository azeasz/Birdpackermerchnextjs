import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/content/[id] - Mendapatkan konten berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const content = await prisma.content.findUnique({
      where: { id: params.id },
    })
    
    if (!content) {
      return NextResponse.json(
        { error: 'Konten tidak ditemukan' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(content)
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data konten' },
      { status: 500 }
    )
  }
}

// PUT /api/content/[id] - Memperbarui konten berdasarkan ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Validasi data
    if (!body.title || !body.type || !body.content) {
      return NextResponse.json(
        { error: 'Data konten tidak lengkap' },
        { status: 400 }
      )
    }
    
    // Periksa apakah konten ada
    const existingContent = await prisma.content.findUnique({
      where: { id: params.id }
    })
    
    if (!existingContent) {
      return NextResponse.json(
        { error: 'Konten tidak ditemukan' },
        { status: 404 }
      )
    }
    
    const updatedContent = await prisma.content.update({
      where: { id: params.id },
      data: {
        title: body.title,
        type: body.type,
        content: body.content,
      },
    })
    
    return NextResponse.json(updatedContent)
  } catch (error) {
    console.error('Error updating content:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memperbarui konten' },
      { status: 500 }
    )
  }
}

// DELETE /api/content/[id] - Menghapus konten berdasarkan ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Periksa apakah konten ada
    const existingContent = await prisma.content.findUnique({
      where: { id: params.id }
    })
    
    if (!existingContent) {
      return NextResponse.json(
        { error: 'Konten tidak ditemukan' },
        { status: 404 }
      )
    }
    
    await prisma.content.delete({
      where: { id: params.id }
    })
    
    return NextResponse.json(
      { message: 'Konten berhasil dihapus' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting content:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menghapus konten' },
      { status: 500 }
    )
  }
} 