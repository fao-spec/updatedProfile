import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // If we’re not on the homepage, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 text-2xl font-bold text-violet-400 hover:text-violet-300 transition-colors"
          >
            <Code2 className="animate-pulse" />
            codeWithFave
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/projects"
              className="text-gray-300 hover:text-violet-400 transition-all duration-300 font-medium hover:scale-110"
            >
              Projects
            </Link>

            <Link
              to="/blogs"
              className="text-gray-300 hover:text-violet-400 transition-all duration-300 font-medium hover:scale-110"
            >
              Blog
            </Link>

            <button
            onClick={() => scrollToSection('about')}
            className="block w-full text-left text-gray-300 hover:text-violet-400 transition-colors py-2"
          >
            About Me
          </button>

          <button
            onClick={() => scrollToSection('experience')}
            className="block w-full text-left text-gray-300 hover:text-violet-400 transition-colors py-2"
          >
            Experience
          </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-300 hover:text-violet-400 transition-all duration-300 font-medium hover:scale-110"
            >
              Contact
            </button>
          </div>


          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-violet-400 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-gray-900/95 backdrop-blur-md px-6 py-4 space-y-4">
          <Link
            to="/projects"
            className="block w-full text-left text-gray-300 hover:text-violet-400 transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            Projects
          </Link>

          {/* BLOG link in mobile dropdown */}
          <Link
            to="/blogs"
            className="block w-full text-left text-gray-300 hover:text-violet-400 transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            Blogs
          </Link>

          <button
            onClick={() => scrollToSection('about')}
            className="block w-full text-left text-gray-300 hover:text-violet-400 transition-colors py-2"
          >
            About Me
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="block w-full text-left text-gray-300 hover:text-violet-400 transition-colors py-2"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};
