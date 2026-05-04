"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export type TitleLogoProps = {
  title?: string;
  backgroundColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  fontSize?: string;
};

const defaultProps = {
  title: "Next16-AIDD",
  backgroundColor: "#e5e7eb",
  textColor: "#374151",
  hoverTextColor: "#4B5563",
  fontSize: "1.125rem",
} as const;

export const TitleLogo = ({
  title = defaultProps.title,
  backgroundColor = defaultProps.backgroundColor,
  textColor = defaultProps.textColor,
  hoverTextColor = defaultProps.hoverTextColor,
  fontSize = defaultProps.fontSize,
}: TitleLogoProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hovered, setHovered] = useState(false);

  const href = useMemo(() => {
    if (pathname === "/") return "/";

    const search = searchParams.get("search")?.trim() ?? "";
    const page = searchParams.get("page")?.trim() ?? "";

    if (!search) return "/";

    const params = new URLSearchParams({ search });
    if (page) params.set("page", page);

    return `/?${params.toString()}`;
  }, [pathname, searchParams]);

  return (
    <Link
      href={href}
      className="inline-block w-fit text-lg font-bold text-gray-700 hover:text-gray-600"
      style={{
        backgroundColor,
        color: hovered ? hoverTextColor : textColor,
        fontSize,
      }}
      onClick={(event) => {
        if (pathname !== "/") return;
        event.preventDefault();
        router.push("/");
        router.refresh();
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {title}
    </Link>
  );
};
