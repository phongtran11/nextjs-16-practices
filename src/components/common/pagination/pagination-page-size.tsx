"use client";

import { useTransition } from "react";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/routing";

interface PaginationPageSizeProps {
  pageSize: number;
  pageSizeOptions?: number[];
  className?: string;
}

export function PaginationPageSize({
  pageSize,
  pageSizeOptions = [10, 20, 30, 40, 50],
  className,
}: PaginationPageSizeProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("Common.Pagination");
  const [isNavigationPending, startNavigation] = useTransition();

  const setPageSize = (newSize: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageSize", newSize);
    params.set("page", "1"); // Reset to first page
    startNavigation(() => router.push(`${pathname}?${params.toString()}`));
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <p className="text-sm font-medium">{t("rowsPerPage")}</p>
      <Select value={`${pageSize}`} onValueChange={setPageSize}>
        <SelectTrigger className="h-8 w-[70px]" disabled={isNavigationPending}>
          <SelectValue placeholder={pageSize} />
        </SelectTrigger>
        <SelectContent side="top">
          {pageSizeOptions.map((size) => (
            <SelectItem key={size} value={`${size}`}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
