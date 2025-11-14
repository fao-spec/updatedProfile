import { motion } from "framer-motion";

export const Experience = () => {
  return (
    <section id="experience" className="py-20 px-6">
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{ duration: 1 }}
    className="w-full max-w-6xl mx-auto" // full width, but max-width capped
  >
    {/* Heading */}
    <h2
      className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-12 
        bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 
        bg-clip-text text-transparent leading-tight text-left sm:text-left"
    >
      Experience
    </h2>

    {/* Grid for experiences */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
      
      {/* TSacademy Experience */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-left"
      >
        <p className="text-gray-400 text-sm mb-1">Oct 2025 – Present</p>
        <h3 className="text-2xl font-bold text-white mb-2">
          Backend Developer Intern — TSacademy
        </h3>
        <ul className="text-gray-300 list-disc list-inside space-y-1">
          <li>Backend systems using Node.js, Express, NestJS, Python, Django, FastAPI</li>
          <li>PostgreSQL, MongoDB, REST APIs, CI/CD, Cloud services</li>
          <li>REST API & database work</li>
          <li>Agile workflows, debugging & code reviews</li>
        </ul>
      </motion.div>

      {/* HiiT Plc Experience */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-left"
      >
        <p className="text-gray-400 text-sm mb-1">Jun 2024 – Nov 2024</p>
        <h3 className="text-2xl font-bold text-white mb-2">
          Full-Stack Developer Intern — HiiT Plc
        </h3>
        <ul className="text-gray-300 list-disc list-inside space-y-1">
          <li>Built responsive apps with HTML, CSS, JavaScript, Python, Django, FastAPI</li>
          <li>UI/UX work, Git collaboration, teamwork</li>
        </ul>
      </motion.div>

    </div>
  </motion.div>
</section>

  );
};
