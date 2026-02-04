import { redirect } from "@/i18n/routing";
import { getAuthSession } from "@/lib/auth-util";
import AdminLayout from "@/modules/core/components/layout/admin-layout";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const [{ locale }, session] = await Promise.all([params, getAuthSession()]);

  if (!session) {
    redirect({ href: "/admin/login", locale });
  }

  return <AdminLayout>{children}</AdminLayout>;
}
