import { redirect } from "@/i18n/routing";
import { getAuthSession } from "@/lib/auth-util";
import { LoginForm } from "@/modules/auth";

export default async function AdminLoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [{ locale }, session] = await Promise.all([params, getAuthSession()]);

  if (session) {
    redirect({ href: "/admin/dashboard", locale });
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm redirectTo="/admin/dashboard" />
    </div>
  );
}
