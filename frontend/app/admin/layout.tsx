import Sidebar from "./_components/Sidebar"; // <-- import your custom Sidebar

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex h-screen overflow-hidden">
      {/* Sidebar: non-scrollable */}
      <Sidebar />

      {/* Main content: scrollable */}
      <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">{children}</main>
    </section>
  );
}
