import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
        <p className="footer__text">
            © {new Date().getFullYear()} Raphael Machado. Todos os direitos reservados.
        </p>

        <p className="footer__subtext obj">
            Desenvolvido com React, criatividade e café ☕
        </p>
    </footer>
  );
};

export default Footer;
