// App.tsx
import { Routes, Route } from 'react-router-dom';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Contact } from './components/Contact';
import About from './components/About';
import BlogPage from './pages/BlogPage';
import BlogDetailsPage from './pages/BlogDetailsPage'; // wrapper for BlogDetail

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />

      <main className="relative z-10">
        <Routes>
          {/* Home Page */}
          <Route
            path="*"
            element={
              <>
                <Hero />
                {/* <Projects /> */}
                {/* <Blogs /> */}
                <About />
                <Contact />
              </>
            }
          />

          {/* Blog List Page */}
          <Route path="/blog" element={<BlogPage />} />

          {/* Blog Detail Page */}
          <Route path="/blog/:id" element={<BlogDetailsPage />} />

          {/* Fallback */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center text-gray-300">
                <h1 className="text-3xl font-bold">Page Not Found</h1>
              </div>
            }
          />
        </Routes>
      </main>

      <footer className="relative z-10 bg-gray-900/50 backdrop-blur-sm border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Portfolio. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
