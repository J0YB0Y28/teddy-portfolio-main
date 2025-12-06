// MainInterface.js amélioré
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import BackgroundParticles from "./BackgroundParticles";
import Typewriter from 'typewriter-effect';
import Interactive3D from './Interactive3D';
import ContactSection from './ContactSection';
import TextReveal from './TextReveal';
import SkillCard from './SkillCard';
import { useLanguage } from './contexts/LanguageContext';
import {
  FaGithub, FaLinkedin, FaArrowUp, FaDatabase, FaLaptop, FaLinux, FaUbuntu,
  FaPython, FaFlask, FaHtml5, FaCss3Alt, FaReact, FaGitAlt, FaJsSquare, FaUserShield,
  FaMoon, FaSun, FaEnvelope, FaFilePdf, FaRobot, FaServer, FaWindows, FaWordpress,
  FaGraduationCap, FaBriefcase, FaSchool, FaBuilding, FaFutbol, FaNodeJs, FaDocker, FaAws, FaFigma,
  FaJava, FaNetworkWired, FaTerminal, FaCodeBranch, FaChartLine, FaSuperscript, FaCubes
} from "react-icons/fa";

import {
  SiTailwindcss, SiTypescript, SiNextdotjs, SiExpress, SiPostgresql, SiThreedotjs, SiCplusplus, SiMysql, SiOpencv, SiTensorflow, SiPytorch, SiScikitlearn, SiWireshark, SiKalilinux, SiBurpsuite, SiRaspberrypi, SiArduino, SiCisco
} from "react-icons/si";
import confetti from 'canvas-confetti';





const ProjectCard = ({ project, setSelectedProject, t }) => (
  <motion.div
    onClick={() => setSelectedProject(project)}
    className="project-card relative cursor-pointer rounded-xl overflow-hidden w-full
              border border-zinc-200 dark:border-zinc-800 shadow-xl
              bg-white dark:bg-zinc-900 group"
    whileHover={{ y: -10, boxShadow: "0 0 30px -5px rgba(66, 133, 244, 0.6)" }}
  >
    <div className="relative h-60 overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Overlay au survol */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-white font-bold text-lg">{t.projects.details}</span>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
        {project.title}
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-200 line-clamp-3">
        {project.description}
      </p>
    </div>
  </motion.div>
);

const skills = [
  { name: "React.js", icon: <FaReact />, category: ["Frontend"] },
  { name: "Next.js", icon: <SiNextdotjs />, category: ["Frontend"] },
  { name: "TypeScript", icon: <SiTypescript />, category: ["Frontend"] },
  { name: "TailwindCSS", icon: <SiTailwindcss />, category: ["Frontend"] },
  { name: "Node.js", icon: <FaNodeJs />, category: ["Backend"] },
  { name: "Express.js", icon: <SiExpress />, category: ["Backend"] },
  { name: "Python", icon: <FaPython />, category: ["Backend"] },
  { name: "Java", icon: <FaJava />, category: ["Backend"] },
  { name: "C++", icon: <SiCplusplus />, category: ["Backend"] },
  { name: "PostgreSQL", icon: <SiPostgresql />, category: ["Backend"] },
  { name: "MySQL", icon: <SiMysql />, category: ["Backend"] },
  { name: "Docker", icon: <FaDocker />, category: ["DevOps"] },
  { name: "AWS", icon: <FaAws />, category: ["DevOps"] },
  { name: "Linux", icon: <FaLinux />, category: ["OS"] },
  { name: "Windows", icon: <FaWindows />, category: ["OS"] },
  { name: "Bash", icon: <FaTerminal />, category: ["Tools"] },
  { name: "Git", icon: <FaGitAlt />, category: ["Tools"] },
  { name: "Réseaux", key: "networks", icon: <FaNetworkWired />, category: ["Security"] },
  { name: "OpenCV", icon: <SiOpencv />, category: ["AI"] },
  { name: "TensorFlow", icon: <SiTensorflow />, category: ["AI"] },
  { name: "PyTorch", icon: <SiPytorch />, category: ["AI"] },
  { name: "Scikit-learn", icon: <SiScikitlearn />, category: ["AI"] },
  { name: "Wireshark", icon: <SiWireshark />, category: ["Security"] },
  { name: "Kali Linux", icon: <SiKalilinux />, category: ["Security"] },
  { name: "Burp Suite", icon: <SiBurpsuite />, category: ["Security"] },
  { name: "Raspberry Pi", icon: <SiRaspberrypi />, category: ["Hardware"] },
  { name: "Arduino", icon: <SiArduino />, category: ["Hardware"] },
  { name: "Cisco", icon: <SiCisco />, category: ["Hardware"] },
  { name: "DSA", key: "dsa", icon: <FaCodeBranch />, category: ["Theory"] },
  { name: "Probabilités & Statistiques", key: "probabilities", icon: <FaChartLine />, category: ["Theory"] },
  { name: "Algèbre Linéaire", key: "algebra", icon: <FaSuperscript />, category: ["Theory"] },
  { name: "OOP", key: "oop", icon: <FaCubes />, category: ["Theory"] },
  { name: "Figma", icon: <FaFigma />, category: ["Design", "Frontend"] },
  { name: "Three.js", icon: <SiThreedotjs />, category: ["Frontend"] }
];





