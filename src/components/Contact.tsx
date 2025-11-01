import { useRef } from 'react';
import { Mail, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.3 });

  const socialLinks = [
    { icon: Mail, label: 'Email', href: 'mailto:favourarowosegbeo@gmail.com', color: 'hover:text-red-400' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/fao-spec', color: 'hover:text-gray-300' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/codewithfave', color: 'hover:text-blue-400' },
    { icon: Twitter, label: 'Twitter', href: 'https://x.com/codeWithFave', color: 'hover:text-sky-400' },
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/damilaaare_/', color: 'hover:text-pink-400' },
    {
      icon: () => (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="w-4 h-4"
        />
      ),
      label: 'WhatsApp',
      href: 'https://wa.me/2347054435052',
      color: 'hover:text-green-400',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 px-6 flex items-center justify-center text-center"
    >
      <div
        className={`transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {/* Header */}
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
          Let's Connect
        </h2>

        <p className="text-base sm:text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
          Have a project in mind or just want to chat? I’m always open to new ideas,
          collaborations, and opportunities to build something amazing together.
        </p>

        {/* Social Icons */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 px-2 select-none">
          {socialLinks.map((social, index) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col items-center justify-center bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700/50 hover:border-violet-500/50 transition-all duration-300 hover:scale-110 ${social.color}`}
              style={{
                width: '45px',
                height: '45px',
                transitionDelay: `${index * 80}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
              }}
            >
              <social.icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
