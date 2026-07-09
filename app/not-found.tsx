import Link from "next/link";
import { FileQuestion, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center px-4">
      <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
        <FileQuestion className="w-12 h-12 text-slate-400" />
      </div>
      <h2 className="text-3xl font-bold text-slate-800 mb-2">404 - ไม่พบหน้าที่ต้องการ</h2>
      <p className="text-slate-500 max-w-md mb-8">
        ขออภัยครับ หน้าเว็บที่คุณพยายามเข้าถึงไม่มีอยู่ในระบบ หรืออาจถูกย้ายไปแล้ว
      </p>
      <Link 
        href="/"
        className="inline-flex items-center px-6 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm"
      >
        <Home className="w-5 h-5 mr-2" />
        กลับสู่หน้าหลัก
      </Link>
    </div>
  );
}
