"use client";

import { useFormatter, useTranslations } from "next-intl";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { UserActions } from "./user-actions";

interface User {
  id: number;
  name: string;
  email: string;
  image: string | null;
  deletedAt: Date | null;
  createdAt: Date;
}

interface UsersTableProps {
  data: User[];
}

export function UsersTable({ data }: UsersTableProps) {
  const format = useFormatter();
  const t = useTranslations("Users.table");

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("user")}</TableHead>
            <TableHead>{t("status")}</TableHead>
            <TableHead>{t("createdAt")}</TableHead>
            <TableHead className="text-right">{t("actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow
              key={user.id}
              className={user.deletedAt ? "opacity-50" : ""}
            >
              <TableCell className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.image || ""} alt={user.name} />
                  <AvatarFallback>
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {user.deletedAt ? (
                  <Badge variant="destructive">{t("deleted")}</Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="bg-success/10 text-success border-success/20"
                  >
                    {t("active")}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {format.dateTime(user.createdAt, { dateStyle: "medium" })}
              </TableCell>
              <TableCell className="text-right">
                <UserActions user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
