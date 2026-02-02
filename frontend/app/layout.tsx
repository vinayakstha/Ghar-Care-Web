import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <section>
            <main>{children}</main>
          </section>
        </body>
      </AuthProvider>
    </html>
  );
}
