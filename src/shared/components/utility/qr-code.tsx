'use client';

import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Download } from 'lucide-react';

interface QRCodeProps {
  value: string;
  size?: number;
  title?: string;
  showDownload?: boolean;
  className?: string;
}

/**
 * Générateur de QR Code stylisé
 */
export function QRCode({
  value,
  size = 300,
  title,
  showDownload = true,
  className,
}: QRCodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!qrCode.current) {
      qrCode.current = new QRCodeStyling({
        width: size,
        height: size,
        data: value,
        margin: 10,
        qrOptions: {
          typeNumber: 0,
          mode: 'Byte',
          errorCorrectionLevel: 'Q',
        },
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: 0.4,
          margin: 0,
        },
        dotsOptions: {
          type: 'rounded',
          color: 'hsl(var(--primary))',
        },
        backgroundOptions: {
          color: 'hsl(var(--background))',
        },
        cornersSquareOptions: {
          type: 'extra-rounded',
          color: 'hsl(var(--primary))',
        },
        cornersDotOptions: {
          type: 'dot',
          color: 'hsl(var(--primary))',
        },
      });
    }

    if (ref.current) {
      ref.current.innerHTML = '';
      qrCode.current.append(ref.current);
    }
  }, [value, size]);

  const handleDownload = () => {
    qrCode.current?.download({
      name: 'qr-code',
      extension: 'png',
    });
  };

  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="flex flex-col items-center gap-4">
        <div ref={ref} />
        {showDownload && (
          <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Télécharger
          </Button>
        )}
      </CardContent>
    </Card>
  );
}