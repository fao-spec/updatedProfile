import { motion } from "framer-motion";

const About = () => {
  // Variants for staggered text animation
  const textVariant = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay } },
  });

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 py-20 text-white font-[Poppins]"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Image */}
        <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1 }}
        className="flex justify-center"
        >
        <motion.img
            src="/projects/profile-studio.jpg"
            alt="about"
            className="w-full max-w-md h-[350px] rounded-2xl object-cover object-top shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            whileHover={{ scale: 1.06 }}
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
        </motion.div>

        {/* Text */}
        <motion.div className="space-y-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={textVariant(0)}
            className="text-5xl sm:text-6xl font-extrabold mb-6 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight"
          >
            Who Am I? 
          </motion.h2>

         <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={textVariant(0.2)}
            className="text-lg text-gray-300 leading-relaxed italic"
            >
            Hey there! I'm <span className="font-semibold text-white">Favour</span> , a passionate
            <span className="font-semibold text-white"> Frontend Developer</span> on an exciting journey toward becoming a 
            <span className="font-semibold text-white"> Full-Stack Developer</span> and ultimately a 
            <span className="font-semibold text-white"> Software Engineer</span>.
            </motion.p>

            <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={textVariant(0.4)}
            className="text-gray-400 leading-relaxed italic"
            >
            My coding journey started with curiosity and a love for beautiful interfaces,
            HTML, CSS & JavaScript were my first tools. Over time, that curiosity grew into
            a mission: to build real, scalable and impactful digital experiences.
            Now leveling up toward full-stack engineering.
            I enjoy crafting smooth UI/UX, solving technical challenges, and continuously learning to sharpen my craft.
            </motion.p>

            <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={textVariant(0.6)}
            className="text-gray-400 leading-relaxed italic"
            >
            For me, tech is more than code, it's creativity, problem-solving and growth.
            Every project moves me one step closer to becoming a world-class software engineer.
            </motion.p>

          <motion.a
            href="projects"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={textVariant(0.8)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block bg-white text-black px-7 py-3 rounded-xl font-semibold shadow-md hover:bg-gray-200 transition"
          >
            View My Work
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
