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
import projectAurora from '../assets/project_aurora.png'
import projectBurguer from '../assets/project_burguer.png'
import projectLarPerfeito from '../assets/project_lar_perfeito.png'
import projectChess from '../assets/project_chess.jpeg'
import projectPopCorn from '../assets/project_popcornplay.png'
import projectPrevisao from '../assets/project_previsao_tempo.png'
import projectCadastro from '../assets/projects_cadasto.jpeg'

const techColors = {
  "React": "#31C9E4",
  "Tailwind": "#08BBD9",
  "Chart.js": "#ff6384",
  "Firebase": "#ffca28",
  "Framer Motion": "#e90",
  "Next.js": "#FFFFFF",
  "API REST": "#35495e",
  "MDX": "#f9ac00",
  "Supabase": "#3ecf8e",
  "Redux": "#764abc",
  "Stripe": "#635bff",
  "Design": "#ff6384",
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
    url: projectLarPerfeito,
    title: "Lar Perfeito",
    description: "Site desenvolvido em WordPress para um cliente, a mesma aplicação que se chama Lar Perfeito, com o objetivo de apresentar as residências e terrenos à venda do cliente, servindo como forma de contato e catálogo.",
    techs: ["WordPress", "Banco de Dados", "PHP", "JavaScript", "Design"],
    github: "https://github.com/seuusuario/projeto1",
    deploy: "https://projeto1.vercel.app",
  },
  {
    id: 2,
    url: projectBurguer,
    title: "Burguer & Brasa",
    description: "Uma experiência saborosa em forma de site, o Burguer & Brasa foi pensado para despertar o apetite com um visual marcante, animações envolventes e uma navegação que convida o cliente a fazer o pedido perfeito.",
    techs: ["HTML", "Tailwind", "JavaScript", "Design"],
    github: "https://github.com/seuusuario/projeto2",
    deploy: "https://projeto2.vercel.app",
  },
  {
    id: 3,
    url: projectPrevisao,
    title: "Previsão",
    description: "Este projeto é um site responsivo desenvolvido para oferecer uma experiência simples e intuitiva na consulta de previsões do tempo. Podendo logo pesquisar por qualquer cidade e obter rapidamente as condições climáticas atuais e dos próximos dias.",
    techs: ["React", "JavaScript", "CSS Modules", "API REST"],
    github: "https://github.com/seuusuario/projeto3",
    deploy: "https://projeto3.vercel.app",
  },
  {
    id: 4,
    url: projectChess,
    title: "Chess Game",
    description: "Um desafio estratégico dentro e fora do tabuleiro. Esse projeto de xadrez foi desenvolvido do zero, com foco total na lógica do jogo, regras oficiais e uma interface pensada para oferecer uma experiência imersiva e inteligente ao jogador.",
    techs: ["React", "JavaScript", "CSS"],
    github: "https://github.com/seuusuario/projeto4",
    deploy: "https://projeto4.vercel.app",
  },
  {
    id: 5,
    url: projectAurora,
    title: "Aurora",
    description: "Aurora é uma loja virtual de roupas desenvolvida como meu primeiro projeto em WordPress. Nascido após a conclusão dos cursos de Wordpress, esse projeto marca o início da minha jornada com CMS, unindo praticidade, design e funcionalidade em uma vitrine online moderna.",
    techs: ["WordPress", "Banco de Dados", "PHP", "JavaScript", "Design"],
    github: "https://github.com/seuusuario/projeto5",
    deploy: "https://projeto5.vercel.app",
  },
  {
    id: 6,
    url: projectPopCorn,
    title: "Pop Corn Play",
    description: "PopcornPlay é uma plataforma interativa voltada para amantes de filmes e séries. Com uma interface moderna e intuitiva, permite explorar títulos, descobrir sinopses, trailers e avaliações, tudo em um só lugar. Uma verdadeira experiência cinematográfica direto do navegador.",
    techs: ["React", "JavaScript", "API REST", "CSS Modules"],
    github: "https://github.com/seuusuario/projeto7",
    deploy: "https://projeto7.vercel.app",
  },
  {
    id: 7,
    url: projectCadastro,
    title: "Cadastro ",
    description: "Sistema completo de registro de usuários, com funcionalidades que vão desde o cadastro até a exibição dinâmica de dados. Um projeto que consolidou meus conhecimentos e me proporcionou uma experiência prática valiosa no desenvolvimento de aplicações modernas.",
    techs: ["React", "API REST", "Banco de Dados", "CSS"],
    github: "https://github.com/seuusuario/projeto8",
    deploy: "https://projeto8.vercel.app",
  },
];


export default Projects;
