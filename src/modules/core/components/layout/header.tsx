import LocaleSwitcher from "@/components/common/locale-switcher";
import { getAuthSession } from "@/lib/auth-util";
import { UserButton } from "@/modules/auth/components/user-button";

import { MobileSidebar } from "./sidebar";

export async function Header() {
  const session = await getAuthSession();

  return (
    <div className="flex items-center p-4 border-b">
      <MobileSidebar />
      <div className="flex w-full justify-end items-center gap-4">
        <LocaleSwitcher />
        <UserButton session={session} />
      </div>
    </div>
  );
}
