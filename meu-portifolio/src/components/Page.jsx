import React, { Suspense, lazy, useState, useEffect } from "react";
import { motion } from "framer-motion";
import ParticlesBackground from "./ParticlesBackground";
import './Page.css';

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
    services: false,  // Adicionando services
    skills: false,
    timeline: false,
    projects: false,
    contact: false,
  });

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      setVisibleSections((prev) => ({
        ...prev,
        [entry.target.id]: entry.isIntersecting,
      }));
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2,
    });

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="container-global">
      <ParticlesBackground />

      <section id="home">
        {visibleSections.home && (
          <Suspense fallback={<div></div>}>
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 50, damping: 20, duration: 1.5, delay: 0.2 }}
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
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 50, damping: 20, duration: 1.5, delay: 0.2 }}
            >
              <About />
            </motion.div>
          </Suspense>
        )}
      </section>

      {/* Nova Seção Services */}
      <section id="services">
        {visibleSections.services && (
          <Suspense fallback={<div></div>}>
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 50, damping: 20, duration: 1.5, delay: 0.2 }}
            >
              <Services />
            </motion.div>
          </Suspense>
        )}
      </section>

      <section id="skills">
        {visibleSections.skills && (
          <Suspense fallback={<div></div>}>
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 50, damping: 20, duration: 1.5, delay: 0.2 }}
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
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 50, damping: 20, duration: 1.5, delay: 0.2 }}
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
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 50, damping: 20, duration: 1.5, delay: 0.2 }}
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
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 50, damping: 20, duration: 1.5, delay: 0.2 }}
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
