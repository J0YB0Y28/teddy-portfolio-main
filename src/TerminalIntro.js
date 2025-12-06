import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BackgroundParticles from "./BackgroundParticles";
import { useLanguage } from './contexts/LanguageContext';

export default function TerminalIntro() {
  const { language, setLanguage, t } = useLanguage();
  const [typedText, setTypedText] = useState("");
  const [lines, setLines] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [done, setDone] = useState(false);
  const [history, setHistory] = useState([]);
  // eslint-disable-next-line
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isZooming, setIsZooming] = useState(false); // State pour l'animation de zoom
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Une seule variable "theme" => "light" | "dark" | "hacker"
  const [theme, setTheme] = useState("light");

  // Commandes valides
  const validCommands = [
    "start", "run",
    "dark", "light", "hackermode",
    "help", "clear", "about", "cv",
    "lang fr", "lang en", "lang es",
    "whoami", "sudo" // Easter eggs
  ];

  // useEffect => focus, recup theme, recup lang
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.remove("light", "dark", "hacker");
    document.documentElement.classList.add(savedTheme);

    // LOGIQUE TYPEWRITER (BOOT SEQUENCE)
    const bootLines = t.terminal.bootSequence;
    let lineIndex = 0;
    let charIndex = 0;
    let currentText = "";

    // Refs pour le nettoyage
    const timeouts = [];
    let welcomeInterval = null;

    const typeBoot = () => {
      if (lineIndex < bootLines.length) {
        if (charIndex < bootLines[lineIndex].length) {
          currentText += bootLines[lineIndex].charAt(charIndex);
          setTypedText(currentText); // Affiche progressivement la ligne en cours
          charIndex++;
          timeouts.push(setTimeout(typeBoot, 50));
        } else {
          currentText += "\n"; // Saut de ligne une fois la ligne finie
          setTypedText(currentText);
          lineIndex++;
          charIndex = 0;
          timeouts.push(setTimeout(typeBoot, 300)); // Pause entre les lignes
        }
      } else {
        // Fin du boot, on affiche le message de bienvenue
        const welcomeMsg = t.terminal.welcome;
        let wIndex = 0;
        welcomeInterval = setInterval(() => {
          if (wIndex < welcomeMsg.length) {
            setTypedText(prev => prev + welcomeMsg.charAt(wIndex));
            wIndex++;
          } else {
            clearInterval(welcomeInterval);
          }
        }, 30);
      }
    };

    typeBoot();

    // Cleanup function
    return () => {
      timeouts.forEach(clearTimeout);
      if (welcomeInterval) clearInterval(welcomeInterval);
    };
  }, [t]); // Re-run typewriter when language changes? Maybe not ideal but acceptable for now.

  // enregistre le theme
  useEffect(() => {
    localStorage.setItem("theme", theme);
    // On enlève toutes les classes => on applique la classe du theme
    document.body.classList.remove("light", "dark", "hacker");
    document.body.classList.add(theme);
  }, [theme]);

  const handleCommand = (input) => {
    const lower = input.trim().toLowerCase();

    // Si l'utilisateur tape start / hello / run
    if (["start", "hello", "run"].includes(lower)) {
      setLines((prev) => [
        ...prev,
        `teddy@portfolio:~$ ${input}`,
        t.terminal.launching
      ]);
      setDone(true);
      // setIsZooming(true); // Plus nécessaire car géré par exit
      navigate("/home");
      return;
    }

    if (lower === "help") {
      setLines((prev) => [
        ...prev,
        `teddy@portfolio:~$ ${input}`,
        t.terminal.availableCommands,
        ...t.terminal.helpList
      ]);
      return;
    }

    if (lower === "clear") {
      setLines([]);
      return;
    }

    if (lower === "about") {
      setLines((prev) => [
        ...prev,
        `teddy@portfolio:~$ ${input}`,
        ...t.terminal.aboutLines
      ]);
      return;
    }

    if (lower === "cv") {
      setLines((prev) => [
        ...prev,
        `teddy@portfolio:~$ ${input}`,
        t.terminal.cvOpening
      ]);
      const cvFile = language === 'en' ? 'cv_en.pdf' : language === 'es' ? 'cv_es.pdf' : 'cv_fr.pdf';
      window.open(`/${cvFile}`, "_blank");
      return;
    }

    if (lower === "whoami") {
      setLines((prev) => [
        ...prev,
        `teddy@portfolio:~$ ${input}`,
        t.terminal.whoami
      ]);
      return;
    }

    if (lower === "sudo") {
      setLines((prev) => [
        ...prev,
        `teddy@portfolio:~$ ${input}`,
        t.terminal.sudo
      ]);
      return;
    }

    if (lower === "hackermode") {
      // si theme = 'hacker' => already
      if (theme === "hacker") {
        setLines((prev) => [
          ...prev,
          `teddy@portfolio:~$ ${input}`,
          t.terminal.alreadyHacker
        ]);
      } else {
        setTheme("hacker");
        setLines((prev) => [
          ...prev,
          `teddy@portfolio:~$ ${input}`,
          ...t.terminal.hackerWelcome
        ]);
      }
      return;
    }

    if (lower === "dark") {
      if (theme === "dark") {
        setLines((prev) => [
          ...prev,
          `teddy@portfolio:~$ ${input}`,
          t.terminal.alreadyDark
        ]);
      } else {
        setTheme("dark");
        setLines((prev) => [
          ...prev,
          `teddy@portfolio:~$ ${input}`,
          t.terminal.switchDark
        ]);
      }
      return;
    }

    if (lower === "light") {
      if (theme === "light") {
        setLines((prev) => [
          ...prev,
          `teddy@portfolio:~$ ${input}`,
          t.terminal.alreadyLight
        ]);
      } else {
        setTheme("light");
        setLines((prev) => [
          ...prev,
          `teddy@portfolio:~$ ${input}`,
          t.terminal.switchLight
        ]);
      }
      return;
    }

    // gestion lang en / fr / es
    if (lower.startsWith("lang ")) {
      const newLang = lower.split(" ")[1];
      if (newLang === "en") {
        setLanguage("en");
        setLines((prev) => [
          ...prev,
          `teddy@portfolio:~$ ${input}`,
          t.terminal.languageSetTo + "English"
        ]);
      } else if (newLang === "fr") {
        setLanguage("fr");
        setLines((prev) => [
          ...prev,
          `teddy@portfolio:~$ ${input}`,
          t.terminal.languageSetTo + "Français"
        ]);
      } else if (newLang === "es") {
        setLanguage("es");
        setLines((prev) => [
          ...prev,
          `teddy@portfolio:~$ ${input}`,
          t.terminal.languageSetTo + "Español"
        ]);
      } else {
        setLines((prev) => [
          ...prev,
          `teddy@portfolio:~$ ${input}`,
          "lang [en|fr|es] ?"
        ]);
      }
      return;
    }

    // commande invalide
    setLines((prev) => [
      ...prev,
      `teddy@portfolio:~$ ${input}`,
      `${t.terminal.commandNotFound} ${input}`,
      t.terminal.seeHelp
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setHistory((prev) => [...prev, userInput]);
      setHistoryIndex(history.length + 1);
      handleCommand(userInput);
      setUserInput("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = validCommands.find((cmd) =>
        cmd.startsWith(userInput.toLowerCase())
      );
      if (match) setUserInput(match);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistoryIndex((prev) => {
        const newIndex = prev > 0 ? prev - 1 : 0;
        setUserInput(history[newIndex] || "");
        return newIndex;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistoryIndex((prev) => {
        const newIndex = prev < history.length ? prev + 1 : history.length;
        setUserInput(history[newIndex] || "");
        return newIndex;
      });
    }
  };

  // auto-complétion
  const suggestion = validCommands.find(
    (cmd) => cmd.startsWith(userInput.toLowerCase()) && userInput !== ""
  );

  // ----- Rendu final -----
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <BackgroundParticles isDark={theme === "dark" || theme === "hacker"} />

      <motion.div
        style={{
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // container transparent => on voit mieux les particules
          backgroundColor: "transparent",
          color: theme === "hacker" ? "#0f0" : "#a3e635",
          position: "relative",
          zIndex: 10,
          padding: "2rem",
        }}
        className="font-mono overflow-auto"
        animate={isZooming ? { scale: 20, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <motion.h1
          className="text-5xl font-bold mb-8 text-center select-none"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.03 },
            },
          }}
          style={{ color: "#ba8ee3" }}
        >
          {t.terminal.title.split("").map((char, i) => (
            <motion.span
              key={i}
              style={{
                display: "inline-block",
                cursor: "pointer",
                color: "#ba8ee3", // Explicit color to avoid inheritance issues
                marginRight: char === " " ? "0.5rem" : "0rem" // Consistent units
              }}
              whileHover={{ scale: 1.3, color: "#facc15" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}{" "}
          <motion.span
            style={{ display: "inline-block", cursor: "pointer", marginLeft: "1rem" }}
            whileHover={{ scale: 1.3, rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            ☀️
          </motion.span>
        </motion.h1>



        {/* Theme Badge */}
        <div style={{
          marginBottom: "1.5rem",
          display: "flex",
          gap: "10px",
          fontSize: "0.8rem",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "1px"
        }}>
          <button
            onClick={() => {
              if (theme === "light") {
                setLines(prev => [...prev, "teddy@portfolio:~$ light", t.terminal.alreadyLight]);
              } else {
                setTheme("light");
                setLines(prev => [...prev, "teddy@portfolio:~$ light", t.terminal.switchLight]);
              }
            }}
            style={{
              padding: "4px 12px",
              borderRadius: "20px",
              backgroundColor: theme === "light" ? "#fff" : (theme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"),
              color: theme === "light" ? "#000" : (theme === "light" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)"),
              border: theme === "light" && theme === "light" ? "1px solid #e5e7eb" : "none", // Border for active light button
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: theme === "light" ? "0 2px 5px rgba(0,0,0,0.1)" : "none"
            }}
            className="hover:scale-105 active:scale-95"
          >
            Light
          </button>

          <button
            onClick={() => {
              if (theme === "dark") {
                setLines(prev => [...prev, "teddy@portfolio:~$ dark", t.terminal.alreadyDark]);
              } else {
                setTheme("dark");
                setLines(prev => [...prev, "teddy@portfolio:~$ dark", t.terminal.switchDark]);
              }
            }}
            style={{
              padding: "4px 12px",
              borderRadius: "20px",
              backgroundColor: theme === "dark" ? "#3b82f6" : (theme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"),
              color: theme === "dark" ? "#fff" : (theme === "light" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)"),
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            className="hover:scale-105 active:scale-95"
          >
            Dark
          </button>

          <button
            onClick={() => {
              if (theme === "hacker") {
                setLines(prev => [...prev, "teddy@portfolio:~$ hackermode", t.terminal.alreadyHacker]);
              } else {
                setTheme("hacker");
                setLines(prev => [...prev, "teddy@portfolio:~$ hackermode", ...t.terminal.hackerWelcome]);
              }
            }}
            style={{
              padding: "4px 12px",
              borderRadius: "20px",
              backgroundColor: theme === "hacker" ? "#00ff00" : (theme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"),
              color: theme === "hacker" ? "#000" : (theme === "light" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)"),
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: theme === "hacker" ? "0 0 10px #00ff00" : "none"
            }}
            className="hover:scale-105 active:scale-95"
          >
            Hacker
          </button>
        </div>


        {/* Terminal box */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            scale: [1, 1.1, 0.9, 1.2, 0],
            x: [0, -10, 10, -10, 10, 0],
            filter: ["blur(0px)", "blur(5px)", "blur(0px)", "blur(10px)", "blur(20px)"],
            transition: { duration: 0.4 }
          }}
          transition={{ duration: 0.8 }}
          style={{
            width: "100%",
            maxWidth: "700px",
            border: theme === "hacker" ? "1px solid #00ff00" : "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "12px",
            backgroundColor: "rgba(15, 23, 42, 0.75)", // Darker, more premium background
            backdropFilter: "blur(12px)", // Stronger blur
            boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)", // Depth + border ring
            overflow: "hidden", // For the header
          }}
        >
          {/* Terminal Header (Window Chrome) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 16px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div style={{ display: "flex", gap: "8px" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ff5f56" }}></div> {/* Close */}
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ffbd2e" }}></div> {/* Minimize */}
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#27c93f" }}></div> {/* Maximize */}
            </div>
            <div style={{ flex: 1, textAlign: "center", fontSize: "0.85rem", opacity: 0.7, fontFamily: "sans-serif" }}>
              teddy@portfolio: ~
            </div>
          </div>

          <div style={{ padding: "1.5rem" }}>
            <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.5", marginBottom: "1rem" }}>
              {typedText}
              <span className="animate-pulse">_</span> {/* Curseur clignotant */}
            </div>
            {/* Affiche l'historique APRES le message de bienvenue */}
            {lines.slice(1).map((line, idx) => (
              <div key={idx} style={{ whiteSpace: "pre-wrap", lineHeight: "1.5" }}>{line}</div>
            ))}

            {!done && (
              <div style={{ display: "flex", alignItems: "center", marginTop: "4px" }}>
                <span>teddy@portfolio:~$ </span>
                <input
                  ref={inputRef}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    width: "100%",
                    // fluo si hacker, sinon lime clair
                    color: theme === "hacker" ? "#00ff00" : "#d9f99d",
                    paddingLeft: "4px",
                  }}
                  placeholder={
                    language === "fr"
                      ? "tape une commande (ex: help, lang en, dark...)"
                      : "type a command (e.g. help, lang fr, dark...)"
                  }
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              </div>
            )}

            {suggestion && suggestion !== userInput.toLowerCase() && !done && (
              <div style={{ marginTop: "0.25rem", fontSize: "0.9rem", opacity: 0.7 }}>
                ➜ Auto-complete suggestion: <strong>{suggestion}</strong>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
