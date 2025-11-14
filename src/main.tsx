import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import BlogDetail from './pages/BlogDetail.tsx';
import NotFound from './components/NotFound.tsx';
import './index.css';
import { SpeedInsights } from '@vercel/speed-insights/react'; // ✅ import it

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* ✅ Add SpeedInsights here so it runs globally */}
      <SpeedInsights />
      <footer className="relative z-10 bg-gray-900/50 backdrop-blur-sm border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Portfolio. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </BrowserRouter>
  </StrictMode>
);
