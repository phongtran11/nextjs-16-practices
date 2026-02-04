import { useTranslations } from "next-intl";

interface PaginationInfoProps {
  total: number;
  page: number;
  pageSize: number;
  className?: string;
}

export function PaginationInfo({
  total,
  page,
  pageSize,
  className,
}: PaginationInfoProps) {
  const t = useTranslations("Common.PaginationInfo");
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  if (total === 0) {
    return (
      <div
        className={`text-center md:text-left text-sm text-muted-foreground ${className}`}
      >
        {t("noResults")}
      </div>
    );
  }

  return (
    <div
      className={`text-center md:text-left text-sm text-muted-foreground ${className}`}
    >
      {t("showing", { start, end, total })}
    </div>
  );
}
