import "./globals.css";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <section>
          <main>{children}</main>
        </section>
      </body>
    </html>
  );
}
