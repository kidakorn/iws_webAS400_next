"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  description?: string;
}

export function StatCard({ title, value, icon, trend, trendValue, description }: StatCardProps) {
  return (
    <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between border-t-4 border-t-slate-800">
      <div className="flex justify-between items-start mb-4">
        <div className="text-slate-500 font-medium text-sm z-10">{title}</div>
        <div className="w-10 h-10 bg-slate-50 rounded-sm flex items-center justify-center text-slate-700 z-10 border border-slate-100">
          {icon}
        </div>
      </div>
      <div className="z-10">
        <h3 className="text-2xl font-bold text-slate-800 mb-1">{value}</h3>
        
        {(trend || description) && (
          <div className="flex items-center text-sm">
            {trend && (
              <span className={cn(
                "flex items-center font-medium mr-2",
                trend === "up" ? "text-emerald-600" : 
                trend === "down" ? "text-rose-600" : "text-slate-500"
              )}>
                {trend === "up" && <TrendingUp className="w-3 h-3 mr-1" />}
                {trend === "down" && <TrendingDown className="w-3 h-3 mr-1" />}
                {trend === "neutral" && <Minus className="w-3 h-3 mr-1" />}
                {trendValue}
              </span>
            )}
            {description && <span className="text-slate-400 text-xs">{description}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
