"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Box, Database, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
}

export function Sidebar({ collapsed }: SidebarProps) {
  const pathname = usePathname();

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

      {/* Footer Area */}
      <div className="p-4 border-t border-slate-200">
        <div className={cn("text-xs text-slate-400", collapsed && "hidden")}>
          v2.0.0 (Next.js)
        </div>
      </div>
    </aside>
  );
}
