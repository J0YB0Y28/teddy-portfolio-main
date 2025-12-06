import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TextReveal = ({ children, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div
                variants={{
                    hidden: { y: "100%" },
                    visible: { y: 0 }
                }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }} // Cubic bezier for smooth "premium" feel
            >
                {children}
            </motion.div>
        </div>
    );
};

export default TextReveal;
