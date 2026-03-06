import { redirect } from "next/navigation";
import { adminService } from "@/modules/auth/admin-service";
import { getServerSession } from "@/modules/auth/session";
import SignOutButton from "@/modules/auth/ui/sign-out-button";

export const dynamic = "force-dynamic";

export default async function AdminProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/admin/login");
  }

  const isAdmin = await adminService.assertAdmin(session.user.email);

  if (!isAdmin) {
    redirect("/admin/login?error=forbidden");
  }

  return (
    <main className="min-h-screen bg-zinc-100 text-zinc-900">
      <header className="sticky top-0 z-30 border-b border-zinc-300 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">Timur Portfolio</p>
            <h1 className="text-sm font-semibold uppercase tracking-[0.18em]">Carousel Admin</h1>
          </div>
          <SignOutButton />
        </div>
      </header>
      <div className="mx-auto w-full max-w-6xl px-4 py-8">{children}</div>
    </main>
  );
}
