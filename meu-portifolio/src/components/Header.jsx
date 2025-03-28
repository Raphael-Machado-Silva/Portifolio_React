import React, { useState } from 'react';
import './Header.css';
import logo from '../assets/lg3.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Função para alternar o estado do menu (aberto/fechado)
  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);  // Alterna entre true e false
    console.log("Menu aberto:", !menuOpen); // Log para verificar o estado do menu
  };

  return (
    <header>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Botão do menu hambúrguer (só aparece em telas menores que 900px) */}
      <div
        className={`hamburger-lines ${menuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <span className="line line1"></span>
        <span className="line line2"></span>
        <span className="line line3"></span>
      </div>

      {/* Menu de navegação lateral */}
      <nav className={`menu ${menuOpen ? 'open' : ''}`}>
        <ul className='header_ul'>
          <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
          <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
          <li><a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a></li>
          <li><a href="#timeline" onClick={() => setMenuOpen(false)}>Timeline</a></li>
          <li><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a></li>
          <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
