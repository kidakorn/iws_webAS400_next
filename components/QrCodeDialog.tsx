"use client";

import Swal from "sweetalert2";
import { useEffect } from "react";
import { Eye } from "lucide-react";

// QrCodeDialog does not render traditional React modal, it uses SweetAlert2 directly
export function showQRDialog(
  data: Record<string, unknown>, 
  label: string,
  badgeText: string,
  onViewDetails: () => void
) {
  import("react-dom/client").then(({ createRoot }) => {
    import("react-qr-code").then(({ default: QRCode }) => {
      const container = document.createElement("div");
      container.className = "flex flex-col items-center justify-center p-4 bg-white";
      
      const handleViewDetails = () => {
        Swal.close();
        onViewDetails();
      };

      const root = createRoot(container);
      root.render(
        <div className="flex flex-col items-center w-full">
          <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
            <QRCode value={JSON.stringify(data)} size={160} />
          </div>
          <div className="mt-6 px-5 py-2 bg-slate-50 text-slate-700 text-[13px] font-semibold rounded-full border border-slate-200 shadow-sm tracking-wide">
            {badgeText}
          </div>
          <button 
            onClick={handleViewDetails}
            className="mt-6 w-full flex items-center justify-center py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold rounded-xl transition-all border border-blue-100 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </button>
        </div>
      );

      // Wait a tick for render
      setTimeout(() => {
        Swal.fire({
          title: label,
          html: container,
          width: 'auto',
          padding: '2rem',
          showCloseButton: true,
          showConfirmButton: false,
          buttonsStyling: false,
          customClass: {
            popup: 'rounded-2xl shadow-xl border border-slate-100',
            title: 'text-lg font-bold text-slate-800 pb-2',
            closeButton: 'focus:outline-none text-slate-400 hover:text-slate-600'
          }
        });
        
        // Clean up when SweetAlert closes
        const swalContainer = Swal.getPopup();
        if (swalContainer) {
          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.removedNodes) {
                mutation.removedNodes.forEach((node) => {
                  if (node === swalContainer) {
                    root.unmount();
                    observer.disconnect();
                  }
                });
              }
            });
          });
          observer.observe(document.body, { childList: true });
        }
      }, 100);
    });
  });
}
