"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { AlertOctagon, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center px-4">
      <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
        <AlertOctagon className="w-12 h-12 text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-3">เกิดข้อผิดพลาดบางอย่าง</h2>
      <p className="text-slate-500 max-w-md mb-8">
        ระบบพบปัญหาที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง หากปัญหายังคงอยู่ โปรดติดต่อผู้ดูแลระบบ
      </p>
      <Button 
        onClick={() => reset()}
        className="inline-flex items-center px-6 py-3 bg-slate-900 text-white hover:bg-slate-800 transition-colors"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        ลองใหม่อีกครั้ง
      </Button>
    </div>
  );
}
