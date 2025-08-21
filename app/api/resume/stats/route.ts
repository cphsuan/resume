import { NextRequest, NextResponse } from 'next/server'

import { createApiResponse, resumeService } from '@/lib/api'

export async function GET(request: NextRequest) {
  try {
    const stats = await resumeService.getResumeStats()

    return NextResponse.json(createApiResponse(stats, true, 'Resume stats retrieved successfully'), {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200', // 10min cache, 20min stale
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Resume stats API error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Failed to retrieve resume stats'

    return NextResponse.json(createApiResponse(null, false, undefined, errorMessage), { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
