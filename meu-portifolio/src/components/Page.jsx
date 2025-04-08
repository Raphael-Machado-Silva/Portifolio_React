import React, { Suspense, lazy, useState, useEffect } from "react";
import { motion } from "framer-motion";
import ParticlesBackground from "./ParticlesBackground";
import './Page.css';
import CustomCursor from "./CustomCursor";

// Lazy loading das páginas
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Services = lazy(() => import("../pages/Services"));
const Skills = lazy(() => import("../pages/Skills"));
const Timeline = lazy(() => import("../pages/Timeline"));
const Projects = lazy(() => import("../pages/Projects"));
const Contact = lazy(() => import("../pages/Contact"));

const Page = () => {
  const [visibleSections, setVisibleSections] = useState({
    home: false,
    about: false,
    services: false,
    skills: false,
    timeline: false,
    projects: false,
    contact: false,
  });

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      const ratio = entry.intersectionRatio;

      setVisibleSections((prev) => {
        if (ratio >= 0.3) {
          return { ...prev, [id]: true }; // Mostrar ao atingir 30%
        } else if (ratio <= 0.15) {
          return { ...prev, [id]: false }; // Esconder ao cair para 15% ou menos
        }
        return prev; // Não faz nada entre 15% e 30%
      });
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0, 0.15, 0.3, 1],
    });

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const renderSection = (id, Component) => (
    <section id={id}>
      {visibleSections[id] && (
        <Suspense fallback={<div></div>}>
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              duration: 1.5,
              delay: 0.2,
            }}
          >
            <Component />
          </motion.div>
        </Suspense>
      )}
    </section>
  );

  return (
    <div className="container-global">
      <ParticlesBackground />
      <CustomCursor />

      {renderSection("home", Home)}
      {renderSection("about", About)}
      {renderSection("services", Services)}
      {renderSection("skills", Skills)}
      {renderSection("timeline", Timeline)}
      {renderSection("projects", Projects)}
      {renderSection("contact", Contact)}
    </div>
  );
};

export default Page;
