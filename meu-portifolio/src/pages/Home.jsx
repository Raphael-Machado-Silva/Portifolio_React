import React from "react";
import './Home.css';
import TypingEffect from "../components/TypingEffect"; // Importe o componente TypingEffect
import Scroll from '../assets/scroll2.gif';

const Home = () => {
  const handleScrollToAbout = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do link

    const target = document.getElementById('about');
    if (!target) return;

    // Função de rolagem suave
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800; // Duração em milissegundos (ajuste conforme desejado)

    let startTime = null;

    const animateScroll = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const scrollAmount = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, scrollAmount);

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animateScroll);
  };

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
          {/* Link de rolagem suave */}
          <a href="#about" className="scroll-a" onClick={handleScrollToAbout}>
            <i className="fa-solid fa-computer-mouse scroll"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
