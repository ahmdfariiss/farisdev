import Sidebar from '@/components/layout/Sidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Sidebar />
      {/* Main content area — offset for sidebar on desktop, top bar on mobile */}
      <main className="lg:ml-[240px] pt-14 lg:pt-0 min-h-screen relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
