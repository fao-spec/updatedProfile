import { motion } from "framer-motion";
import { useState } from "react";

const About = () => {
  const [openImage, setOpenImage] = useState(false);
  // Variants for staggered text animation
  const textVariant = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay } },
  });

 return (
  <section
    id="about"
    className="min-h-screen flex items-center justify-center py-20 text-white font-[Poppins]"
  >
    {/* Inner container: 90% width, centered */}
    <div className="w-[90%] mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
      
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1 }}
        className="flex justify-center"
      >
        <div
          className="
            relative w-full max-w-md p-1 rounded-3xl 
            bg-gradient-to-br from-violet-600/40 via-purple-600/30 to-pink-600/40 
            shadow-xl 
            backdrop-blur-md
            hover:shadow-violet-500/30
            transition-all duration-500
            hover:scale-[1.02]
            cursor-pointer
          "
          onClick={() => setOpenImage(true)}
        >
          <motion.img
            src="/projects/profile-studio.jpg"
            alt="about"
            className="
              w-full h-[350px] rounded-2xl object-cover object-top 
              shadow-[0_0_20px_rgba(255,255,255,0.12)]
            "
            whileHover={{ scale: 1.04 }}
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Full Image Modal */}
      {openImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6"
          onClick={() => setOpenImage(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl max-h-[90vh] w-full overflow-hidden rounded-2xl shadow-2xl bg-black/40 p-2"
          >
            <img
              src="/projects/profile-studio.jpg"
              alt="Full View"
              className="w-full h-full object-contain rounded-xl"
            />
          </motion.div>
        </motion.div>
      )}

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
          Hey there! I'm <span className="font-semibold text-white">Favour</span>, a passionate
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
          className="inline-block bg-violet-600 text-white px-7 py-3 rounded-xl font-semibold shadow-md hover:bg-violet-700 transition"
        >
          View My Work
        </motion.a>
      </motion.div>
    </div>
  </section>
);

};

export default About;
