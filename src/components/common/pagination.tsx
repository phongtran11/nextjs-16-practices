"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/routing";

interface PaginationProps {
  page: number;
  total: number;
  pageSize: number;
  pageSizeOptions?: number[];
  className?: string;
}

export function Pagination({
  page,
  total,
  pageSize,
  pageSizeOptions = [10, 20, 30, 40, 50],
  className,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("Common.Pagination");

  const totalPages = Math.ceil(total / pageSize);

  const setPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const setPageSize = (newSize: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageSize", newSize);
    params.set("page", "1"); // Reset to first page
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className={`flex flex-col items-center gap-4 lg:flex-row lg:gap-6 xl:gap-8 ${className}`}
    >
      <div className="flex items-center gap-4 lg:gap-6 xl:gap-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">{t("rowsPerPage")}</p>
          <Select value={`${pageSize}`} onValueChange={setPageSize}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {t("pageOf", { page, totalPages })}
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setPage(1)}
            disabled={page === 1}
          >
            <span className="sr-only">{t("first")}</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <span className="sr-only">{t("previous")}</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            <span className="sr-only">{t("next")}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
          >
            <span className="sr-only">{t("last")}</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-nowrap">{t("goTo")}</span>
          <Select
            value={`${page}`}
            onValueChange={(val) => setPage(Number(val))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={page} />
            </SelectTrigger>
            <SelectContent side="top" className="max-h-[200px]">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <SelectItem key={p} value={`${p}`}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
