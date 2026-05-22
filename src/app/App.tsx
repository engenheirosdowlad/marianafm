import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import Home from './pages/Public/Home';
import AdminDashboard from './pages/Admin/Dashboard';
import News from './pages/Public/News';
import Schedule from './pages/Public/Schedule';
import Login from './pages/Public/Login';
import AdminTeam from './pages/Admin/Team';
import AdminNews from './pages/Admin/News';
import AdminBanners from './pages/Admin/Banners';
import AdminSchedule from './pages/Admin/Schedule';
import AdminSettings from './pages/Admin/Settings';
import AdminTop5 from './pages/Admin/Top5';
import { PlayerProvider } from './context/PlayerContext';

// Mock simpler versions of other pages for now
const MockPage = ({ title }: { title: string }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold text-white mb-4">{title}</h1>
    <p className="text-slate-400">Esta página está em desenvolvimento como parte do plano de implementação.</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <PlayerProvider>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="news" element={<News />} />
            <Route path="schedule" element={<Schedule />} />
          </Route>
          <Route path="login" element={<Login />} />

          {/* Admin Routes */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="schedule" element={<AdminSchedule />} />
            <Route path="news" element={<AdminNews />} />
            <Route path="banners" element={<AdminBanners />} />
            <Route path="team" element={<AdminTeam />} />
            <Route path="top5" element={<AdminTop5 />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PlayerProvider>
    </BrowserRouter>

  );
}