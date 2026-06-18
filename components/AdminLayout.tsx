import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-aura-black"></div>
      </div>
    );
  }

  if (!session || (session.user as any).role !== "admin") {
    router.push("/");
    return null;
  }

  return (
    <div className="min-h-screen flex bg-aura-gray-light">
      {/* Sidebar */}
      <aside className="w-64 bg-aura-black text-white flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-luxury uppercase text-center mb-10">
            Aura Admin
          </h1>
          <nav className="space-y-2">
            <AdminNavLink href="/admin" label="Tổng quan" icon="📊" active={router.pathname === "/admin"} />
            <AdminNavLink href="/admin/products" label="Quản lý sản phẩm" icon="📦" active={router.pathname === "/admin/products"} />
            <AdminNavLink href="/admin/orders" label="Quản lý đơn hàng" icon="📜" active={router.pathname === "/admin/orders"} />
            <AdminNavLink href="/admin/users" label="Quản lý người dùng" icon="👥" active={router.pathname === "/admin/users"} />
            <AdminNavLink href="/admin/settings" label="Cài đặt" icon="⚙️" active={router.pathname === "/admin/settings"} />
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-white/10">
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-2 py-3 text-[10px] font-bold uppercase tracking-widest bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all rounded-lg"
          >
            <span>Đăng xuất</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H18" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-grow flex flex-col">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-aura-gray-medium flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-[10px] font-bold uppercase tracking-widest text-aura-gray-dark hover:text-aura-black transition-colors flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Quay lại trang web
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-widest text-aura-black">{session.user?.name}</p>
              <p className="text-[9px] uppercase tracking-widest text-aura-gray-dark">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-aura-black text-white flex items-center justify-center font-bold uppercase text-xs">
              {session.user?.name?.[0] || "A"}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8 md:p-12 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

const AdminNavLink = ({ href, label, icon, active }: { href: string; label: string; icon: string; active: boolean }) => (
  <Link 
    href={href} 
    className={`flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-all rounded-lg ${active ? "bg-white text-aura-black shadow-sm" : "text-aura-gray-medium hover:bg-white/5 hover:text-white"}`}
  >
    <span className="text-sm">{icon}</span>
    {label}
  </Link>
);
