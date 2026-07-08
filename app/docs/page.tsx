import { BookOpen, Code, FileJson, FolderTree, Terminal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DocsPage() {
  return (
    <div className="w-full max-w-5xl mx-auto h-[calc(100vh-8rem)]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center">
          <BookOpen className="mr-3 w-6 h-6 text-blue-600" />
          Developer Documentation
        </h1>
        <p className="text-slate-500 mt-2 text-sm">
          คู่มือการพัฒนาและวิธีเพิ่ม API Endpoint ใหม่ สำหรับโปรเจกต์ Webdev AS400
        </p>
      </div>

      <ScrollArea className="h-full pr-4 pb-20">
        <div className="space-y-8">
          
          {/* Section 1: Architecture */}
          <section>
            <h2 className="text-lg font-semibold text-slate-800 flex items-center mb-4">
              <FolderTree className="w-5 h-5 mr-2 text-blue-500" />
              1. โครงสร้างโฟลเดอร์ (Architecture)
            </h2>
            <Card className="p-6 bg-white border-slate-200">
              <div className="space-y-4 text-sm text-slate-600">
                <p>โปรเจกต์นี้เขียนด้วย <strong>Next.js 15 (App Router)</strong> เน้นการแยกส่วนประกอบให้เป็นระเบียบ (Clean Architecture):</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li><code className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">app/</code> : หน้าจอ UI และ Routing แต่ละหน้า (เช่น /minpop, /talinf)</li>
                  <li><code className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">components/</code> : UI Components ที่ใช้ซ้ำได้ (SearchCard, DataTable, DetailDrawer)</li>
                  <li><code className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">hooks/</code> : จัดการ State (loading, data, error) และ Logic แยกออกจาก UI</li>
                  <li><code className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">lib/api/</code> : โค้ดสำหรับต่อ API (Fetch) และจัดการ Error</li>
                  <li><code className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">lib/validators/</code> : ฟังก์ชันเช็คความถูกต้องของ Input ก่อนยิง API</li>
                  <li><code className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">types/</code> : ประกาศ Interface ของ TypeScript สำหรับ Data Model</li>
                  <li><code className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">lib/constants.ts</code> : เก็บ URL ของ API และ Mock Data ไว้ที่เดียว</li>
                </ul>
              </div>
            </Card>
          </section>

          <Separator />

          {/* Section 2: How to Add New Endpoint */}
          <section>
            <h2 className="text-lg font-semibold text-slate-800 flex items-center mb-4">
              <Code className="w-5 h-5 mr-2 text-blue-500" />
              2. วิธีเพิ่มหน้าค้นหาใหม่ (Add New Endpoint)
            </h2>
            <Card className="p-6 bg-white border-slate-200">
              <p className="text-sm text-slate-600 mb-6">หากต้องการสร้างหน้าค้นหาใหม่ (สมมติชื่อว่า <strong>Inventory</strong>) ให้ทำตาม 5 ขั้นตอนดังนี้:</p>
              
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="border-l-2 border-blue-500 pl-4">
                  <h3 className="font-semibold text-slate-800 mb-2">Step 1: กำหนด Type ของข้อมูล</h3>
                  <p className="text-sm text-slate-500 mb-2">สร้างไฟล์ <code className="bg-slate-100 px-1 rounded text-slate-700">types/inventory.ts</code> เพื่อระบุโครงสร้างฟิลด์ที่จะรับกลับมาจาก API</p>
                  <pre className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-[13px] text-slate-800 overflow-x-auto">
                    <code>{`export interface InventoryRecord {
  ITEM_CODE: string;
  ITEM_NAME: string;
  STOCK: number;
}`}</code>
                  </pre>
                </div>

                {/* Step 2 */}
                <div className="border-l-2 border-blue-500 pl-4">
                  <h3 className="font-semibold text-slate-800 mb-2">Step 2: เพิ่ม Endpoint URL และ Mock Data</h3>
                  <p className="text-sm text-slate-500 mb-2">ไปที่ไฟล์ <code className="bg-slate-100 px-1 rounded text-slate-700">lib/constants.ts</code> เพิ่ม URL และเพิ่มข้อมูลจำลองสำหรับปุ่ม Mock Data</p>
                  <pre className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-[13px] text-slate-800 overflow-x-auto">
                    <code>{`export const IWS_CONFIG = {
  ENDPOINTS: {
    // ... ของเดิม
    INVENTORY: (code: string) => \`/inventory?item=\${code}\`,
  }
};
export const MOCK_INVENTORY_DATA: InventoryRecord[] = [...];`}</code>
                  </pre>
                </div>

                {/* Step 3 */}
                <div className="border-l-2 border-blue-500 pl-4">
                  <h3 className="font-semibold text-slate-800 mb-2">Step 3: เขียนฟังก์ชัน Fetch API</h3>
                  <p className="text-sm text-slate-500 mb-2">สร้างไฟล์ <code className="bg-slate-100 px-1 rounded text-slate-700">lib/api/inventory.ts</code></p>
                  <pre className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-[13px] text-slate-800 overflow-x-auto">
                    <code>{`import { apiRequest } from "./client";
import { IWS_CONFIG } from "../constants";

export async function fetchInventory(code: string) {
  const data = await apiRequest(IWS_CONFIG.ENDPOINTS.INVENTORY(code));
  return data.length === 0 ? [] : data;
}`}</code>
                  </pre>
                </div>

                {/* Step 4 */}
                <div className="border-l-2 border-blue-500 pl-4">
                  <h3 className="font-semibold text-slate-800 mb-2">Step 4: สร้าง Hook ไว้จัดการ Logic</h3>
                  <p className="text-sm text-slate-500 mb-2">สร้างไฟล์ <code className="bg-slate-100 px-1 rounded text-slate-700">hooks/useInventorySearch.ts</code> (Copy จาก useMinpopSearch มาแก้ชื่อ API และ Type ได้เลย)</p>
                </div>

                {/* Step 5 */}
                <div className="border-l-2 border-blue-500 pl-4">
                  <h3 className="font-semibold text-slate-800 mb-2">Step 5: นำไปแสดงผลบนหน้า UI</h3>
                  <p className="text-sm text-slate-500 mb-2">สร้างหน้าเพจ <code className="bg-slate-100 px-1 rounded text-slate-700">app/inventory/page.tsx</code> แล้วเรียกใช้ Component สำเร็จรูป (SearchCard, DataTable, DetailDrawer) โดยผูกกับ Hook จาก Step 4</p>
                </div>
              </div>
            </Card>
          </section>

          <Separator />

          {/* Section 3: API & Environment */}
          <section>
            <h2 className="text-lg font-semibold text-slate-800 flex items-center mb-4">
              <FileJson className="w-5 h-5 mr-2 text-blue-500" />
              3. การเปลี่ยน Base URL และการ Build
            </h2>
            <Card className="p-6 bg-white border-slate-200">
              <div className="space-y-4 text-sm text-slate-600">
                <p><strong>Environment Variable:</strong> หากต้องการเปลี่ยน URL หลักของ API Backend สามารถแก้ได้ที่ไฟล์ <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">.env.local</code> (ไม่ต้องแก้โค้ด)</p>
                <pre className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-[13px] text-slate-800">
                  <code>NEXT_PUBLIC_API_BASE_URL=/api/web/services</code>
                </pre>
                
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <p className="flex items-center text-slate-800 font-semibold mb-2">
                    <Terminal className="w-4 h-4 mr-2" />
                    การ Build สำหรับอัพขึ้นแชร์โฟลเดอร์ (Static Export)
                  </p>
                  <p className="mb-2">โปรเจกต์นี้ตั้งค่า <code className="text-blue-600">output: "export"</code> ไว้แล้ว เมื่อพร้อมนำไปใช้งานจริงให้รันคำสั่ง:</p>
                  <pre className="bg-slate-800 text-slate-50 p-3 rounded-lg text-[13px] font-mono">
                    <code>npm run build</code>
                  </pre>
                  <p className="mt-2">ไฟล์ทั้งหมดจะถูกสร้างอยู่ในโฟลเดอร์ <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-mono">out/</code> คุณสามารถ Copy ไฟล์ข้างในนี้ทั้งหมด ไปวางในโฟลเดอร์แชร์ของ Server AS400 ได้เลยครับ</p>
                </div>
              </div>
            </Card>
          </section>

        </div>
      </ScrollArea>
    </div>
  );
}
