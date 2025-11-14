import { useEffect, useState, useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { OrbitSpinner } from '../components/LoadingScreen';

type Project = {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  video_url?: string;
  url?: string;
  github_url?: string;
  tags?: string[];
  featured?: boolean;
  order_index?: number;
};

const ProjectCard = ({
  project,
  scrollDir
}: {
  project: Project;
  index: number;
  scrollDir: 'up' | 'down';
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.2 });

  return (
    <div
      ref={cardRef}
      className={`group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 
        hover:border-violet-500/50 transition-all duration-700 transform 
        ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : scrollDir === 'down'
            ? 'opacity-0 translate-y-16'
            : 'opacity-0 -translate-y-16'
        }`}
    >
      <div className="relative h-64 overflow-hidden bg-gray-900">
        {project.video_url ? (
          <video
            src={project.video_url}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-600/20 to-purple-600/20">
            <span className="text-6xl font-bold text-violet-400/30">
              {project.title[0]}
            </span>
          </div>
        )}

        {project.featured && (
          <div className="absolute top-4 left-4 bg-violet-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-violet-600/20 text-violet-400 rounded-full text-sm border border-violet-600/30"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-3 mt-4">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-violet-500/30"
            >
              View Project
              <ExternalLink size={16} />
            </a>
          )}

          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 border-2 border-violet-600 text-violet-400 hover:bg-violet-600/10 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <Github size={16} />
              View Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('down');

  const headingText = 'Featured Projects';
  const paragraphText = 'A showcase of my recent work and creative experiments';

  const [visibleHeading, setVisibleHeading] = useState('');
  const [visibleParagraph, setVisibleParagraph] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < headingText.length) {
          setVisibleHeading(headingText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 250);
    }, 0);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    if (visibleHeading === headingText) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < paragraphText.length) {
          setVisibleParagraph(paragraphText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 40);
      return () => clearInterval(interval);
    }
  }, [visibleHeading]);

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

  useEffect(() => {
    const demoProjects: Project[] = [
      {
        id: '1',
        title: 'Portfolio Website',
        description: 'A modern personal website built with React and Tailwind CSS.',
        image_url: '/projects/codeWithFave.png',
        url: 'https://codewithfave.vercel.app/',
        github_url: 'https://github.com/fao-spec/updatedProfile',
        tags: ['React', 'Tailwind', 'Framer Motion'],
        featured: true,
        order_index: 1
      },
      {
        id: '2',
        title: 'Building Your Property’s Perfect Matchmaker',
        description:
          'A 24/7 digital platform making property management simpler for landlords and renting easier for tenants.',
        image_url: '/projects/propertypulse.png',
        url: 'https://property-pulse-eosin-mu.vercel.app/',
        github_url: 'https://github.com/fao-spec/property',
        tags: ['Next.js', 'Node.js', 'MongoDB'],
        order_index: 2
      },
      {
        id: '3',
        title: 'TokenMaster',
        description: 'Decentralized, secure and fraud-proof ticketing powered by blockchain.',
        image_url: '/projects/ticketmaster.png',
        video_url: '/projects/web3.mp4',
        url: 'https://ticketmaster-azure.vercel.app/',
        github_url: 'https://github.com/fao-spec/Ticketmaster',
        tags: ['React.js', 'Hardhat', 'Ethers.js'],
        order_index: 3
      },
      {
        id: '4',
        title: 'AdSnap Studio: AI-Powered Product Ad Generator',
        description:
          'A powerful Streamlit app for generating professional product ads using Bria AI’s advanced APIs.',
        image_url: '/projects/adsnapstudio.png',
        url: 'https://adsnapstudio.streamlit.app/',
        github_url: 'https://github.com/fao-spec/Adsnap_Studio',
        tags: ['Python', 'Creative Automation', 'AI Tools'],
        order_index: 4
      },
      {
        id: '5',
        title: 'Your Frontline Crypto Helpdesk',
        description:
          'A web-first support solution giving users clarity, confidence, and quick fixes when they need them most.',
        image_url: '/projects/coinnode.png',
        url: 'https://fao-spec.github.io/CryptoSupport/',
        github_url: 'https://github.com/fao-spec/CryptoSupport',
        tags: ['Javascript', 'Tailwind', 'UI/UX'],
        order_index: 5
      },
      {
        id: '6',
        title: 'First Portfolio Website',
        description:
          'A portfolio demonstrating solutions that go deeper than expectations.',
        image_url: '/projects/Profile.png',
        video_url: '/projects/Progress.mp4',
        url: 'https://personal-website-steel-chi.vercel.app/',
        github_url: 'https://github.com/fao-spec/portfolio',
        tags: ['Python', 'Django', 'UI/UX'],
        order_index: 6
      }
    ];

    setTimeout(() => {
      setProjects(demoProjects);
      setLoading(false);
    }, 0);
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen py-20 px-6 relative">
      <div className="max-w-7xl mx-auto text-center mb-16">
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
        <OrbitSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {projects.map((project, index) => (
            <div className={`${index % 3 === 1 ? 'lg:translate-y-8' : ''}`}>
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                scrollDir={scrollDir}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
