import { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useMotionValue,
  animate,
  AnimatePresence,
} from "framer-motion";
import "./Projects.css";

const techColors = {
  "React": "#31C9E4",
  "Tailwind": "#08BBD9",
  "Chart.js": "#ff6384",
  "Firebase": "#ffca28",
  "Framer Motion": "#e90",
  "Next.js": "#FFFFFF",
  "AOS": "#35495e",
  "MDX": "#f9ac00",
  "Supabase": "#3ecf8e",
  "Redux": "#764abc",
  "Stripe": "#635bff",
  "YouTube API": "#ff0000",
  "CSS Modules": "#2965f1",
  "GSAP": "#88ce02",
  "HTML": "#e34c26",
  "CSS": "#264de4",
  "JavaScript": "#F7E11F",
  "WordPress": "#21759b",
  "Python": "#3572A5",
  "Banco de Dados": "#4db33d"
};


const Projects = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const [isStuck, setIsStuck] = useState(false);
  const [scrollReady, setScrollReady] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [selectedProject, setSelectedProject] = useState(null);

  const x = useMotionValue(0);
  const xManual = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const scrollX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -trackWidth + window.innerWidth]
  );

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScrollDir = () => {
      const currY = window.scrollY;
      setScrollDirection(currY > lastY ? "down" : "up");
      lastY = currY;
    };
    window.addEventListener("scroll", handleScrollDir);
    return () => window.removeEventListener("scroll", handleScrollDir);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollX.on("change", (latest) => {
      if (!isExiting) {
        x.set(latest);
        xManual.set(latest);
      }
    });
    return () => unsubscribe();
  }, [scrollX, isExiting]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const middleOfScreen = window.innerHeight / 2;
      const inMiddle = rect.top < middleOfScreen && rect.bottom > middleOfScreen;

      if (inMiddle && !isStuck && !isExiting) {
        setIsStuck(true);
        setScrollReady(true);
      } else if (!inMiddle && isStuck && !isExiting) {
        const latestX = x.get();
        xManual.set(latestX);

        setIsExiting(true);
        setScrollReady(false);

        const targetX =
          scrollDirection === "up" ? 0 : -trackWidth + window.innerWidth;

        animate(xManual, targetX, {
          duration: 0.5,
          ease: "easeOut",
          onComplete: () => {
            requestAnimationFrame(() => {
              setIsStuck(false);
              setIsExiting(false);
            });
          },
        });
      }
    };

    const updateTrackWidth = () => {
      if (trackRef.current) {
        const width = trackRef.current.scrollWidth;
        setTrackWidth(width);
      }
    };

    handleScroll();
    updateTrackWidth();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateTrackWidth);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateTrackWidth);
    };
  }, [isStuck, isExiting, scrollDirection, x]);

  return (
    <section ref={sectionRef} className="projects-section">
      <div className={`sticky-container ${isStuck ? "fixed" : "released"}`}>
        <motion.div
          ref={trackRef}
          className="cards-scroll-track"
          style={{ x: isExiting ? xManual : scrollReady ? scrollX : 0 }}
          initial={{ opacity: 0, y: 100 }}
          animate={scrollReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="projects-hover-container-projects">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`cardd obj ${selectedProject?.id === card.id ? "selected" : ""}`}
                onClick={() => setSelectedProject(card)}
              >
                <div className="card-image" style={{ backgroundImage: `url(${card.url})` }} />
                <div className="card-overlay">
                  <p className="card-text">{card.title}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal"
            initial={{ opacity: 0, scale: 0.95, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <button className="close-button" onClick={() => setSelectedProject(null)}>✕</button>
            <h2 className="info_cards_title">{selectedProject.title}</h2>
            <p className="info_cards_description">{selectedProject.description}</p>

            {selectedProject.techs && (
              <div className="tech-tags">
                {selectedProject.techs.map((tech, index) => (
                  <span
                    key={index}
                    className="tech-tag obj"
                    style={{
                      backgroundColor: techColors[tech] || "#ccc",
                      color: "black",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="modal-links">
              {selectedProject.github && (
                <button className="fancy-btn obj">
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                    <span className="btn-content">
                      <span aria-hidden="true" className="left-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577
                            0-.285-.01-1.04-.015-2.04-3.338.727-4.042-1.613-4.042-1.613-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729
                            1.204.085 1.837 1.237 1.837 1.237 1.07 1.834 2.809 1.304 3.495.996.107-.775.418-1.305.76-1.605-2.665-.3-5.466-1.334-5.466-5.933
                            0-1.312.469-2.382 1.236-3.22-.124-.303-.536-1.523.117-3.176
                            0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.403c1.02.005 2.045.137 3.003.403
                            2.29-1.552 3.295-1.23 3.295-1.23.655 1.653.243 2.873.12 3.176.77.838 1.235 1.908
                            1.235 3.22 0 4.61-2.804 5.628-5.475 5.922.43.37.813 1.103.813 2.222
                            0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24
                            17.298 24 12c0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </span>
                      <span>GitHub</span>
                      <span aria-hidden="true" className="right-icon">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </span>
                    </span>
                  </a>
                </button>
              )}

              {selectedProject.deploy && (
                <button className="fancy-btn obj">
                  <a href={selectedProject.deploy} target="_blank" rel="noopener noreferrer">
                    <span className="btn-content">
                      <span aria-hidden="true" className="left-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9H4V5zm16 11H4a1 1 0 0 0-1 1v1h18v-1a1 1 0 0 0-1-1z" />
                        </svg>
                      </span>
                      <span>Deploy</span>
                      <span aria-hidden="true" className="right-icon">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </span>
                    </span>
                  </a>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const cards = [
  {
    id: 1,
    url: "/imgs/abstract/1.jpg",
    title: "Projeto 1",
    description: "Dashboard administrativo com painéis interativos e responsivos.",
    techs: ["React", "JavaScript", "HTML", "CSS", "Banco de Dados"],
    github: "https://github.com/seuusuario/projeto1",
    deploy: "https://projeto1.vercel.app",
  },
  {
    id: 2,
    url: "/imgs/abstract/2.jpg",
    title: "Projeto 2",
    description: "App de tarefas com autenticação e armazenamento em nuvem.",
    techs: ["React", "Firebase", "Framer Motion"],
    github: "https://github.com/seuusuario/projeto2",
    deploy: "https://projeto2.vercel.app",
  },
  {
    id: 3,
    url: "/imgs/abstract/3.jpg",
    title: "Projeto 3",
    description: "Landing page moderna e animada para startups.",
    techs: ["Next.js", "Tailwind", "AOS"],
    github: "https://github.com/seuusuario/projeto3",
    deploy: "https://projeto3.vercel.app",
  },
  {
    id: 4,
    url: "/imgs/abstract/4.jpg",
    title: "Projeto 4",
    description: "Sistema de blog com markdown e painel administrativo.",
    techs: ["Next.js", "MDX", "Supabase"],
    github: "https://github.com/seuusuario/projeto4",
    deploy: "https://projeto4.vercel.app",
  },
  {
    id: 5,
    url: "/imgs/abstract/5.jpg",
    title: "Projeto 5",
    description: "Loja virtual com carrinho e integração com Stripe.",
    techs: ["React", "Redux", "Stripe"],
    github: "https://github.com/seuusuario/projeto5",
    deploy: "https://projeto5.vercel.app",
  },
  {
    id: 6,
    url: "/imgs/abstract/6.jpg",
    title: "Projeto 6",
    description: "Clonagem do YouTube com pesquisa de vídeos via API.",
    techs: ["React", "YouTube API", "CSS Modules"],
    github: "https://github.com/seuusuario/projeto6",
    deploy: "https://projeto6.vercel.app",
  },
  {
    id: 7,
    url: "/imgs/abstract/7.jpg",
    title: "Projeto 7",
    description: "Portfolio animado com seções interativas e scroll horizontal.",
    techs: ["React", "Framer Motion", "GSAP"],
    github: "https://github.com/seuusuario/projeto7",
    deploy: "https://projeto7.vercel.app",
  },
];

export default Projects;
