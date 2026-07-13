"use client";

import { Suspense } from "react";
import { SearchTabs } from "@/components/search/SearchTabs";

export default function Home() {
  return (
    <div className="w-full max-w-6xl mx-auto pb-12 animate-in fade-in duration-500">
      <Suspense fallback={<div className="flex justify-center p-12 text-slate-500">Loading views...</div>}>
        <SearchTabs />
      </Suspense>
    </div>
  );
}
