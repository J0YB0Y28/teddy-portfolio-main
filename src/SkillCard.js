import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const SkillCard = ({ skill }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        const rect = e.target.getBoundingClientRect();
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

    return (
        <motion.div
            drag
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            whileHover={{ scale: 1.1, zIndex: 10, cursor: "grab" }}
            whileTap={{ cursor: "grabbing" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="flex flex-col items-center glass-card p-4 rounded-xl min-w-[100px] bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
        >
            <div style={{ transform: "translateZ(50px)" }} className="text-4xl mb-2 text-gray-700 dark:text-gray-200">
                {skill.icon}
            </div>
            <span style={{ transform: "translateZ(30px)" }} className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {skill.name}
            </span>
        </motion.div>
    );
};

export default SkillCard;
