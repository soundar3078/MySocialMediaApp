import { cn } from '@/lib/utils';

interface ShimmerPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string;
  width?: string;
  className?: string;
  rounded?: string;
}

export function ShimmerPlaceholder({
  height = 'h-4',
  width = 'w-full',
  className,
  rounded = 'rounded-md',
  ...props
}: ShimmerPlaceholderProps) {
  return (
    <div
      className={cn('shimmer', height, width, rounded, className)}
      {...props}
      aria-busy="true"
      aria-live="polite"
    />
  );
}
