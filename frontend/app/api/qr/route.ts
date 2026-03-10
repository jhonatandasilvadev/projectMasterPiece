import { NextRequest } from 'next/server';
import QRCode from 'qrcode';

export async function GET(request: NextRequest) {
  const value = request.nextUrl.searchParams.get('value') || '';
  const png = await QRCode.toBuffer(value, { type: 'png', width: 256 });

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png'
    }
  });
}
