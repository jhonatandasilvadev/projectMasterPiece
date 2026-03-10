'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export function QrPreview({ url }: { url: string }) {
  const [dataUrl, setDataUrl] = useState('');

  useEffect(() => {
    QRCode.toDataURL(url).then(setDataUrl);
  }, [url]);

  if (!dataUrl) return <p>Generating QR...</p>;

  return <img src={dataUrl} alt="QR code" className="h-40 w-40 rounded-lg border bg-white p-2" />;
}
