import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppShell } from "@/components/layout/AppShell";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Webdev AS400 | Data Portal",
  description: "ระบบค้นหาข้อมูลพนักงาน (Operator Code) และ Assembly Lot จากฐานข้อมูล AS400 สำหรับสายการผลิต",
  keywords: ["AS400", "Operator", "Assembly Lot", "Manufacturing", "Search", "Webdev"],
  authors: [{ name: "Webdev AS400 Team" }],
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <TooltipProvider>
            <NuqsAdapter>
              <AppShell>{children}</AppShell>
            </NuqsAdapter>
            <Toaster position="bottom-right" richColors />
          </TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
