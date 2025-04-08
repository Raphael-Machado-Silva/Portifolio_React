import React, { useEffect, useRef } from "react";
import { FaSchool, FaUniversity, FaCode } from "react-icons/fa";
import { BsBriefcase } from "react-icons/bs";
import "./BasicTimeline.css";

const timelineData = [
  {
    title: "Ensino Médio Técnico",
    content: "Concluído na ETEC de Itanhaém – Técnico em Meio Ambiente integrado ao Ensino Médio.",
    icon: <FaSchool />,
  },
  {
    title: "Faculdade de Ciência da Computação",
    content: "Cursando na Estácio de Sá – focado em desenvolvimento e algoritmos.",
    icon: <FaUniversity />,
  },
  {
    title: "Projetos Autorais",
    content: "Desenvolvendo projetos próprios para praticar e consolidar meus conhecimentos.",
    icon: <FaCode />,
  },
  {
    title: "Buscando Estágio",
    content: "Ativamente procurando oportunidades para ingressar no mercado de trabalho.",
    icon: <BsBriefcase />,
  },
];

export default function BasicTimeline() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target;
          if (entry.isIntersecting) {
            card.classList.add("active");
          } else {
            card.classList.remove("active");
          }
        });
      },
      { threshold: 0.5 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <div className="timeline">

      <div className="titles_background_timeline">
          <h2 className="background-title-timeline">TIMELINE</h2>
          <h1 className="main-title obj">Linha do Tempo</h1>
      </div>

      <div className="outer">
        {timelineData.map((item, index) => (
          <div
            key={index}
            className="card"
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <div className="info">
              <h3 className="title obj">
                {/* Aqui é onde antes era o ::before */}
                <div className="dot obj">{item.icon}</div>
                {item.title}
              </h3>
              <p className="content-p">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
