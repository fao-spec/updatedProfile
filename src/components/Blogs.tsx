import { useEffect, useState, useRef } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Link } from 'react-router-dom';
import { blogs as allBlogs } from '../data/blogs';
import { OrbitSpinner } from '../components/LoadingScreen'; // ✅ Spinner

interface Blog {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  video_url?: string;
  tags?: string[];
  created_at: string;
}

const BlogCard = ({
  blog,
  index,
  scrollDir,
}: {
  blog: Blog;
  index: number;
  scrollDir: 'up' | 'down';
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.2 });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const readingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <article
      ref={cardRef}
      className={`group backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 
        hover:border-violet-500/50 transition-all duration-700 transform 
        ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : scrollDir === 'down'
            ? 'opacity-0 translate-y-16'
            : 'opacity-0 -translate-y-16'
        }`}
      style={{ transitionDelay: `${500 + index * 150}ms` }}
    >
      {blog.image_url && (
        <div className="relative h-56 overflow-hidden bg-transparent">
          <img
            src={blog.image_url}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={16} />
            {formatDate(blog.created_at)}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={16} />
            {readingTime(blog.content)}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-gray-400 mb-4 line-clamp-3">
          {blog.excerpt || blog.content.substring(0, 150) + '...'}
        </p>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-violet-600/20 text-violet-400 rounded-full text-sm border border-violet-600/30"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link
          to={`/blogs/${blog.id}`}
          state={{ blog }}
          className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors font-semibold group/link"
        >
          Read More
          <ArrowRight
            size={18}
            className="transform group-hover/link:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      {blog.video_url && (
        <div className="px-6 pb-6">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <iframe
              src={blog.video_url}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </article>
  );
};

export const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('down');

  const headingText = 'Blogs';
  const paragraphText = 'Insights, tutorials, and stories from my journey';

  const [visibleHeading, setVisibleHeading] = useState('');
  const [visibleParagraph, setVisibleParagraph] = useState('');

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Detect scroll direction
  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const newY = window.scrollY;
      setScrollDir(newY > lastY ? 'down' : 'up');
      lastY = newY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate data fetching
  useEffect(() => {
    setTimeout(() => {
      setBlogs(allBlogs);
      setLoading(false);
    }, 300);
  }, []);

  // Typing animation (heading)
  useEffect(() => {
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
    }, 1000);
    return () => clearTimeout(delay);
  }, []);

  // Typing animation (paragraph)
  useEffect(() => {
    if (visibleHeading === headingText) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < paragraphText.length) {
          setVisibleParagraph(paragraphText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 70);
      return () => clearInterval(interval);
    }
  }, [visibleHeading]);

  return (
    <section id="blogs" ref={sectionRef} className="min-h-screen py-20 px-6 relative bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 delay-[1000ms] transform ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : scrollDir === 'down'
              ? 'opacity-0 translate-y-10'
              : 'opacity-0 -translate-y-10'
          }`}
        >
          <h2
            className="text-6xl md:text-8xl font-bold mb-6 
            bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 
            bg-clip-text text-transparent leading-tight"
          >
            {visibleHeading}
            <span className="animate-pulse">
              {visibleHeading.length < headingText.length ? '|' : ''}
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {visibleParagraph}
            <span className="animate-pulse">
              {visibleParagraph.length < paragraphText.length ? '|' : ''}
            </span>
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <OrbitSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} scrollDir={scrollDir} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
