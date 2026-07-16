"use client";

import { Users, Box, LayoutDashboard, Activity, CheckCircle2 } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { formatIWSDate } from "@/lib/utils";

export function DashboardView() {
  const { operator } = useAuth();
  const router = useRouter();

  // Current real-time display (or use formatIWSDate logic if needed, here just basic JS date)
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <div className="w-full max-w-6xl mx-auto pb-12 animate-in fade-in duration-500">
      
      {/* Welcome Banner */}
      <div className="bg-white rounded-sm p-6 mb-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t-4 border-t-blue-600">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            Welcome back, {operator ? operator.name : "Guest"}
          </h1>
          <p className="text-slate-500 mt-2">
            ภาพรวมการใช้งานระบบ Webdev AS400 • {today}
          </p>
        </div>
        {operator && (
          <div className="bg-slate-50 px-4 py-2 rounded-sm border border-slate-200 flex items-center gap-3">
            <span className="w-10 h-10 rounded-sm bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
              {operator.name.charAt(0)}
            </span>
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">OP Code</p>
              <p className="text-lg font-bold text-slate-800">{operator.empId}</p>
            </div>
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Modules</h2>
      
      {/* Module Launcher Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div 
          onClick={() => router.push("/?tab=minpop")}
          className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm hover:border-blue-600 transition-colors cursor-pointer group flex flex-col"
        >
          <div className="w-12 h-12 bg-slate-100 rounded-sm flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
            <Users className="w-6 h-6 text-slate-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">Operator Code</h3>
          <p className="text-sm text-slate-500">
            ค้นหาข้อมูลพนักงาน รหัส OP Code ตรวจสอบข้อมูลเบื้องต้น
          </p>
        </div>

        <div 
          onClick={() => router.push("/?tab=talinf")}
          className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm hover:border-blue-600 transition-colors cursor-pointer group flex flex-col"
        >
          <div className="w-12 h-12 bg-slate-100 rounded-sm flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
            <Box className="w-6 h-6 text-slate-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">Lot Information</h3>
          <p className="text-sm text-slate-500">
            ค้นหา Assembly Lot Information, Device Code และ Process WIP Code
          </p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4">System Overview</h2>

      {/* Top Stats Row (Mock Data) */}
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
