import React from "react";
import { motion } from "framer-motion";
import "./Services.css"; // Importando o CSS

const services = [
  { 
    icon: "fas fa-globe", 
    title: "Web Design", 
    description: "Criação de sites responsivos e interativos usando HTML, CSS, JavaScript, React e Wordpress."
  },
  { 
    icon: "fas fa-pencil-ruler", 
    title: "UI/UX", 
    description: "Desenvolvimento de interfaces intuitivas e experiência do usuário com Figma e Adobe XD."
  },
  { 
    icon: "fas fa-mobile-alt", 
    title: "Desenvolvimento de Web", 
    description: "Construção de aplicações modernas com React, Node.js e bancos de dados como Firebase."
  },
  { 
    icon: "fas fa-chart-line", 
    title: "SEO Google", 
    description: "Otimização de sites para ranqueamento no Google utilizando práticas de SEO avançadas."
  },
];

const Services = () => {
  return (
    <section id="services" className="service">
      <div className="service_title">
        <h2 className="main-titlee obj">O que eu ofereço?</h2>
        <h2 className="background-title-service">SERVIÇOS</h2>
      </div>
      <div className="service-offices">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="service-info"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="service-icon obj">
              <i className={service.icon}></i>
            </div>
            <div className="service-text obj">
              <p>{service.title}</p>
            </div>
            <div className="tooltip-wrapper">
              <div className="tooltip-arrow obj"><i className="fa-solid fa-circle-info"></i></div>
              <div className="service-description">{service.description}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
