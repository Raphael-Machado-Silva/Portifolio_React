import React, { Suspense, lazy, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ParticlesBackground from "./ParticlesBackground";
import CustomCursor from "./CustomCursor";
import FancyTitle from "../components/FancyTitle";
import QuestionIcon from "./QuestionIcon";
import Footer from "../pages/Footer";

import "./Page.css";

// Lazy-loaded components
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Services = lazy(() => import("../pages/Services"));
const Skills = lazy(() => import("../pages/Skills"));
const Timeline = lazy(() => import("../pages/Timeline"));
const Projects = lazy(() => import("../pages/Projects"));
const Contact = lazy(() => import("../pages/Contact"));

// Lista de seções
const sectionsList = [
  { id: "home", component: Home },
  { id: "about", component: About },
  { id: "services", component: Services, minHeightMobile: 1500, minHeightDesktop: 800 },
  { id: "skills", component: Skills },
  { id: "timeline", component: Timeline, minHeightMobile: 1500, minHeightDesktop: 600 },
  { id: "projects", component: Projects, title: "Projetos", background: "PROJETOS", threshold: 0.1 }, // 👈 Só aqui com 10%
  { id: "contact", component: Contact, title: "Contato", background: "CONTATO" },
];

// Wrapper para cada seção
const SectionWrapper = ({
  id,
  Component,
  title,
  background,
  minHeightMobile,
  minHeightDesktop,
  minHeight,
  threshold = 0.2, // 👈 Valor padrão
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    threshold,
    triggerOnce: true,
  });

  const getMinHeight = () => {
    if (minHeight) return minHeight;
    if (typeof window !== "undefined") {
      return window.innerWidth < 650 ? minHeightMobile || 600 : minHeightDesktop || 400;
    }
    return 600;
  };

  return (
    <section
      id={id}
      ref={ref}
      style={{
        minHeight: `${getMinHeight()}px`,
        visibility: isInView ? "visible" : "hidden",
        opacity: isInView ? 1 : 0,
        transition: "opacity 0.3s ease",
        position: "relative",
      }}
    >
      <FancyTitle title={title} background={background} />
      <Suspense fallback={<div style={{ height: getMinHeight() }} />}>
        <motion.div
          initial={{ x: 160, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            duration: 1.5,
            delay: 0.5,
          }}
        >
          <Component />
        </motion.div>
      </Suspense>
    </section>
  );
};

// Página principal
const Page = () => {
  return (
    <div className="container-global">
      <ParticlesBackground />
      <CustomCursor />
      <QuestionIcon />

      {sectionsList.map(({ id, component, title, background, minHeightMobile, minHeightDesktop, minHeight, threshold }) => (
        <SectionWrapper
          key={id}
          id={id}
          Component={component}
          title={title}
          background={background}
          minHeightMobile={minHeightMobile}
          minHeightDesktop={minHeightDesktop}
          minHeight={minHeight}
          threshold={threshold} // 👈 Passa o threshold específico se existir
        />
      ))}

      <Footer />
    </div>
  );
};

export default Page;
