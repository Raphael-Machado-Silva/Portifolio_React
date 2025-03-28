import React, { useState, useEffect } from "react";
import '../pages/Home.css'; // Não se esqueça de importar os estilos!

const TypingEffect = () => {
  const fixedText = "Sou ";  // Texto fixo
  const words = ["desenvolvedor front-end", "front-end developer"]; // Palavras que vão alternar
  const [currentText, setCurrentText] = useState(fixedText);
  const [currentIndex, setCurrentIndex] = useState(0); // Índice da palavra
  const [isDeleting, setIsDeleting] = useState(false); // Flag para saber se está apagando
  const [speed, setSpeed] = useState(100); // Velocidade de digitação/apagamento

  useEffect(() => {
    let interval;

    const fullText = fixedText + words[currentIndex];

    const handleTextChange = () => {
      if (isDeleting) {
        // Apagar o texto
        setCurrentText(prev => prev.slice(0, prev.length - 1));
      } else {
        // Escrever o texto
        setCurrentText(prev => fullText.slice(0, prev.length + 1));
      }

      // Iniciar apagamento após o texto completo ser escrito
      if (!isDeleting && currentText === fullText) {
        // Aguardar 1 segundo antes de começar a apagar
        setSpeed(50); // Acelera o apagamento
        setTimeout(() => setIsDeleting(true), 1000);
      }

      // Trocar de palavra ou recomeçar o processo
      if (isDeleting && currentText === fixedText) {
        setSpeed(100); // Retorna a velocidade normal
        setIsDeleting(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length); // Alterna entre as palavras
      }
    };

    // Atualiza o texto a cada "speed" ms
    interval = setInterval(handleTextChange, speed);

    return () => clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
  }, [currentText, isDeleting, currentIndex, speed]);

  return (
    <div className="div-changing">
      <h2 className="h2-changing">
        <span className="fixed">{fixedText}</span>
        <span className="changing">{currentText.slice(fixedText.length)}</span>
        <span className="typing-cursor">I</span>
      </h2>
    </div>
  );
};

export default TypingEffect;
