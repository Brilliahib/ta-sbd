"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import NavButton from "@/components/atoms/nav/NavButton";
import NavL from "@/components/atoms/nav/NavL";
import NavLink from "@/components/atoms/nav/NavLink";
import NavSearch from "@/components/atoms/nav/NavSearch";
import Link from "next/link";

export interface Link {
  href: string;
  label: string;
  active?: boolean;
}

export default function Navbar() {
  const pathname = usePathname();

  const links = useMemo(
    () => [
      {
        href: "#",
        label: "Jacket",
        active: pathname.startsWith("/woman"),
      },
      {
        href: "#",
        label: "T-Shirt",
        active: pathname.startsWith("/man"),
      },
      {
        href: "#",
        label: "Pants",
        active: pathname.startsWith("/kids"),
      },
      {
        href: "#",
        label: "Hoodie",
        active: pathname.startsWith("/entertainments"),
      },
      {
        href: "#",
        label: "Shoes",
        active: pathname.startsWith("/shoes"),
      },
      {
        href: "#",
        label: "Accessories",
        active: pathname.startsWith("/accessories"),
      },
      {
        href: "#",
        label: "Bags",
        active: pathname.startsWith("/bags"),
      },
      {
        href: "#",
        label: "Watches",
        active: pathname.startsWith("/watches"),
      },
      {
        href: "#",
        label: "Hats",
        active: pathname.startsWith("/hats"),
      },
      {
        href: "#",
        label: "Socks",
        active: pathname.startsWith("/socks"),
      },
    ],
    [pathname],
  );

  return (
    <>
      <div className="sticky top-0 z-50 mb-0 w-full bg-background">
        <div className="pad-x-xl flex justify-between gap-8 bg-background py-3 md:gap-12">
          <NavL />
          <NavSearch />
          <NavButton links={links} />
        </div>
        <div className="border-b">
          <nav className="pad-x hidden items-center space-x-8 py-3 font-semibold md:flex">
            {links.map((link) => (
              <NavLink key={link.label} {...link} />
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
