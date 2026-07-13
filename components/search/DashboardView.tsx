"use client";

import { Users, Box, LayoutDashboard, Activity, CheckCircle2 } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

export function DashboardView() {
  return (
    <div className="w-full max-w-6xl mx-auto pb-12 animate-in fade-in duration-500">
      <div className="mb-8 flex items-center">
        <LayoutDashboard className="w-8 h-8 text-blue-600 mr-3" />
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard
          </h1>
          <p className="text-slate-500 mt-2">
            ภาพรวมการใช้งานระบบ Webdev AS400 และสถิติข้อมูล
          </p>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Active Users Today" 
          value="124" 
          icon={<Users className="w-5 h-5" />} 
          trend="up"
          trendValue="12%"
          description="vs last week"
        />
        <StatCard 
          title="Lots Inspected" 
          value="1,452" 
          icon={<Box className="w-5 h-5" />} 
          trend="up"
          trendValue="8.2%"
          description="vs last week"
        />
        <StatCard 
          title="Total API Requests" 
          value="8,921" 
          icon={<Activity className="w-5 h-5" />} 
          trend="neutral"
          trendValue="0%"
          description="vs last week"
        />
        <StatCard 
          title="System Status" 
          value="Online" 
          icon={<CheckCircle2 className="w-5 h-5" />} 
          description="All systems operational"
        />
      </div>
    </div>
  );
}
