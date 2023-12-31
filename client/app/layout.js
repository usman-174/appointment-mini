import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import ToastContainerWrapper from "@/components/ToastWrapper";
import { Suspense } from "react";
import Loading from "./loading";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });
import { dark } from '@clerk/themes';
export const metadata = {
  title: "AppointmendHub",
  description: "Book you Appointment for a better future",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider  
    appearance={{
      baseTheme: dark
    }}>
      <html lang="en" className="bg-white">
        <body className={inter.className + " "}>
          <Navbar />
          <div className="pt-20">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>
          <ToastContainerWrapper />
        </body>
      </html>
    </ClerkProvider>
  );
}
