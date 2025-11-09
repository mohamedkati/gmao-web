'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils/cn';

interface CopyButtonProps {
  value: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showLabel?: boolean;
  className?: string;
}

/**
 * Bouton pour copier du texte dans le presse-papier
 */
export function CopyButton({
  value,
  variant = 'ghost',
  size = 'sm',
  showLabel = false,
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={cn('gap-2', className)}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          {showLabel && <span>Copié !</span>}
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          {showLabel && <span>Copier</span>}
        </>
      )}
    </Button>
  );
}