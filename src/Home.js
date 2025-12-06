import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-screen flex">
      {/* MENU LATÉRAL */}
      <aside className="w-56 bg-gray-800 text-white flex flex-col py-8 px-4 space-y-6">
        <h2 className="text-2xl font-bold mb-4">Mon Menu</h2>
        <nav className="space-y-4">
          <a href="#about" className="block hover:underline">
            À propos
          </a>
          <a href="#projects" className="block hover:underline">
            Projets
          </a>
          <a href="#contact" className="block hover:underline">
            Contact
          </a>
        </nav>
      </aside>

      {/* CONTENU PRINCIPAL */}
      <main className="flex-1 overflow-y-auto bg-gray-100 p-8">
        {/* SECTION À PROPOS */}
        <motion.section
          id="about"
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">À propos</h2>
          <p>
            Bienvenue sur la page d'accueil ! Je suis <strong>Teddy Kana</strong>,
            passionné de développement, de hacking éthique et de coaching de soccer.
            Ici, vous trouverez plus de détails sur mon parcours et mes
            compétences.
          </p>
        </motion.section>

        {/* SECTION PROJETS */}
        <motion.section
          id="projects"
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Projets</h2>
          <p>
            Découvrez quelques-uns de mes projets en développement web, IA, vision
            par ordinateur... 
          </p>
          <ul className="mt-4 list-disc list-inside">
            <li>Détection d'âge et d'émotion (OpenCV, Python)</li>
            <li>Algo de hachage de mots de passe en C++</li>
            <li>Brick Breaker Game en HTML/JS</li>
          </ul>
        </motion.section>

        {/* SECTION CONTACT */}
        <motion.section
          id="contact"
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Contact</h2>
          <p>
            Intéressé(e) à collaborer, ou besoin d'infos supplémentaires ?
            N'hésitez pas à me contacter !
          </p>
          <ul className="mt-4 space-y-2">
            <li>Email: <a className="text-blue-600 hover:underline" href="mailto:kanaboumkwoiit@outlook.com">kanaboumkwoiit@outlook.com</a></li>
            <li>LinkedIn: <a className="text-blue-600 hover:underline" href="https://www.linkedin.com/in/teddy-kana-6a26832b9/" target="_blank" rel="noreferrer">Profil</a></li>
          </ul>
        </motion.section>
      </main>
    </div>
  );
}
