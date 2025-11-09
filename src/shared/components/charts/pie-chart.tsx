'use client';

import { Pie, PieChart as RechartsPieChart, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';

type PieChartData = {
    name: string; 
    value: number
}

interface PieChartProps {
    data: PieChartData[];
    title?: string;
    description?: string;
    height?: number;
    colors?: string[];
    showLegend?: boolean;
    innerRadius?: number;
    className?: string;
}

const DEFAULT_COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
];

/**
 * Graphique circulaire (Pie/Donut) pour les proportions
 */
export function PieChart({
    data,
    title,
    description,
    height = 300,
    colors = DEFAULT_COLORS,
    showLegend = true,
    innerRadius = 0,
    className,
}: PieChartProps) {
    return (
        <Card className={className}>
            {(title || description) && (
                <CardHeader>
                    {title && <CardTitle>{title}</CardTitle>}
                    {description && <CardDescription>{description}</CardDescription>}
                </CardHeader>
            )}
            <CardContent>
                <ResponsiveContainer width="100%" height={height}>
                    <RechartsPieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            // label={(label:PieChartData) => `${label.name} ${(label.value * 100).toFixed(0)}%`}
                            outerRadius={80}
                            innerRadius={innerRadius}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            content={({ active, payload }) => {
                                if (!active || !payload?.length) return null;
                                return (
                                    <div className="rounded-lg border bg-background p-3 shadow-lg">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm font-medium">{payload[0].name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {payload[0].value} ({((payload[0].value as number) / data.reduce((sum, item) => sum + item.value, 0) * 100).toFixed(1)}%)
                                            </p>
                                        </div>
                                    </div>
                                );
                            }}
                        />
                        {showLegend && <Legend />}
                    </RechartsPieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}