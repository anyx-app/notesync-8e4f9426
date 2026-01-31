import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/search" element={<div className="text-slate-400 p-10">Search Interface (Coming Soon)</div>} />
        <Route path="/favorites" element={<div className="text-slate-400 p-10">Favorites (Coming Soon)</div>} />
        <Route path="/folder/:folderId" element={<div className="text-slate-400 p-10">Folder View (Coming Soon)</div>} />
        <Route path="/trash" element={<div className="text-slate-400 p-10">Trash (Coming Soon)</div>} />
        <Route path="/settings" element={<div className="text-slate-400 p-10">Settings (Coming Soon)</div>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
