import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { AnimatedBackground } from "./AnimatedBackground";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      

      <main className="relative z-10">{children}</main>

      {/* <footer className="relative z-10 bg-gray-900/50 backdrop-blur-sm border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Portfolio. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer> */}
    </div>
  );
};
