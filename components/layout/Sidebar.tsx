"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Users, Box, Database, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/providers/AuthProvider";

interface SidebarProps {
  collapsed: boolean;
}

export function Sidebar({ collapsed }: SidebarProps) {
  const pathname = usePathname();
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
          href="/minpop"
          prefetch={false}
          className={cn(
            "flex items-center px-3 py-2.5 rounded-md font-medium transition-colors group",
            pathname.startsWith("/minpop") || pathname === "/"
              ? "bg-blue-50 text-blue-700"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
            collapsed && "justify-center px-0"
          )}
          title="Operator Code"
        >
          <Users
            className={cn(
              "w-5 h-5 shrink-0 transition-colors",
              !collapsed && "mr-3",
              pathname.startsWith("/minpop") || pathname === "/"
                ? "text-blue-600"
                : "text-slate-400 group-hover:text-slate-600"
            )}
          />
          {!collapsed && <span>Operator Code</span>}
        </Link>

        <Link
          href="/talinf"
          prefetch={false}
          className={cn(
            "flex items-center px-3 py-2.5 rounded-md font-medium transition-colors group",
            pathname.startsWith("/talinf")
              ? "bg-blue-50 text-blue-700"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
            collapsed && "justify-center px-0"
          )}
          title="Talinf"
        >
          <Box
            className={cn(
              "w-5 h-5 shrink-0 transition-colors",
              !collapsed && "mr-3",
              pathname.startsWith("/talinf")
                ? "text-blue-600"
                : "text-slate-400 group-hover:text-slate-600"
            )}
          />
          {!collapsed && <span>Talinf</span>}
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
                <button
                  onClick={logout}
                  className="w-full text-center text-sm py-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium border border-transparent hover:border-red-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  login(loginInput);
                }}
                className="flex flex-col space-y-2"
              >
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Operator Login
                </label>
                <input
                  type="text"
                  placeholder="OP Code"
                  className="w-full text-sm px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white text-sm py-2 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
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
