import type { SVGProps } from 'react';

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>Vibe Connect Logo</title>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-8 16-18 7 1 1.6 2.4 3 4 3 1.5 0 3-1 4-2.5C12 14 12 10 12 8s3 2 5 2c1 0 2.5-.5 3.5-1.5" />
      <path d="M19.5 7.5c.4-.2.8-.5 1.1-.8" />
    </svg>
  );
}
