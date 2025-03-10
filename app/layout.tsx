import QueryProvider from "@/app/providers/QueryProvider";
import "@/app/styles/globals.css";
import Link from "next/link";
import Sidebar from "@/app/components/Sidebar";
import Navbar from "@/app/components/Navbar";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <QueryProvider>
        <body className="flex">
          <Sidebar />
          <div className="flex-1">
            <Navbar />
            <main>{children}</main>
          </div>
        </body>
      </QueryProvider>
    </html>
  );
}
