// app/api/heygen-proxy/route.ts
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  if (!url) {
    return new Response('Missing url', { status: 400 });
  }
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': req.headers.get('user-agent') || '',
        'Accept': '*/*',
      },
    });
    const contentType = response.headers.get('content-type') || 'text/plain';
    return new Response(response.body, {
      status: response.status,
      headers: {
        'Content-Type': contentType,
      },
    });
  } catch (err) {
    return new Response('Proxy error', { status: 500 });
  }
}
