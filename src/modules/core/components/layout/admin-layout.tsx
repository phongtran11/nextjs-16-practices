import { Header } from "./header";
import { Sidebar } from "./sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-sidebar">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <Header />
        {children}
      </main>
    </div>
  );
}
