"use client";

import { useTransition } from "react";

import { useLocale } from "next-intl";

import { FlagUS, FlagVN } from "@/components/icons/flags";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routing, usePathname, useRouter } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(pathname, {
        locale: nextLocale as (typeof routing.locales)[number],
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2"
          disabled={isPending}
        >
          {locale === "en" ? (
            <FlagUS className="mr-2 h-4 w-4 rounded-[2px]" />
          ) : (
            <FlagVN className="mr-2 h-4 w-4 rounded-[2px]" />
          )}
          <span className="text-xs">{locale.toUpperCase()}</span>
          <span className="sr-only">Switch Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onSelectChange("en")}>
          <div className="flex items-center gap-2">
            <FlagUS className="h-4 w-4 rounded-[2px]" />
            <span>English</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSelectChange("vi")}>
          <div className="flex items-center gap-2">
            <FlagVN className="h-4 w-4 rounded-[2px]" />
            <span>Tiếng Việt</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
