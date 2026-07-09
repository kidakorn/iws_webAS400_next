"use client";

import { Card } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon: ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export function StatCard({ title, value, description, icon, trend, trendValue }: StatCardProps) {
  return (
    <Card className="p-6 bg-white border-slate-200 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-colors">
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
          {icon}
        </div>
      </div>
      
      {(description || trendValue) && (
        <div className="flex items-center text-sm relative z-10 mt-4 pt-4 border-t border-slate-100">
          {trendValue && (
            <span
              className={cn(
                "font-medium mr-2",
                trend === "up" ? "text-emerald-600" : trend === "down" ? "text-rose-600" : "text-slate-600"
              )}
            >
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "−"} {trendValue}
            </span>
          )}
          {description && <span className="text-slate-500">{description}</span>}
        </div>
      )}
      
      {/* Decorative background element */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-slate-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500 z-0"></div>
    </Card>
  );
}
