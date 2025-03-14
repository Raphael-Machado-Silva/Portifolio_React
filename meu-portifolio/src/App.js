import React, { useEffect } from "react";
import { gsap } from "gsap"; // Importando o GSAP
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Importando o ScrollTrigger
import useLenis from "./useLenis"; // Importando o hook de rolagem suave
import './styles/global.css'; // Importando o CSS global

// Registrando o plugin ScrollTrigger do GSAP
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useLenis(); // Ativando o Lenis para rolagem suave

  useEffect(() => {
    // Animação do título "MEUS PROJETOS"
    gsap.fromTo(
      ".meus-projetos",
      {
        x: "0vw", // Começa no centro da tela
        opacity: 1, // O título começa visível
      },
      {
        x: "100vw", // O título vai se mover para a direita
        opacity: 0, // O título vai desaparecer
        scrollTrigger: {
          trigger: ".projetos-intro", // O título começa a animar ao rolar
          start: "top top", // Quando o topo do título atinge o topo da tela
          end: "bottom top", // Quando o fundo da seção atinge o topo
          scrub: 0.5, // Suaviza a animação
          pin: false, // Não fixa o título
          markers: false, // Desabilita os marcadores
        },
      }
    );
  }, []);

  useEffect(() => {
    // Garantir que o scroll inicial comece no topo da página
    window.scrollTo(0, 0); // Isso vai forçar o scroll a começar no topo
  }, []);

  return (
    <div className="app-container">
      {/* Seção do título "MEUS PROJETOS" */}
      <div className="projetos-intro">
        <h1 className="meus-projetos">MEUS PROJETOS</h1>
        {/* Seta abaixo do título */}
        <div className="arrow-down">↓</div> {/* Seta apontando para baixo */}
      </div>
    </div>
  );
};

export default App;
