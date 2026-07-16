"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MinpopView } from "./MinpopView";
import { TalinfView } from "./TalinfView";
import { DashboardView } from "./DashboardView";

export function SearchTabs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const currentTab = searchParams.get("tab") || "dashboard";

  const handleTabChange = (value: string) => {
    // Preserve other search params if any, but update 'tab'
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.replace(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full">
      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="minpop">Operator Code (Minpop)</TabsTrigger>
          <TabsTrigger value="talinf">Lot Information (Talinf)</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="mt-0">
          <DashboardView />
        </TabsContent>
        <TabsContent value="minpop" className="mt-0">
          <MinpopView />
        </TabsContent>
        <TabsContent value="talinf" className="mt-0">
          <TalinfView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
