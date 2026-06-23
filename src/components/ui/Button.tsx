import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
  onClick?: () => void;
};

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-gradient-to-r from-gold-light via-gold to-serenity text-ink shadow-[0_8px_30px_rgba(214,173,96,0.35)] hover:shadow-[0_10px_40px_rgba(214,173,96,0.5)] hover:-translate-y-0.5",
  secondary:
    "glass text-paper hover:bg-paper/10 hover:-translate-y-0.5",
  ghost: "text-paper/80 hover:text-paper underline-offset-4 hover:underline",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300",
    variants[variant],
    className
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
