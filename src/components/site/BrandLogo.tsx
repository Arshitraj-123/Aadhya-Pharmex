import { cn } from "@/lib/utils";

export function BrandLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-6 h-6", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="apx-cap-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.17 75)" />
          <stop offset="100%" stopColor="oklch(0.62 0.16 80)" />
        </linearGradient>
        <linearGradient id="apx-cap-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.96 0.02 120)" />
          <stop offset="100%" stopColor="oklch(0.88 0.04 130)" />
        </linearGradient>
        <linearGradient id="apx-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.72 0.16 145)" />
          <stop offset="100%" stopColor="oklch(0.5 0.13 150)" />
        </linearGradient>
      </defs>

      {/* Capsule (rotated 45deg around center) */}
      <g transform="rotate(-45 24 24)">
        <rect x="6" y="18" width="18" height="12" rx="6" fill="url(#apx-cap-a)" />
        <rect x="24" y="18" width="18" height="12" rx="6" fill="url(#apx-cap-b)" stroke="oklch(0.78 0.06 130)" strokeWidth="0.6" />
        {/* highlight */}
        <rect x="9" y="20" width="12" height="2" rx="1" fill="white" opacity="0.35" />
      </g>

      {/* Leaf accent */}
      <path
        d="M34 8 C 40 12, 42 18, 38 24 C 34 22, 32 18, 32 14 C 32 12, 33 10, 34 8 Z"
        fill="url(#apx-leaf)"
      />
      <path d="M34 10 C 35 14, 36 18, 37 22" stroke="oklch(0.95 0.05 130)" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}