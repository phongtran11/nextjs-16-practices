import { Suspense } from "react";

import { getTranslations } from "next-intl/server";

import { DataTableSkeleton } from "@/components/common/data-table-skeleton";
import { SearchInput } from "@/components/common/search-input";
import { CreateUserButton } from "@/modules/users/components/create-user-button";
import { UserList } from "@/modules/users/components/user-list";

export const metadata = {
  title: "User Management",
};

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; pageSize?: string }>;
}) {
  const [t, resolvedParams] = await Promise.all([
    getTranslations("Users"),
    searchParams,
  ]);

  const { page, search, pageSize } = resolvedParams;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        <CreateUserButton />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <SearchInput />
        </div>
      </div>

      <Suspense fallback={<DataTableSkeleton showPagination={true} />}>
        <UserList
          page={Number(page) || 1}
          pageSize={Number(pageSize) || 10}
          search={search}
        />
      </Suspense>
    </div>
  );
}
