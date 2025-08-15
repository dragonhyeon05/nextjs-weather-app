import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const WEATHERAPI_API_KEY = process.env.WEATHERAPI_API_KEY;

  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  if (!WEATHERAPI_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${WEATHERAPI_API_KEY}&q=${query}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error?.message || 'Failed to fetch city suggestions');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch city suggestions:', error);
    return NextResponse.json({ error: 'Failed to fetch city suggestions' }, { status: 500 });
  }
}