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
  const { locale } = await params;
  const session = await getAuthSession();

  if (!session) {
    redirect({ href: "/login", locale });
  }

  return <AdminLayout>{children}</AdminLayout>;
}
