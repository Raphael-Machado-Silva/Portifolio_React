import React from "react";
import './About.css';
import PerfilImg from '../assets/foto_perfil.png';

const About = () => {
  return (
    <div className="about-container">
      {/* Seção de texto */}
      <div className="about-text">
        <div className="titles_background">
          <h2 className="background-title">Sobre Mim</h2>
          <h1 className="main-title obj">Sobre Mim</h1>
        </div>
        <p className="history">
          Olá! Meu nome é Seu Nome, sou sua profissão ou interesse. 
          Tenho paixão por seu foco principal e adoro compartilhar conhecimento e experiências.
        </p>
        <p className="p_two"> Tenho paixão por seu foco principal e adoro compartilhar conhecimento e experiências.
        Tenho paixão por seu foco principal e adoro compartilhar conhecimento e experiências.</p>
      </div>

      {/* Seção da foto */}
      <div className="about-image">
        <img src={PerfilImg} alt="Minha Foto" className="picture obj" />
      </div>
    </div>
  );
};

export default About;
