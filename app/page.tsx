import Link from "next/link";
import { Users, Box, ArrowRight, LayoutDashboard } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="w-full max-w-5xl mx-auto h-[calc(100vh-8rem)]">
      <div className="mb-8 flex items-center">
        <LayoutDashboard className="w-8 h-8 text-blue-600 mr-3" />
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome to Webdev AS400
          </h1>
          <p className="text-slate-500 mt-2">
            ระบบค้นหาข้อมูลและตรวจสอบสถานะการผลิตจาก AS400
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Minpop Module */}
        <Link href="/minpop" className="group">
          <Card className="p-8 h-full bg-white border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-blue-600 transition-colors">
                <Users className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">Operator Code</h2>
              <p className="text-slate-600 flex-grow mb-6 leading-relaxed">
                ค้นหาข้อมูลพนักงาน (Operator) ในระบบการผลิต ตรวจสอบรหัส กะ และรายละเอียดอื่นๆ ผ่าน Employee ID
              </p>
              <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                เข้าสู่ระบบค้นหาพนักงาน <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </Card>
        </Link>

        {/* Talinf Module */}
        <Link href="/talinf" className="group">
          <Card className="p-8 h-full bg-white border-slate-200 hover:border-indigo-400 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-indigo-600 transition-colors">
                <Box className="w-7 h-7 text-indigo-600 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">Talinf (Assembly Lot)</h2>
              <p className="text-slate-600 flex-grow mb-6 leading-relaxed">
                ค้นหาและตรวจสอบรายละเอียด Lot สินค้า (Assembly Lot No.) รหัสอุปกรณ์ และจำนวน QTY ในกระบวนการผลิต
              </p>
              <div className="flex items-center text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform">
                เข้าสู่ระบบค้นหา Lot <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
