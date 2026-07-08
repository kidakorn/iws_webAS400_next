import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

interface DetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: Record<string, unknown> | null;
  title?: string;
}

export function DetailDrawer({ open, onOpenChange, data, title = "Item Details" }: DetailDrawerProps) {
  if (!data) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto bg-white border-l border-slate-200 shadow-2xl p-6 sm:p-8">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-xl font-bold text-slate-800">{title}</SheetTitle>
        </SheetHeader>
        <Separator className="mb-6" />
        
        <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <span className="text-[12px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">{key}</span>
                <span className="text-[15px] text-slate-800 font-medium leading-relaxed">
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
