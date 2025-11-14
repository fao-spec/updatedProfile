import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from "react-router-dom";
import { OrbitSpinner } from '../components/LoadingScreen';

export const Hero = () => {
  const headingText = "Web Developer";
  const paragraphText =
    "Code with precision, built for performance.";

  const [visibleHeading, setVisibleHeading] = useState('');
  const [visibleParagraph, setVisibleParagraph] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulate a short loading spinner before typing starts
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Spinner shows for 1s
    return () => clearTimeout(timer);
  }, []);

  // Heading typing (with delay)
  useEffect(() => {
    if (!loading) {
      const delay = setTimeout(() => {
        let index = 0;
        const interval = setInterval(() => {
          if (index < headingText.length) {
            setVisibleHeading(headingText.slice(0, index + 1));
            index++;
          } else {
            clearInterval(interval);
          }
        }, 250);
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [loading]);

  // Paragraph typing
  useEffect(() => {
    if (visibleHeading === headingText) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < paragraphText.length) {
          setVisibleParagraph(paragraphText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          // Show buttons 1s after paragraph finishes
          setTimeout(() => setShowButtons(true), 1000);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [visibleHeading]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {loading ? (
        <div className="absolute inset-0 flex justify-center items-center z-20">
          <OrbitSpinner />
        </div>
      ) : (
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 
            bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 
            bg-clip-text text-transparent">
            {visibleHeading}
            <span className="animate-pulse">
              {visibleHeading.length < headingText.length ? '|' : ''}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            {visibleParagraph}
            <span className="animate-pulse">
              {visibleParagraph.length < paragraphText.length ? '|' : ''}
            </span>
          </p>

          <div
            className={`flex gap-4 justify-center transition-all duration-700 transform ${
              showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <Link
              to="/projects"
              className="px-6 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-violet-500/50"
            >
              View My Work
            </Link>
            <button
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-6 py-4 border-2 border-violet-600 text-violet-400 hover:bg-violet-600/10 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </button>
          </div>
        </div>
      )}

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <button
          onClick={scrollToAbout}
          className="animate-bounce text-violet-400 hover:text-violet-300 transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown size={40} />
        </button>
      </div>
    </section>
  );
};
