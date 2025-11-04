'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { Fragment } from 'react';
import { cn } from '@/shared/lib/utils/cn';

interface BreadcrumbItem {
  label: string;
  href: string;
}

/**
 * Breadcrumb de navigation
 */
export function Breadcrumb({ items }: { items?: BreadcrumbItem[] }) {
  const pathname = usePathname();

  // Auto-generate breadcrumbs from pathname if not provided
  const breadcrumbItems =
    items ||
    pathname
      .split('/')
      .filter(Boolean)
      .map((segment, index, array) => ({
        label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
        href: '/' + array.slice(0, index + 1).join('/'),
      }));

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        href="/dashboard"
        className="hover:text-foreground transition-colors flex items-center"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {breadcrumbItems.map((item, index) => (
        <Fragment key={item.href}>
          <ChevronRight className="h-4 w-4" />
          <Link
            href={item.href}
            className={cn(
              'hover:text-foreground transition-colors',
              index === breadcrumbItems.length - 1 && 'text-foreground font-medium'
            )}
          >
            {item.label}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
}