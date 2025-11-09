'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/shared/components/ui/card';
import { cn } from '@/shared/lib/utils/cn';

interface CountdownTimerProps {
  targetDate: Date | string;
  onComplete?: () => void;
  showDays?: boolean;
  compact?: boolean;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Compte à rebours vers une date cible
 */
export function CountdownTimer({
  targetDate,
  onComplete,
  showDays = true,
  compact = false,
  className,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return null;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (!newTimeLeft && onComplete) {
        onComplete();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  if (!timeLeft) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center p-6">
          <p className="text-sm text-muted-foreground">Terminé !</p>
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <div className={cn('flex items-center gap-2 text-sm', className)}>
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="font-mono font-medium">
          {showDays && timeLeft.days > 0 && `${timeLeft.days}j `}
          {String(timeLeft.hours).padStart(2, '0')}:
          {String(timeLeft.minutes).padStart(2, '0')}:
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="grid grid-cols-4 gap-4 text-center">
          {showDays && (
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">{timeLeft.days}</div>
              <div className="text-xs text-muted-foreground uppercase">Jours</div>
            </div>
          )}
          <div className="space-y-1">
            <div className="text-3xl font-bold text-primary">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="text-xs text-muted-foreground uppercase">Heures</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-primary">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
           <div className="text-xs text-muted-foreground uppercase">Minutes</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-primary">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-xs text-muted-foreground uppercase">Secondes</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}