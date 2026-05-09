import { useState } from 'react';
import { Outlet } from 'react-router';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { MobilePlayer } from '../components/MobilePlayer';

export function PublicLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-500/30 pb-16 lg:pb-0">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="max-w-6xl mx-auto px-4 py-6 min-h-[calc(100vh-200px)]">
        <Outlet />
      </main>

      <Footer />
      <MobilePlayer />
    </div>
  );
}

