import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaFilePdf, FaArrowRight, FaCheck } from "react-icons/fa";
import { useLanguage } from "./contexts/LanguageContext";

const MagneticButton = ({ children, href, onClick, title }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const xPos = clientX - (left + width / 2);
        const yPos = clientY - (top + height / 2);
        x.set(xPos * 0.5); // Magnetic strength
        y.set(yPos * 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            onClick={onClick}
            target={href ? "_blank" : undefined}
            rel={href ? "noreferrer" : undefined}
            title={title}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: mouseX, y: mouseY }}
            className="relative flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg text-2xl text-gray-700 dark:text-white hover:bg-white/20 transition-colors cursor-pointer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
        >
            {children}
        </motion.a>
    );
};

export default function ContactSection() {
    const { t } = useLanguage();
    const [copied, setCopied] = useState(false);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;
        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleCopyEmail = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText("kanaboumkwoiit@outlook.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl text-center relative overflow-hidden group"
                >
                    {/* Animated Gradient Border Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <motion.div style={{ transform: "translateZ(50px)" }}>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            {t.contact.title}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
                            {t.contact.subtitle}
                        </p>

                        <div className="flex flex-wrap justify-center gap-8">
                            <MagneticButton onClick={handleCopyEmail} title="Copy Email">
                                {copied ? <FaCheck className="text-green-400" /> : <FaEnvelope />}
                            </MagneticButton>

                            <MagneticButton href="https://github.com/J0YB0Y28" title="GitHub">
                                <FaGithub />
                            </MagneticButton>

                            <MagneticButton href="https://www.linkedin.com/in/teddy-kana-6a26832b9/" title="LinkedIn">
                                <FaLinkedin />
                            </MagneticButton>

                            <MagneticButton href="/cv.pdf" title="CV">
                                <FaFilePdf />
                            </MagneticButton>
                        </div>

                        {copied && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-green-400 font-medium text-sm"
                            >
                                Email copié ! 📋
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl rounded-full -z-10 pointer-events-none" />
        </section>
    );
}
