import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/content - Mendapatkan semua konten
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    
    let whereClause: any = {}
    
    if (type) {
      whereClause.type = type
    }
    
    const contents = await prisma.content.findMany({
      where: whereClause,
      orderBy: {
        updatedAt: 'desc'
      }
    })
    
    return NextResponse.json(contents)
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data konten' },
      { status: 500 }
    )
  }
}

// POST /api/content - Membuat konten baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validasi data
    if (!body.title || !body.type || !body.content) {
      return NextResponse.json(
        { error: 'Data konten tidak lengkap' },
        { status: 400 }
      )
    }
    
    const content = await prisma.content.create({
      data: {
        title: body.title,
        type: body.type,
        content: body.content,
      }
    })
    
    return NextResponse.json(content, { status: 201 })
  } catch (error) {
    console.error('Error creating content:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat membuat konten' },
      { status: 500 }
    )
  }
} 