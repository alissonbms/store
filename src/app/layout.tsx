import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/header";
import { ThemeProvider } from "@/providers/theme-provider";
import { AuthProvider } from "@/providers/auth";
import Footer from "@/components/ui/footer";
import { CartProvider } from "@/providers/cart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="flex h-full flex-col">
          <ThemeProvider attribute="class" defaultTheme="dark">
            <AuthProvider>
              <CartProvider>
                <Header />
                <div className="flex-1">{children}</div>
                <Footer />
              </CartProvider>
            </AuthProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
