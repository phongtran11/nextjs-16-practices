import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableSkeletonProps {
  /**
   * Number of rows to display in the skeleton
   * @default 5
   */
  rowCount?: number;
  /**
   * Number of columns to display in the skeleton
   * @default 4
   */
  columnCount?: number;
  /**
   * Whether to show the table header
   * @default true
   */
  showHeaders?: boolean;
  /**
   * Whether to show the pagination skeleton
   * @default false
   */
  showPagination?: boolean;
}

export function DataTableSkeleton({
  rowCount = 5,
  columnCount = 4,
  showHeaders = true,
  showPagination = false,
}: DataTableSkeletonProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          {showHeaders && (
            <TableHeader>
              <TableRow>
                {Array.from({ length: columnCount }).map((_, i) => (
                  <TableHead key={i}>
                    <Skeleton className="h-4 w-full" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
          )}
          <TableBody>
            {Array.from({ length: rowCount }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: columnCount }).map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-8 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {showPagination && (
        <div className="flex flex-col items-center gap-4 py-4 xl:flex-row xl:justify-between">
          {/* Pagination Info & Page Size */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-8 w-16" />
          </div>
          {/* Pagination Navigation */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
