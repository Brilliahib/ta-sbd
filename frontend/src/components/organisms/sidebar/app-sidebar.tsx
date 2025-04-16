"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  ArrowLeftRight,
  House,
  LayoutDashboard,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Session } from "next-auth";
import { NavUser } from "./NavUser";
import Image from "next/image";

interface AppsidebarProps {
  session: Session;
}

export function AppSidebar({ session }: AppsidebarProps) {
  const pathname = usePathname();

  const role = session.user.role;

  // role admin
  const adminMenu = [
    {
      icon: <LayoutDashboard />,
      name: "Dashboard Admin",
      href: "/dashboard/admin",
    },
    {
      icon: <ShoppingBag />,
      name: "Kategori Produk",
      href: "/dashboard/admin/category",
    },
    {
      icon: <Shirt />,
      name: "Produk",
      href: "/dashboard/admin/product",
    },
    {
      icon: <Users />,
      name: "Pengguna",
      href: "/dashboard/users",
    },
  ];

  // role users
  const userMenu = [
    { icon: <House />, name: "Halaman Beranda", href: "/" },
    { icon: <LayoutDashboard />, name: "Dashboard", href: "/dashboard" },
    {
      icon: <Shirt />,
      name: "Produk",
      href: "/dashboard/product",
    },
    {
      icon: <ShoppingCart />,
      name: "Pembelian",
      href: "/dashboard/purchase",
    },
    { icon: <ShoppingBag />, name: "Penjualan", href: "/dashboard/sales" },
    {
      icon: <ArrowLeftRight />,
      name: "Penawaran Produk",
      href: "/dashboard/exchange",
    },
  ];

  // select role
  const menuItems = role === "admin" ? adminMenu : userMenu;

  return (
    <Sidebar>
      <SidebarHeader className="h-14 cursor-default justify-center border-b bg-white dark:bg-slate-950">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="ml-2 flex items-center gap-x-3">
              <Link href={"/dashboard"} className="flex items-center gap-2">
                <Image
                  src={"/images/logo_notext.png"}
                  alt="Vintagee"
                  width={20}
                  height={20}
                />
                <h1 className="font-semibold tracking-tight text-primary">
                  Vintagee
                </h1>
              </Link>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-white pb-20 dark:bg-slate-950">
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton
                    asChild
                    className={`hover:bg-primary/10 hover:text-primary dark:hover:bg-slate-900 ${
                      pathname === item.href
                        ? "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary dark:bg-slate-800"
                        : ""
                    }`}
                  >
                    <Link href={item.href}>
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser session={session!} />
      </SidebarFooter>
    </Sidebar>
  );
}
