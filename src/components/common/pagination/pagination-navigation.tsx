"use client";

import { useId, useTransition } from "react";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/routing";

interface PaginationNavigationProps {
  page: number;
  total: number;
  pageSize: number;
  className?: string;
}

export function PaginationNavigation({
  page,
  total,
  pageSize,
  className,
}: PaginationNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("Common.Pagination");
  const [isNavigationPending, startNavigation] = useTransition();

  const totalPages = Math.ceil(total / pageSize);

  const setPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    startNavigation(() => router.push(`${pathname}?${params.toString()}`));
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Total max visible buttons including ellipsis

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first, last, current, and neighbors
      if (page <= 3) {
        // Near start: 1, 2, 3, 4 ... last
        pages.push(1, 2, 3, 4, -1, totalPages);
      } else if (page >= totalPages - 2) {
        // Near end: 1 ... total-3, total-2, total-1, total
        pages.push(
          1,
          -1,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        // Middle: 1 ... current-1, current, current+1 ... total
        pages.push(1, -1, page - 1, page, page + 1, -1, totalPages);
      }
    }

    return pages.map((p, index) => {
      if (p === -1) {
        return (
          <span
            key={`ellipsis-${index}`}
            className="flex h-8 w-8 items-center justify-center"
          >
            ...
          </span>
        );
      }
      return (
        <Button
          key={p}
          variant={p === page ? "default" : "outline"}
          className="h-8 w-8 p-0"
          onClick={() => setPage(p)}
          disabled={isNavigationPending}
        >
          {p}
        </Button>
      );
    });
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant="outline"
        className="h-8 w-8 p-0"
        onClick={() => setPage(1)}
        disabled={page === 1 || isNavigationPending}
      >
        <span className="sr-only">{t("first")}</span>
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="h-8 w-8 p-0"
        onClick={() => setPage(page - 1)}
        disabled={page === 1 || isNavigationPending}
      >
        <span className="sr-only">{t("previous")}</span>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-2">{renderPageNumbers()}</div>

      <Button
        variant="outline"
        className="h-8 w-8 p-0"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages || isNavigationPending}
      >
        <span className="sr-only">{t("next")}</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="h-8 w-8 p-0"
        onClick={() => setPage(totalPages)}
        disabled={page === totalPages || isNavigationPending}
      >
        <span className="sr-only">{t("last")}</span>
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
