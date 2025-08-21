import { NextRequest, NextResponse } from 'next/server'

import { createApiResponse, resumeService } from '@/lib/api'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const forceRefresh = url.searchParams.get('refresh') === 'true'

    const resumeData = await resumeService.getResumeData(forceRefresh)

    return NextResponse.json(createApiResponse(resumeData, true, 'Resume data retrieved successfully'), {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', // 5min cache, 10min stale
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Resume API error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Failed to retrieve resume data'

    return NextResponse.json(createApiResponse(null, false, undefined, errorMessage), { status: 500 })
  }
}

// Handle OPTIONS for CORS
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
