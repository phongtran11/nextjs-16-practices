"use client";

import { useEffect, useState, useTransition } from "react";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import { Loader2, Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "@/i18n/routing";

import { Button } from "../ui/button";

interface SearchInputProps {
  className?: string;
}

export function SearchInput({ className }: SearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("Common.SearchInput");
  const [isSearching, startSearch] = useTransition();

  // Initialize state from URL param
  const currentSearchParam = searchParams.get("search") || "";
  const [text, setText] = useState(currentSearchParam);

  const handleSearch = (overrideText?: string) => {
    const value = overrideText ?? text;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    // Reset to page 1 when searching
    params.set("page", "1");

    startSearch(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setText("");
    handleSearch("");
  };

  useEffect(() => {
    setText(currentSearchParam);
  }, [currentSearchParam]);

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      aria-busy={isSearching}
    >
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
        <Input
          placeholder={t("placeholder")}
          className="pl-8"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {isSearching && (
          <Loader2 className="absolute right-2 top-2.5 size-4 animate-spin text-muted-foreground" />
        )}
        {!isSearching && text && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2.5 size-4"
            onClick={handleClear}
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
      <Button onClick={() => handleSearch()} disabled={isSearching}>
        {t("search")}
      </Button>
    </div>
  );
}
