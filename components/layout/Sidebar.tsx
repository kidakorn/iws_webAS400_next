"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Users, Box, Database, BookOpen, LayoutDashboard, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/providers/AuthProvider";
import { showQRDialog } from "@/components/QrCodeDialog";

interface SidebarProps {
  collapsed: boolean;
}

export function Sidebar({ collapsed }: SidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "dashboard";
  const { operator, login, logout, isLoading } = useAuth();
  const [loginInput, setLoginInput] = useState("");

  return (
    <aside
      className={cn(
        "bg-white flex flex-col flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out border-r border-slate-200",
        collapsed ? "w-[5rem]" : "w-64"
      )}
    >
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-slate-200 shrink-0">
        <Database className="w-8 h-8 text-blue-600 mr-3 shrink-0" />
        <span
          className={cn(
            "font-bold text-slate-900 text-lg tracking-wide whitespace-nowrap transition-opacity duration-300",
            collapsed ? "opacity-0 hidden" : "opacity-100"
          )}
        >
          Webdev AS400
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link
          href="/?tab=dashboard"
          prefetch={false}
          className={cn(
            "flex items-center px-3 py-2.5 rounded-sm font-medium transition-all group border-l-4",
            currentTab === "dashboard"
              ? "bg-slate-50 text-blue-700 border-l-blue-600"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-transparent",
            collapsed && "justify-center px-0"
          )}
          title="Dashboard"
        >
          <LayoutDashboard
            className={cn(
              "w-5 h-5 shrink-0 transition-colors",
              !collapsed && "mr-3",
              currentTab === "dashboard"
                ? "text-blue-600"
                : "text-slate-400 group-hover:text-slate-600"
            )}
          />
          {!collapsed && <span>Dashboard</span>}
        </Link>

        <Link
          href="/?tab=minpop"
          prefetch={false}
          className={cn(
            "flex items-center px-3 py-2.5 rounded-sm font-medium transition-all group border-l-4",
            currentTab === "minpop"
              ? "bg-slate-50 text-blue-700 border-l-blue-600"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-transparent",
            collapsed && "justify-center px-0"
          )}
          title="Operator Code"
        >
          <Users
            className={cn(
              "w-5 h-5 shrink-0 transition-colors",
              !collapsed && "mr-3",
              currentTab === "minpop"
                ? "text-blue-600"
                : "text-slate-400 group-hover:text-slate-600"
            )}
          />
          {!collapsed && <span>Operator Code</span>}
        </Link>

        <Link
          href="/?tab=talinf"
          prefetch={false}
          className={cn(
            "flex items-center px-3 py-2.5 rounded-sm font-medium transition-all group border-l-4",
            currentTab === "talinf"
              ? "bg-slate-50 text-blue-700 border-l-blue-600"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-transparent",
            collapsed && "justify-center px-0"
          )}
          title="Lot Information"
        >
          <Box
            className={cn(
              "w-5 h-5 shrink-0 transition-colors",
              !collapsed && "mr-3",
              currentTab === "talinf"
                ? "text-blue-600"
                : "text-slate-400 group-hover:text-slate-600"
            )}
          />
          {!collapsed && <span>Lot Information</span>}
        </Link>
        {process.env.NODE_ENV !== 'production' && (
          <Link
            href="/docs"
            className={cn(
              "flex items-center px-3 py-2.5 rounded-md font-medium transition-colors group",
              pathname.startsWith("/docs")
                ? "bg-blue-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              collapsed && "justify-center px-0"
            )}
            title="Developer Docs"
          >
            <BookOpen
              className={cn(
                "w-5 h-5 shrink-0 transition-colors",
                !collapsed && "mr-3",
                pathname.startsWith("/docs")
                  ? "text-blue-600"
                  : "text-slate-400 group-hover:text-slate-600"
              )}
            />
            {!collapsed && <span>Developer Docs</span>}
          </Link>
        )}
      </nav>

      {/* Auth Area */}
      <div className="mt-auto border-t border-slate-200 bg-slate-50">
        {!collapsed ? (
          <div className="p-4">
            {operator ? (
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-2 text-sm text-slate-700">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold shrink-0">
                    {operator.name.charAt(0)}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-semibold truncate">{operator.name}</span>
                    <span className="text-xs text-slate-500">ID: {operator.empId}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      showQRDialog(
                        { empid: operator.empId, name: operator.name },
                        "My Operator QR",
                        `OP Code: ${operator.empId}`,
                        () => {} // no-op for details
                      );
                    }}
                    className="flex-1 flex items-center justify-center text-sm py-1.5 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-sm transition-colors font-medium border border-blue-200"
                    title="My QR Code"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    My QR
                  </button>
                  <button
                    onClick={logout}
                    className="flex-1 text-center text-sm py-1.5 text-red-600 hover:bg-red-50 rounded-sm transition-colors font-medium border border-transparent hover:border-red-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  login(loginInput);
                }}
                className="flex flex-col space-y-2"
              >
                <div className="relative">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Operator Login
                  </label>
                  <input
                    type="text"
                    placeholder="OP Code (e.g. 25066)"
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    className="w-full pl-3 pr-3 py-2 mt-1 bg-white border border-slate-200 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading || !loginInput.trim()}
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-2 px-4 rounded-sm transition-colors disabled:opacity-50 text-sm"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </form>
            )}
          </div>
        ) : (
          <div className="py-4 flex justify-center">
            {operator ? (
              <div 
                className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all"
                title={`Logged in as ${operator.name}. Click to logout.`}
                onClick={logout}
              >
                {operator.name.charAt(0)}
              </div>
            ) : (
              <div 
                className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer hover:bg-blue-100 hover:text-blue-600 transition-all"
                title="Expand to Login"
              >
                <Users className="w-4 h-4" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Area */}
      <div className="p-4 border-t border-slate-200 shrink-0">
        <div className={cn("text-xs text-slate-400 text-center", collapsed && "hidden")}>
          v2.0.0 (Next.js)
        </div>
      </div>
    </aside>
  );
}
