import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function BackgroundParticles() {
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      // On force le conteneur à prendre 100% de son PARENT, pas de l'écran
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0, // En arrière-plan
      }}
      options={{
        fullScreen: { enable: false }, // IMPORTANT : Désactive le plein écran forcé
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse", // Les particules fuient la souris comme dans la vidéo
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          // Couleurs inspirées de Google Antigravity (Bleu, Rouge, Jaune, Vert)
          color: {
            value: ["#4285F4", "#EA4335", "#FBBC05", "#34A853"],
          },
          links: {
            enable: false, // PAS DE LIGNES pour un effet propre
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 1, // Mouvement lent et flottant
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80, // Nombre de particules
          },
          opacity: {
            value: 0.8,
            random: true, // Opacité variable pour effet de profondeur
          },
          shape: {
            type: "circle", // Juste des points (ou "star" pour des étoiles)
          },
          size: {
            value: { min: 2, max: 5 }, // Taille variable
          },
        },
        detectRetina: true,
      }}
    />
  );
}
