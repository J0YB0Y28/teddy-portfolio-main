import React from 'react';
import { FaPython, FaReact, FaJsSquare, FaHtml5, FaCss3Alt, FaNodeJs } from 'react-icons/fa';

const TechCube = () => {
    // Configuration des faces et des icônes
    const faces = [
        { id: 1, icon: <FaReact color="#61DAFB" />, color: "border-blue-400" }, // Devant
        { id: 2, icon: <FaPython color="#3776AB" />, color: "border-yellow-400" }, // Droite
        { id: 3, icon: <FaJsSquare color="#F7DF1E" />, color: "border-yellow-300" }, // Derrière
        { id: 4, icon: <FaHtml5 color="#E34F26" />, color: "border-orange-500" }, // Gauche
        { id: 5, icon: <FaCss3Alt color="#1572B6" />, color: "border-blue-600" }, // Dessus
        { id: 6, icon: <FaNodeJs color="#339933" />, color: "border-green-500" }, // Dessous
    ];

    return (
        <div className="w-[200px] h-[200px] [perspective:1000px] mx-auto mt-10 md:mt-0">
            <div className="relative w-full h-full [transform-style:preserve-3d] animate-spin-cube">
                {faces.map((face, index) => {
                    // Calcul des transformations CSS pour placer chaque face du cube
                    const transforms = [
                        "translateZ(100px)", // 1. Front
                        "rotateY(90deg) translateZ(100px)", // 2. Right
                        "rotateY(180deg) translateZ(100px)", // 3. Back
                        "rotateY(-90deg) translateZ(100px)", // 4. Left
                        "rotateX(90deg) translateZ(100px)", // 5. Top
                        "rotateX(-90deg) translateZ(100px)" // 6. Bottom
                    ];

                    return (
                        <div
                            key={face.id}
                            className={`absolute w-[200px] h-[200px] 
                bg-black/20 backdrop-blur-md border-2 ${face.color}
                flex items-center justify-center text-8xl shadow-[0_0_20px_rgba(255,255,255,0.2)]`}
                            style={{ transform: transforms[index] }}
                        >
                            {face.icon}
                        </div>
                    );
                })}
            </div>

            {/* Ombre flottante en dessous */}
            <div className="w-[200px] h-4 bg-black/50 blur-xl rounded-full mt-20 mx-auto animate-pulse"></div>
        </div>
    );
};

export default TechCube;
