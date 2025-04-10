import { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useMotionValue,
  animate,
} from "framer-motion";
import "./Projects.css";

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
          {cards.map((card) => (
            <div
              key={card.id}
              className="cardd"
              onClick={() => setSelectedProject(card)}
            >
              <div
                className="card-image"
                style={{ backgroundImage: `url(${card.url})` }}
              />
              <div className="card-overlay">
                <p className="card-text">{card.title}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Modal de Projeto */}
      {selectedProject && (
        <div className="project-modal">
          <button
            className="close-button"
            onClick={() => setSelectedProject(null)}
          >
            ✕ Fechar
          </button>
          <h2>{selectedProject.title}</h2>
          <p>
            Aqui você pode colocar uma descrição do projeto, tecnologias usadas,
            link para o GitHub, deploy, etc.
          </p>
          <div className="modal-footer">
            <button
              className="bottom-close-button"
              onClick={() => setSelectedProject(null)}
            >
              Fechar Janela
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

const cards = [
  { id: 1, url: "/imgs/abstract/1.jpg", title: "Projeto 1" },
  { id: 2, url: "/imgs/abstract/2.jpg", title: "Projeto 2" },
  { id: 3, url: "/imgs/abstract/3.jpg", title: "Projeto 3" },
  { id: 4, url: "/imgs/abstract/4.jpg", title: "Projeto 4" },
  { id: 5, url: "/imgs/abstract/5.jpg", title: "Projeto 5" },
  { id: 6, url: "/imgs/abstract/6.jpg", title: "Projeto 6" },
  { id: 7, url: "/imgs/abstract/7.jpg", title: "Projeto 7" },
];

export default Projects;
