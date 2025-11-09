'use client';

import { Line, LineChart, ResponsiveContainer } from 'recharts';
import { cn } from '@/shared/lib/utils/cn';

interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
  className?: string;
}

/**
 * Mini graphique sparkline pour tendances rapides
 */
export function Sparkline({
  data,
  color = 'hsl(var(--primary))',
  height = 40,
  width = 100,
  className,
}: SparklineProps) {
  const chartData = data.map((value, index) => ({ value, index }));

  return (
    <div className={cn('inline-block', className)} style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}