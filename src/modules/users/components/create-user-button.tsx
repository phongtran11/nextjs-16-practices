"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { UserDialog } from "./user-dialog";

export function CreateUserButton() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Users");

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        {t("create")}
      </Button>
      <UserDialog
        open={open}
        onOpenChange={setOpen}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
