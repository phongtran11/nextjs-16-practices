"use client";

import { useTranslations } from "next-intl";

import { LogOut, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "@/i18n/routing";
import { authClient } from "@/lib/auth-client";
import type { Session } from "@/lib/auth-types";

interface UserButtonProps {
  readonly session: Session | null;
}

export function UserButton({ session: initialSession }: UserButtonProps) {
  const router = useRouter();
  const t = useTranslations("Header");
  const { data } = authClient.useSession();
  const activeSession = data || initialSession;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  if (!activeSession) {
    return <Button onClick={() => router.push("/login")}>{t("signIn")}</Button>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={activeSession.user.image || ""}
              alt={activeSession.user.name}
            />
            <AvatarFallback>
              {activeSession.user.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {activeSession.user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {activeSession.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>{t("profile")}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t("signOut")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
