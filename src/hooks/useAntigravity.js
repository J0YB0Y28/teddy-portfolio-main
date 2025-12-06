// src/hooks/useAntigravity.js
import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

export const useAntigravity = (isActive, containerRef) => {
    const engineRef = useRef(null);
    const runnerRef = useRef(null);

    useEffect(() => {
        if (!isActive || !containerRef.current) return;

        // 1. Initialisation du moteur
        const Engine = Matter.Engine,
            Render = Matter.Render,
            World = Matter.World,
            Bodies = Matter.Bodies,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint,
            Runner = Matter.Runner;

        const engine = Engine.create();
        engineRef.current = engine;
        const world = engine.world;

        // On réduit la gravité pour un effet plus "flottant"
        engine.world.gravity.y = 0.5;

        const container = containerRef.current;
        const width = window.innerWidth;
        const height = window.innerHeight;

        // 2. Sélection des éléments à faire tomber
        // On cible les éléments importants. Ajustez les sélecteurs si besoin.
        const selectors = [
            'h1', 'h2', 'h3', 'p',
            'section#skills .flex > div', // Les icônes de compétences
            '.project-card', // Ajoutez cette classe à vos cartes projets dans MainInterface
            'nav a', 'nav button',
            '.rounded-full.shadow-xl' // Votre avatar
        ];

        const elements = container.querySelectorAll(selectors.join(','));
        const domBodies = [];

        elements.forEach((el) => {
            // Important: pour que la physique fonctionne bien, il faut figer la taille
            // et la position de l'élément HTML avant de le donner au moteur.
            const rect = el.getBoundingClientRect();

            // On ne traite que les éléments visibles
            if (rect.width === 0 || rect.height === 0) return;

            // Création du corps physique correspondant
            const body = Bodies.rectangle(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2 + window.scrollY, // Compenser le scroll actuel
                rect.width,
                rect.height,
                {
                    restitution: 0.8, // Plus de rebond (0.6 -> 0.8)
                    friction: 0.05,   // Moins de friction (0.1 -> 0.05)
                    density: 0.04     // Un peu plus lourd pour plus d'impact
                }
            );

            // On lie l'élément DOM à son corps physique pour la mise à jour
            domBodies.push({ dom: el, body: body, initialRect: rect });
            World.add(world, body);
        });

        // 3. Création des murs et du sol
        const wallThickness = 60;
        const floor = Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true });
        const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, { isStatic: true });
        const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, { isStatic: true });
        const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, { isStatic: true });

        World.add(world, [floor, ceiling, leftWall, rightWall]);

        // 4. Interaction souris (pour attraper et jeter les éléments)
        const mouse = Mouse.create(document.body);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });
        World.add(world, mouseConstraint);
        // Empêcher le scroll quand on attrape un objet
        mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
        mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);


        // 5. La boucle de synchronisation DOM <-> Physique
        // C'est ici que la magie opère : on applique les calculs physiques au CSS
        Matter.Events.on(engine, 'afterUpdate', () => {
            domBodies.forEach(({ dom, body, initialRect }) => {
                // Calcul de la différence de position par rapport à la position initiale
                const currentX = body.position.x - initialRect.width / 2;
                const currentY = body.position.y - initialRect.height / 2;
                const deltaX = currentX - initialRect.left;
                const deltaY = currentY - (initialRect.top + window.scrollY);

                const angle = body.angle; // Rotation en radians

                // Application de la transformation CSS
                dom.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${angle}rad)`;
                // Force le hardware acceleration
                dom.style.willChange = 'transform';
            });
        });

        // Lancement du moteur
        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);

        // Fonction de nettoyage quand on quitte la page
        return () => {
            Runner.stop(runner);
            Matter.Engine.clear(engine);
            World.clear(world);
            // Note: Réinitialiser le DOM est très complexe, 
            // l'effet Antigravity est souvent un "aller simple".
        };
    }, [isActive, containerRef]);
};
