import React, { Suspense, lazy, useState, useEffect } from "react";
import { motion } from "framer-motion";
import ParticlesBackground from "./ParticlesBackground";
import './Page.css'

// Lazy loading das páginas
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Skills = lazy(() => import("../pages/Skills"));
const Timeline = lazy(() => import("../pages/Timeline"));
const Projects = lazy(() => import("../pages/Projects"));
const Contact = lazy(() => import("../pages/Contact"));

const Page = () => {
  const [visibleSections, setVisibleSections] = useState({
    home: false,
    about: false,
    skills: false,
    timeline: false,
    projects: false,
    contact: false,
  });

  // Função para verificar a visibilidade das seções
  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setVisibleSections((prev) => ({
          ...prev,
          [entry.target.id]: true, // Marcar a seção como visível
        }));
      } else {
        setVisibleSections((prev) => ({
          ...prev,
          [entry.target.id]: false, // Marcar a seção como invisível
        }));
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, // O conteúdo será considerado visível quando 20% da seção estiver visível
    });

    // Observa as seções
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      // Limpeza do observer
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="container-global">
      <ParticlesBackground/>
      {/* Seções com lazy loading e animação de entrada */}
      <section id="home">
        {visibleSections.home && (
          <Suspense fallback={<div></div>}>
            <motion.div
              initial={{ x: "100%", opacity: 0 }}  // Começa da direita e invisível
              animate={{ x: 0, opacity: 1 }}       // Vai para o centro e fica visível
              transition={{
                type: "spring",        // Tipo de animação "spring"
                stiffness: 50,         // Menos rigidez para uma animação mais suave
                damping: 20,           // Mais desaceleração para suavizar a animação
                duration: 1.5,         // Duração maior para uma transição mais suave
                delay: 0.2            // Adiciona um pequeno delay para melhorar a fluidez
              }}
            >
              <Home />
            </motion.div>
          </Suspense>
        )}
      </section>

      <section id="about">
        {visibleSections.about && (
          <Suspense fallback={<div></div>}>
            <motion.div
              initial={{ x: "100%", opacity: 0 }}  // Começa da direita e invisível
              animate={{ x: 0, opacity: 1 }}       // Vai para o centro e fica visível
              transition={{
                type: "spring",        // Tipo de animação "spring"
                stiffness: 50,         // Menos rigidez para uma animação mais suave
                damping: 20,           // Mais desaceleração para suavizar a animação
                duration: 1.5,         // Duração maior para uma transição mais suave
                delay: 0.2            // Adiciona um pequeno delay para melhorar a fluidez
              }}
            >
              <About />
            </motion.div>
          </Suspense>
        )}
      </section>

      <section id="skills">
        {visibleSections.skills && (
          <Suspense fallback={<div></div>}>
            <motion.div
              initial={{ x: "100%", opacity: 0 }}  // Começa da direita e invisível
              animate={{ x: 0, opacity: 1 }}       // Vai para o centro e fica visível
              transition={{
                type: "spring",        // Tipo de animação "spring"
                stiffness: 50,         // Menos rigidez para uma animação mais suave
                damping: 20,           // Mais desaceleração para suavizar a animação
                duration: 1.5,         // Duração maior para uma transição mais suave
                delay: 0.2            // Adiciona um pequeno delay para melhorar a fluidez
              }}
            >
              <Skills />
            </motion.div>
          </Suspense>
        )}
      </section>

      <section id="timeline">
        {visibleSections.timeline && (
          <Suspense fallback={<div></div>}>
            <motion.div
              initial={{ x: "100%", opacity: 0 }}  // Começa da direita e invisível
              animate={{ x: 0, opacity: 1 }}       // Vai para o centro e fica visível
              transition={{
                type: "spring",        // Tipo de animação "spring"
                stiffness: 50,         // Menos rigidez para uma animação mais suave
                damping: 20,           // Mais desaceleração para suavizar a animação
                duration: 1.5,         // Duração maior para uma transição mais suave
                delay: 0.2            // Adiciona um pequeno delay para melhorar a fluidez
              }}
            >
              <Timeline />
            </motion.div>
          </Suspense>
        )}
      </section>

      <section id="projects">
        {visibleSections.projects && (
          <Suspense fallback={<div></div>}>
            <motion.div
              initial={{ x: "100%", opacity: 0 }}  // Começa da direita e invisível
              animate={{ x: 0, opacity: 1 }}       // Vai para o centro e fica visível
              transition={{
                type: "spring",        // Tipo de animação "spring"
                stiffness: 50,         // Menos rigidez para uma animação mais suave
                damping: 20,           // Mais desaceleração para suavizar a animação
                duration: 1.5,         // Duração maior para uma transição mais suave
                delay: 0.2            // Adiciona um pequeno delay para melhorar a fluidez
              }}
            >
              <Projects />
            </motion.div>
          </Suspense>
        )}
      </section>

      <section id="contact">
        {visibleSections.contact && (
          <Suspense fallback={<div></div>}>
            <motion.div
              initial={{ x: "100%", opacity: 0 }}  // Começa da direita e invisível
              animate={{ x: 0, opacity: 1 }}       // Vai para o centro e fica visível
              transition={{
                type: "spring",        // Tipo de animação "spring"
                stiffness: 50,         // Menos rigidez para uma animação mais suave
                damping: 20,           // Mais desaceleração para suavizar a animação
                duration: 1.5,         // Duração maior para uma transição mais suave
                delay: 0.2            // Adiciona um pequeno delay para melhorar a fluidez
              }}
            >
              <Contact />
            </motion.div>
          </Suspense>
        )}
      </section>
    </div>
  );
};

export default Page;
