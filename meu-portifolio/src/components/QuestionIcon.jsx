import React, { useState, useEffect, useRef } from "react";
import './QuestionIcon.css';
import Robot from '../assets/robot2.png';
import UserImage from '../assets/user (1).png'; // Imagem do usuário
import LoadingDots from '../assets/loading.webm';

const QuestionIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const infoDictionary = {
    "Sobre Raphael!": "Ele é apaixonado por tecnologia e desenvolvimento. Curioso, autodidata e sempre buscando evoluir tanto profissional quanto pessoalmente.",
    "Experiências!": "No momento, ele está em busca da primeira oportunidade na área. Enquanto isso, vem atuando com projetos freelancer para ganhar experiência prática.",
    "Futuro!": "O objetivo dele é crescer junto à empresa que der uma chance, contribuindo com dedicação e evoluindo rumo à realização do sonho de dominar cada vez mais esta área.",
    "Projetos!":  "O objetivo dele é realizar projetos desafiadores que tragam valor à empresa, contribuindo com dedicação e buscando sempre evoluir profissionalmente, com foco no aprimoramento contínuo e na excelência técnica.",
  };

  const toggleWindow = () => {
    if (isOpen) {
      setIsOpen(false);
      // Aguarda a animação de saída antes de remover do DOM
      setTimeout(() => setShouldRender(false), 300); // tempo da animação em ms
    } else {
      setShouldRender(true);
      // Garante que a classe open será aplicada no próximo tick
      setTimeout(() => setIsOpen(true), 0);
      setMessages([]); // limpa as mensagens ao abrir
    }
  };

  const handleOptionClick = (option) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { sender: 'user', text: option }]);

    setTimeout(() => {
      const response = infoDictionary[option] || "Desculpe, ainda estou aprendendo sobre isso!";
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: response }
      ]);
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div>
      <div className="question-icon obj" onClick={toggleWindow}>?</div>

      {shouldRender && (
        <div className={`popup ${isOpen ? 'open' : ''}`}>
          <div className="popup-content">
            <div className="robot_assist">
              <img src={Robot} alt="Robô" className="robot-img" />
              <div className="byte_infos">
                <h2 className="name_robot">Byte</h2>
                <p className="status_robot">online</p>
              </div>
            </div>

            <div className="chat-history">
              {messages.length === 0 && (
                <p className="balao2">Olá! Sou o Byte, assistente do Raphael. Como posso te ajudar?</p>
              )}

              {messages.map((msg, index) => (
                <div key={index} className={msg.sender === 'user' ? 'user-msg' : 'bot-msg'}>
                  {msg.sender === 'user' && (
                    <img src={UserImage} alt="Usuário" className="img_user" />
                  )}
                  {msg.sender === 'bot' && (
                    <img src={Robot} alt="Robô" className="robot-img robot_img_response" />
                  )}
                  <p className={`balao3 ${msg.sender === 'user' ? 'balao4' : ''}`}>{msg.text}</p>
                </div>
              ))}

              {isLoading && (
                <div className="loading-dots">
                  <video loop autoPlay muted>
                    <source src={LoadingDots} type="video/webm" />
                    Seu navegador não suporta o formato WebM.
                  </video>
                </div>
              )}

              <div ref={chatEndRef}></div>
            </div>

            <div className="options">
              <button onClick={() => handleOptionClick("Sobre Raphael!")}>+ de Raphael!</button>
              <button onClick={() => handleOptionClick("Experiências!")}>Experiências!</button>
              <button onClick={() => handleOptionClick("Futuro!")}>Futuro!</button>
              <button onClick={() => handleOptionClick("Projetos!")}>Projetos!</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionIcon;
