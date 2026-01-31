"use client";

import { useTranslations } from "next-intl";

import {
  BarChart3,
  LayoutDashboard,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const t = useTranslations("Sidebar");
  const pathname = usePathname();

  const routes = [
    {
      label: t("dashboard"),
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-sky-500",
    },
    {
      label: t("products"),
      icon: Package,
      href: "/products",
      color: "text-violet-500",
    },
    {
      label: t("orders"),
      icon: ShoppingCart,
      href: "/orders",
      color: "text-pink-700",
    },
    {
      label: t("customers"),
      icon: Users,
      href: "/customers",
      color: "text-orange-700",
    },
    {
      label: t("analytics"),
      icon: BarChart3,
      href: "/analytics",
      color: "text-emerald-500",
    },
    {
      label: t("settings"),
      icon: Settings,
      href: "/settings",
      color: "text-gray-500",
    },
  ];

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            {/* Logo placeholder */}
            <div className="bg-white/10 rounded-lg w-full h-full flex items-center justify-center font-bold text-xl">
              S
            </div>
          </div>
          <h1 className="text-2xl font-bold">Scaleforce</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-[#111827]">
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
