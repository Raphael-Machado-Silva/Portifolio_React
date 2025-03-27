// src/pages/Home.jsx
import React from "react";
import './Home.css';
import TypingEffect from "../components/TypingEffect"; // Importe o componente TypingEffect
import Scroll from '../assets/scroll2.gif'

const Home = () => {
  return (
    <div className="home_container">
      <div className="titles">
        <h1 className="welcome">BEM-VINDO AO MEU PORTIFÓLIO</h1>
        <div className="texts">
          <div className="intro-container">
            <h2 className="intro-title">Me chamo <span className="highlight">Raphael Machado</span> e estou aqui para te ajudar!</h2>
          </div>

          {/* Substitua o texto fixo por TypingEffect */}
          <TypingEffect />
          <a href="" className="scroll-a"><i className="fa-solid fa-computer-mouse scroll"></i></a>
        </div>
      </div>
    </div>
  );
};

export default Home;