const TimelineItem = ({ item, index, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0, borderColor: color === "blue" ? "#3b82f6" : "#a855f7" }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative pl-8 pb-12 last:pb-0 border-l-2 border-transparent transition-colors duration-500`}
    >
      {/* Point sur la ligne */}
      <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full border-2 bg-white dark:bg-black z-10
        ${color === "blue" ? "border-blue-500" : "border-purple-500"}`}
      />

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
        <span className={`text-sm font-bold px-2 py-1 rounded-md w-fit
          ${color === "blue" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"}`}>
          {item.date}
        </span>
        <h4 className="text-lg font-bold">{item.title}</h4>
      </div>

      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
        <span className="text-xl">{item.icon}</span>
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium">
          {item.place}
        </a>
      </div>

      {item.description && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {item.description}
        </p>
      )}
    </motion.div>
  );
};

const Timeline = ({ data, color }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative ml-4">
      {/* Ligne de fond (grise) */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-zinc-800" />

      {/* Ligne de remplissage (colorée) */}
      <motion.div
        style={{ scaleY, originY: 0 }}
        className={`absolute left-0 top-0 bottom-0 w-0.5 ${color === "blue" ? "bg-blue-500" : "bg-purple-500"}`}
      />

      <div className="space-y-0">
        {data.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} color={color} />
        ))}
      </div>
    </div>
  );
};

