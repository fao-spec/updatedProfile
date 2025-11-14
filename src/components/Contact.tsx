import { useState, useCallback, useRef } from 'react';
import { Mail, Github, Linkedin, Twitter, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.3 });

  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const socialLinks = [
    { icon: Mail, label: 'Email', href: 'mailto:favourarowosegbeo@gmail.com', color: 'hover:text-red-400' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/fao-spec', color: 'hover:text-gray-300' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/codewithfave', color: 'hover:text-blue-400' },
    { icon: Twitter, label: 'Twitter', href: 'https://x.com/codeWithFave', color: 'hover:text-sky-400' },
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

  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';

    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    return newErrors;
  }, [formData]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors(prev => ({ ...prev, [name]: undefined }));
  }, [errors]);

  const handleBlur = useCallback((field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const fieldErrors = validateForm();
    setErrors(prev => ({ ...prev, [field]: fieldErrors[field] }));
  }, [validateForm]);

  const handleSubmit = useCallback(async () => {
    setTouched({ name: true, email: true, message: true });
    const formErrors = validateForm();
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    setSubmitStatus('loading');
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          user_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTouched({});
      toast.success('Message sent successfully!');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitStatus('error');
      toast.error('Failed to send message. Try again.');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  }, [formData, validateForm]);

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-6 flex flex-col items-center text-center">
      <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
          Let's Connect
        </h2>

        <p className="text-base sm:text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
          Have a project in mind or just want to chat? I’m always open to new ideas, collaborations and opportunities to build something amazing together.
        </p>

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

        {/* Contact Form */}
        <div className="mt-12 max-w-xl mx-auto space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            onBlur={() => handleBlur('name')}
            className={`w-full px-4 py-3 bg-transparent border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 backdrop-blur-sm ${
              touched.name && errors.name ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-700 focus:border-violet-500 focus:ring-violet-500/50'
            }`}
          />
          {touched.name && errors.name && (
            <p className="text-red-400 flex items-center gap-1 text-sm">
              <AlertCircle size={14} /> {errors.name}
            </p>
          )}

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur('email')}
            className={`w-full px-4 py-3 bg-transparent border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 backdrop-blur-sm ${
              touched.email && errors.email ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-700 focus:border-violet-500 focus:ring-violet-500/50'
            }`}
          />
          {touched.email && errors.email && (
            <p className="text-red-400 flex items-center gap-1 text-sm">
              <AlertCircle size={14} /> {errors.email}
            </p>
          )}

          <textarea
            name="message"
            rows={5}
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            onBlur={() => handleBlur('message')}
            className={`w-full px-4 py-3 bg-transparent border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 resize-none backdrop-blur-sm ${
              touched.message && errors.message ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-700 focus:border-violet-500 focus:ring-violet-500/50'
            }`}
          />
          {touched.message && errors.message && (
            <p className="text-red-400 flex items-center gap-1 text-sm">
              <AlertCircle size={14} /> {errors.message}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={submitStatus === 'loading'}
            className="w-full px-6 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 shadow-lg hover:shadow-violet-500/50 disabled:shadow-none flex items-center justify-center gap-2"
          >
            {submitStatus === 'loading' ? (
              <>
                <Loader className="animate-spin" size={20} /> Sending...
              </>
            ) : submitStatus === 'success' ? (
              <>
                <CheckCircle size={20} /> Message Sent!
              </>
            ) : submitStatus === 'error' ? (
              <>
                <AlertCircle size={20} /> Failed to Send
              </>
            ) : (
              <>
                <Send size={20} /> Send Message
              </>
            )}
          </button>
        </div>
      </div>

      <ToastContainer 
        position="bottom-right"   // moved from top-right
        autoClose={4000} 
        theme="dark" 
      />
    </section>
  );
};
