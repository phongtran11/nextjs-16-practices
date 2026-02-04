import { PaginationInfo } from "@/components/common/pagination-info";
import { PaginationNavigation } from "@/components/common/pagination/pagination-navigation";
import { PaginationPageSize } from "@/components/common/pagination/pagination-page-size";
import { getUsersAction } from "@/modules/users/actions";

import { UsersTable } from "./users-table";

interface UserListProps {
  page: number;
  pageSize: number;
  search?: string;
}

export async function UserList({ page, pageSize, search }: UserListProps) {
  const {
    data,
    total,
    pageSize: currentPageSize,
  } = await getUsersAction(page, pageSize, search);

  return (
    <div className="space-y-4">
      <UsersTable data={data} />
      <div className="flex flex-col items-center gap-4 py-4 xl:flex-row xl:justify-between">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
          <PaginationInfo
            total={total}
            page={page}
            pageSize={currentPageSize}
          />
          <PaginationPageSize pageSize={currentPageSize} />
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
          <PaginationNavigation
            page={page}
            total={total}
            pageSize={currentPageSize}
          />
        </div>
      </div>
    </div>
  );
}