export default function MainInterface() {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (lang) => {
    setLanguage(lang);

    let colors = [];
    if (lang === 'fr') colors = ['#0055A4', '#FFFFFF', '#EF4135']; // Bleu, Blanc, Rouge
    if (lang === 'en') colors = ['#B22234', '#FFFFFF', '#3C3B6E']; // Red, White, Blue (USA/UK)
    if (lang === 'es') colors = ['#AA151B', '#F1BF00']; // Rojo, Amarillo

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
      disableForReducedMotion: true
    });
  };

  // Reconstruct projects array with translations
  const projects = [
    {
      title: t.projectsList[0].title,
      image: "/images/brick_breaker.png",
      description: t.projectsList[0].description,
      demoLink: "https://j0yb0y28.github.io/brick-breaker-game-main/"
    },
    {
      title: t.projectsList[1].title,
      image: "/images/movie-app.png",
      description: t.projectsList[1].description,
      demoLink: "https://j0yb0y28.github.io/movie-app/"
    },
    {
      title: t.projectsList[2].title,
      image: "/images/spaceship-game.png",
      description: t.projectsList[2].description,
      demoLink: "https://j0yb0y28.github.io/Spaceship_Game/"
    },
    {
      title: t.projectsList[3].title,
      image: "/images/power4.png",
      description: t.projectsList[3].description,
      demoLink: "https://power4-app-j0yb0y28.vercel.app/"
    },
    {
      title: t.projectsList[4].title,
      image: "/images/gender-age-app.png",
      description: t.projectsList[4].description,
      demoLink: "https://gender-age-app-j0yb0y28.vercel.app/"
    },
    {
      title: t.projectsList[5].title,
      image: "/images/emotion-app.png",
      description: t.projectsList[5].description,
      demoLink: "https://emotion-app-j0yb0y28.vercel.app/"
    }
  ];

  // Reconstruct educationData array with translations
  const educationData = [
    {
      title: t.educationList[0].title,
      date: t.educationList[0].date,
      place: t.educationList[0].place,
      description: t.educationList[0].description,
      icon: <FaGraduationCap />,
      link: "https://www.ulaval.ca/"
    },
    {
      title: t.educationList[1].title,
      date: t.educationList[1].date,
      place: t.educationList[1].place,
      description: t.educationList[1].description,
      icon: <FaSchool />,
      link: "https://www.csfoy.ca/"
    },
    {
      title: t.educationList[2].title,
      date: t.educationList[2].date,
      place: t.educationList[2].place,
      description: t.educationList[2].description,
      icon: <FaSchool />,
      link: "https://www.derochebelle.qc.ca/"
    }
  ];

  // Reconstruct experienceData array with translations
  const experienceData = [
    {
      title: t.experienceList[0].title,
      date: t.experienceList[0].date,
      place: t.experienceList[0].place,
      icon: <FaServer />,
      link: "https://www.quebec.ca/gouvernement/ministere/famille"
    },
    {
      title: t.experienceList[1].title,
      date: t.experienceList[1].date,
      place: t.experienceList[1].place,
      icon: <FaUserShield />,
      link: "https://www.quebec.ca/gouvernement/ministeres-organismes/cybersecurite-numerique"
    },
    {
      title: t.experienceList[2].title,
      date: t.experienceList[2].date,
      place: t.experienceList[2].place,
      icon: <FaBuilding />,
      link: "https://www.ville.quebec.qc.ca/"
    },
    {
      title: t.experienceList[3].title,
      date: t.experienceList[3].date,
      place: t.experienceList[3].place,
      icon: <FaFutbol />,
      link: "https://peps.ulaval.ca/"
    },
    {
      title: t.experienceList[4].title,
      date: t.experienceList[4].date,
      place: t.experienceList[4].place,
      icon: <FaSchool />,
      link: "https://www.csfoy.ca/"
    },
    {
      title: t.experienceList[5].title,
      date: t.experienceList[5].date,
      place: t.experienceList[5].place,
      icon: <FaBriefcase />,
      link: "https://cqcm.coop/"
    },
    {
      title: t.experienceList[6].title,
      date: t.experienceList[6].date,
      place: t.experienceList[6].place,
      icon: <FaFutbol />,
      link: "https://www.cstrident.ca/"
    }
  ];

  const [selectedProject, setSelectedProject] = useState(null);
  const [activeDemoIndex, setActiveDemoIndex] = useState(0);
  const activeDemo = projects[activeDemoIndex];
  const [activeCategory, setActiveCategory] = useState("All"); // New state for filtering
  const [isDark, setIsDark] = useState(() =>
    typeof window !== "undefined" &&
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    document.body.classList.remove("light", "dark", "hacker");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setIsDark(true);
    } else if (savedTheme === "hacker") {
      document.body.classList.add("hacker");
      // Hacker mode is technically a dark mode variant, so we can set isDark to true to keep dark-themed components
      setIsDark(true);
    } else {
      document.body.classList.add("light");
      setIsDark(false);
    }
  }, []);


  const categories = ["All", "Frontend", "Backend", "AI", "Security", "DevOps", "OS", "Tools", "Hardware", "Theory"];

  const filteredSkills = activeCategory === "All"
    ? skills
    : skills.filter(skill => skill.category.includes(activeCategory));

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      className="transition-colors duration-500 ease-in-out text-gray-800 dark:text-gray-100 bg-cream dark:bg-black min-h-screen scroll-smooth"
    >
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow z-50 p-4 flex justify-center items-center gap-6">
        <a href="#parcours" className="hover:text-blue-600 dark:hover:text-purple-400 transition-colors">{t.nav.parcours}</a>
        <a href="#apropos" className="hover:text-blue-600 dark:hover:text-purple-400 transition-colors">{t.nav.about}</a>
        <a href="#projects" className="hover:text-blue-600 dark:hover:text-purple-400 transition-colors">{t.nav.projects}</a>
        <a href="#demo" className="hover:text-blue-600 dark:hover:text-purple-400 transition-colors">{t.nav.demo}</a>
        <a href="#skills" className="hover:text-blue-600 dark:hover:text-purple-400 transition-colors">{t.nav.skills}</a>
        <a href="#contact" className="hover:text-blue-600 dark:hover:text-purple-400 transition-colors">{t.nav.contact}</a>


        {/* LANGUAGE SWITCHER */}
        <div className="flex gap-2 ml-4">
          <motion.button
            whileHover={{ scale: 1.2, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleLanguageChange('fr')}
            className={`text-xl ${language === 'fr' ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-100'}`}
          >
            🇫🇷
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.2, rotate: -15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleLanguageChange('en')}
            className={`text-xl ${language === 'en' ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-100'}`}
          >
            🇬🇧
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.2, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleLanguageChange('es')}
            className={`text-xl ${language === 'es' ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-100'}`}
          >
            🇪🇸
          </motion.button>
        </div>


        {/* THEME SWITCHER */}
        <button
          onClick={() => {
            const root = document.body;
            const currentlyDark = root.classList.contains("dark");
            const newTheme = currentlyDark ? "light" : "dark";
            root.classList.toggle("dark");
            localStorage.setItem("theme", newTheme);
            setIsDark(!currentlyDark);
          }}
          className={`ml-4 relative w-16 h-8 rounded-full p-1 transition-colors duration-500 ${isDark ? "bg-zinc-700" : "bg-blue-200"}`}
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 700, damping: 30 }}
            className={`w-6 h-6 rounded-full shadow-md flex items-center justify-center ${isDark ? "bg-black" : "bg-white"}`}
            style={{
              float: isDark ? "right" : "left"
            }}
          >
            {isDark ? <FaMoon className="text-yellow-300 text-xs" /> : <FaSun className="text-orange-500 text-xs" />}
          </motion.div>
        </button>
      </nav>

      <main className="pt-0">

        {/* HERO SECTION REVAMPED */}
        <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 overflow-hidden px-6 pt-24">

          {/* 1. Les Particules en Background (Absolute) */}
          <div className="absolute inset-0 z-0">
            <BackgroundParticles />
          </div>

          {/* 2. Le contenu (Z-Index supérieur pour être devant) */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto">
            {/* Partie Gauche : Texte + Typewriter */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                  Teddy Kana
                </span>
              </h1>

              <div className="text-2xl md:text-4xl font-mono text-gray-700 dark:text-gray-300 mb-6 h-20">
                {t.hero.greeting}{" "}
                <span className="text-purple-500 font-bold inline-block">
                  <Typewriter
                    options={{
                      strings: t.hero.roles,
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 50,
                      delay: 75,
                    }}
                  />
                </span>
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto md:mx-0 mb-8 leading-relaxed">
                {t.hero.description}
              </p>

              <div className="flex gap-4 justify-center md:justify-start">
                <a
                  href={language === 'en' ? '/cv_en.pdf' : language === 'es' ? '/cv_es.pdf' : '/cv_fr.pdf'}
                  target="_blank"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30"
                >
                  {t.hero.cv}
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 hover:border-purple-500 text-gray-700 dark:text-white rounded-full font-bold transition-all hover:bg-gray-100 dark:hover:bg-zinc-800"
                >
                  {t.hero.contact}
                </a>
              </div>
            </div>

            {/* Partie Droite : Le Cube 3D (Remplacé par Interactive3D) */}
            <div className="flex-1 flex justify-center items-center py-10 perspective-container z-10 w-full">
              <Interactive3D />
            </div>
          </div>

          {/* Un dégradé en bas pour fondre vers la section suivante */}

        </section>

        {/* PARCOURS */}
        <section id="parcours" className="py-24 bg-cream dark:bg-black relative scroll-mt-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{t.parcours.title}</h2>

            <div className="grid md:grid-cols-2 gap-12">
              {/* ÉDUCATION */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-blue-600 dark:text-blue-400">
                  <FaGraduationCap className="text-3xl" /> {t.parcours.education}
                </h3>
                <Timeline data={educationData} color="blue" />
              </div>

              {/* EXPÉRIENCE */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-purple-600 dark:text-purple-400">
                  <FaBriefcase className="text-3xl" /> {t.parcours.experience}
                </h3>
                <Timeline data={experienceData} color="purple" />
              </div>
            </div>
          </div>
        </section>

        {/* À PROPOS */}
        <section id="apropos" className="mb-24 scroll-mt-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">{t.about.title}</h2>
            <div className="glass-card max-w-3xl mx-auto text-center text-lg leading-relaxed p-8 rounded-xl">
              <p className="mb-4">
                {t.about.p1}
              </p>
              <p className="mb-4">
                {t.about.p2}
              </p>
              <p>
                {t.about.p3}
              </p>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION WITH PARALLAX */}
        <section id="projects" className="mb-24 scroll-mt-24 px-6">
          <div className="max-w-7xl mx-auto">
            <TextReveal className="mb-12">
              <h2 className="text-3xl font-bold text-center">{t.projects.title}</h2>
            </TextReveal>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Column 1 - Parallax Effect (Moves faster) */}
              <motion.div className="flex flex-col gap-8" style={{ y: useTransform(useScroll().scrollYProgress, [0, 1], [0, -50]) }}>
                {projects.filter((_, i) => i % 2 === 0).map((project, index) => (
                  <ProjectCard key={index} project={project} setSelectedProject={setSelectedProject} t={t} />
                ))}
              </motion.div>

              {/* Column 2 - Parallax Effect (Moves slower/normal) */}
              <motion.div className="flex flex-col gap-8" style={{ y: useTransform(useScroll().scrollYProgress, [0, 1], [0, 50]) }}>
                {projects.filter((_, i) => i % 2 !== 0).map((project, index) => (
                  <ProjectCard key={index} project={project} setSelectedProject={setSelectedProject} t={t} />
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* DÉMO RESPONSIVE */}
        <section id="demo" className="mb-24 scroll-mt-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">{t.demo.title}</h2>
            <p className="text-center mb-4">{t.demo.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {projects.map((proj, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDemoIndex(index)}
                  className={`px-4 py-2 rounded-full border text-sm transition-all ${activeDemoIndex === index ? "bg-blue-600 text-white" : "border-gray-400 text-gray-700 dark:text-gray-200"
                    }`}
                >
                  {proj.title}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              {["Gender & Age Detection", "Emotion Detection App"].includes(activeDemo.title) ? (
                <a
                  href={activeDemo.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-lg underline hover:text-blue-700"
                >
                  {t.demo.webcam}
                </a>
              ) : (
                <iframe
                  src={activeDemo.demoLink}
                  title={activeDemo.title}
                  width="100%"
                  height="600px"
                  className="rounded-xl border border-gray-300 dark:border-gray-600 max-w-4xl w-full bg-white dark:bg-zinc-900"
                />
              )}
            </div>
          </div>
        </section>

        {/* COMPÉTENCES */}
        <section id="skills" className="mb-24 scroll-mt-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">{t.skills.title}</h2>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${activeCategory === cat
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-zinc-700"}`}
                >
                  {t.skills.categories[cat] || cat}
                </button>
              ))}
            </div>

            <motion.div
              layout
              className="flex flex-wrap justify-center gap-6"
            >
              <AnimatePresence>
                {filteredSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SkillCard skill={{
                      ...skill,
                      name: skill.key && t.skills && t.skills[skill.key] ? t.skills[skill.key] : skill.name
                    }} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* CONTACT */}
        <ContactSection />

        {/* MODALE PROJET */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white dark:bg-zinc-800 p-6 rounded-xl max-w-2xl w-full relative text-left border border-white/10 shadow-2xl"
              >
                <button className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-red-500" onClick={() => setSelectedProject(null)}>X</button>
                <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
                <p className="mb-4">{selectedProject.description}</p>
                <a href={selectedProject.demoLink} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">🔗 {t.demo.access}</a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll Top */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-xl hover:bg-blue-700 z-50">
          <FaArrowUp />
        </button>
      </main>

      {/* Bouton retour vers le terminal */}
      <a
        href="/"
        className="fixed bottom-6 left-6 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-purple-700 transition-transform duration-300 hover:scale-105 z-50"
      >
        ⬅️ Terminal
      </a>
    </motion.div>
  );
}
