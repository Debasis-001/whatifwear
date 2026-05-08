import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function CartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h8.3a2 2 0 0 0 2-1.6L21 7H7.2" />
      <circle cx="10" cy="20" r="1.2" />
      <circle cx="18" cy="20" r="1.2" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M20.8 8.3a4.8 4.8 0 0 0-8.8-2.6A4.8 4.8 0 0 0 3.2 8.3c0 5.2 5.6 8.7 8.8 11.5 3.2-2.8 8.8-6.3 8.8-11.5Z" />
    </svg>
  );
}

export function ProfileIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4 20c1.8-3.7 4.2-5.5 8-5.5s6.2 1.8 8 5.5" />
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M3 6h11v9H3z" />
      <path d="M14 9h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.5" />
      <circle cx="18" cy="18" r="1.5" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M12 3 5.5 6v5.5c0 4.7 2.7 7.7 6.5 9.5 3.8-1.8 6.5-4.8 6.5-9.5V6z" />
      <path d="m9.3 12 1.7 1.7 3.7-3.7" />
    </svg>
  );
}

export function RefreshIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M20 6v5h-5" />
      <path d="M4 18v-5h5" />
      <path d="M6.8 9A7 7 0 0 1 18.6 6M17.2 15A7 7 0 0 1 5.4 18" />
    </svg>
  );
}

export function RouteIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="6" r="2" />
      <path d="M8 18h4a4 4 0 0 0 4-4V8" />
    </svg>
  );
}
