import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/settings - Mendapatkan semua pengaturan
export async function GET() {
  try {
    const settings = await prisma.setting.findMany()
    
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data pengaturan' },
      { status: 500 }
    )
  }
}

// PUT /api/settings - Memperbarui pengaturan
export async function PUT(request: NextRequest) {
  try {
    const settings = await request.json()
    
    if (!Array.isArray(settings)) {
      return NextResponse.json(
        { error: 'Format data tidak valid' },
        { status: 400 }
      )
    }
    
    const results = await Promise.all(
      settings.map(async (setting) => {
        return prisma.setting.upsert({
          where: { key: setting.key },
          update: { value: setting.value },
          create: { key: setting.key, value: setting.value },
        })
      })
    )
    
    return NextResponse.json(results)
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memperbarui pengaturan' },
      { status: 500 }
    )
  }
} 