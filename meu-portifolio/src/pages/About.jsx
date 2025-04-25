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
          Olá! Meu nome é Raphael Machado Silva, sou estudante de Ciência da Computação e desenvolvedor front-end em transição para full stack.
        </p>
        <p className="p_two">
          Sou apaixonado por tecnologia, experiência do usuário e estou em busca de uma oportunidade para crescer profissionalmente, contribuir com projetos reais e aprender cada vez mais.
        </p>

      </div>

      {/* Seção da foto */}
      <div className="about-image">
        <img src={PerfilImg} alt="Minha Foto" className="picture obj" />
      </div>
    </div>
  );
};

export default About;
