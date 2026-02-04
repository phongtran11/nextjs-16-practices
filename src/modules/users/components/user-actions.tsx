"use client";

import { useState, useTransition } from "react";

import { useTranslations } from "next-intl";

import { MoreHorizontal, Pencil, RotateCcw, Trash } from "lucide-react";

import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { deleteUserAction, restoreUserAction } from "../actions";
import { UserDialog } from "./user-dialog";

interface User {
  id: number;
  name: string;
  email: string;
  image: string | null;
  deletedAt: Date | null;
  createdAt: Date;
}

interface UserActionsProps {
  user: User;
}

export function UserActions({ user }: Readonly<UserActionsProps>) {
  const t = useTranslations("Common.Actions");
  const tUsers = useTranslations("Users.actions");
  const [, startTransition] = useTransition();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const isDeleted = !!user.deletedAt;

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const onConfirmDelete = async () => {
    await deleteUserAction(user.id);
  };

  const handleRestore = () => {
    startTransition(async () => {
      await restoreUserAction(user.id);
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">{t("openMenu")}</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t("title")}</DropdownMenuLabel>

          {!isDeleted && (
            <>
              <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                {t("edit")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-destructive focus:text-destructive"
                variant="destructive"
              >
                <Trash className="mr-2 h-4 w-4" />
                {t("delete")}
              </DropdownMenuItem>
            </>
          )}

          {isDeleted && (
            <DropdownMenuItem onClick={handleRestore}>
              <RotateCcw className="mr-2 h-4 w-4" />
              {t("restore")}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <UserDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        user={user}
        onClose={() => setShowEditDialog(false)}
      />

      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title={t("confirm")}
        description={tUsers("confirmDelete")}
        onConfirm={onConfirmDelete}
        variant="destructive"
        confirmText={t("delete")}
        cancelText={t("cancel")}
      />
    </>
  );
}
