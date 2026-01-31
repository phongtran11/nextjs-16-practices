"use client";

import { Loader2 } from "lucide-react";

import { Button, ButtonProps } from "@/components/ui/button";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

export function LoadingButton({
  loading,
  children,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button disabled={loading || disabled} {...props}>
      {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
      {children}
    </Button>
  );
}
