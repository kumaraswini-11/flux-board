import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface AppLogoProps {
  href?: string;
  className?: string;
  iconSize?: number;
  imageClassName?: string;
  showText?: boolean;
  textClassName?: string;
}

// App Brand/Logo Component
export function AppLogo({
  href = "/",
  className,
  iconSize = 28,
  imageClassName,
  showText = true,
  textClassName,
}: AppLogoProps) {
  const content = (
    <>
      <div
        className={cn(
          "relative flex aspect-square size-8 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/10",
          imageClassName,
        )}
      >
        <Image
          src="/logo.svg"
          alt=""
          width={iconSize}
          height={iconSize}
          priority // Priority loading for critical visual element
          className="object-contain"
          style={{ borderRadius: "inherit" }}
        />
      </div>
      {showText && (
        <span className={cn("font-bold text-lg tracking-tight", textClassName)}>
          Flux Board
        </span>
      )}
    </>
  );

  return (
    <Link
      href={href as Route}
      className={cn(
        "flex items-center gap-2",
        "group transition-opacity hover:opacity-90",
        className,
      )}
      aria-label="Go to homepage"
    >
      {content}
    </Link>
  );
}
