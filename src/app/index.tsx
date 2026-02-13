import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { UsersPage } from '@/pages/users';
import { UserDetailPage } from '@/pages/user-detail';

export function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        <header className="sticky top-0 z-10 border-b border-surface-200/80 bg-white/90 backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
            <Link to="/" className="flex items-center gap-3 hover:opacity-90">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-indigo-500 text-white">
                <span className="font-display text-sm font-bold">U</span>
              </div>
              <span className="font-display text-lg font-semibold text-gray-800">
                User Dashboard
              </span>
            </Link>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Team 1</span>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                Free
              </span>
            </div>
          </div>
        </header>
        <main className="relative z-[1] mx-auto max-w-7xl px-4 py-8">
          <Routes>
            <Route path="/" element={<UsersPage />} />
            <Route path="/users/:id" element={<UserDetailPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
