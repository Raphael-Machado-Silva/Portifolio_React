import React, { useState } from "react";
import './QuestionIcon.css';
import Robot from '../assets/robot1.jpg'; // Certifique-se de ter a imagem do robô aqui
import LoadingDots from '../assets/loading.webm'; // Certifique-se de adicionar o caminho correto do arquivo .webm

const QuestionIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Dicionário com informações para cada opção
  const infoDictionary = {
    "Sobre Raphael": "Ele é apaixonado por tecnologia e desenvolvimento. Curioso, autodidata e sempre buscando evoluir tanto profissional quanto pessoalmente.",
    "Opção 2": "No momento, ele está em busca da minha primeira oportunidade na área. Enquanto isso, venho atuando com projetos freelancer para ganhar experiência prática.",
    "Opção 3": "O objetivo dele é crescer junto à empresa que me der uma chance, contribuindo com dedicação e evoluindo rumo à realização do sonho de dominar cada vez mais esta área.",
  };
  

  const toggleWindow = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsLoading(true); // Ativa o loading (bolinhas) enquanto exibe a resposta
    setTimeout(() => {
      setIsLoading(false); // Desativa o loading depois de um tempo (simulando o "processamento" da resposta)
    }, 2000); // 2 segundos de animação (ajuste conforme necessário)
  };

  return (
    <div>
      {/* Ícone de ponto de interrogação */}
      <div className="question-icon" onClick={toggleWindow}>
        ?
      </div>

      {/* Janela de opções */}
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <div className="robot_assist">
                <img
                    src={Robot} // Coloque aqui o link da imagem do robô
                    alt="Robô"
                    className="robot-img"
                />
                <div className="byte_infos">
                    <h2 className="name_robot">Byte</h2>
                    <p className="status_robot">online</p>
                </div> 
            </div>

            <p className="balao2">Olá sou Byte assistente do Raphael gostaria de algo?</p>
            <div className="options">
              <button onClick={() => handleOptionClick("Sobre Raphael")}> + de Raphael</button>
              <button onClick={() => handleOptionClick("Opção 2")}>Experiências</button>
              <button onClick={() => handleOptionClick("Opção 3")}>Futuro</button>
            </div>

            {/* Animação de bolinhas piscando (usando o arquivo .webm) */}
            {isLoading && (
              <div className="loading-dots">
                <video loop autoPlay muted>
                  <source src={LoadingDots} type="video/webm" />
                  Seu navegador não suporta o formato WebM.
                </video>
              </div>
            )}

            {/* Texto dependendo da opção selecionada */}
            {selectedOption && !isLoading && (
              <div className="option-text">
                    <img
                    src={Robot} // Coloque aqui o link da imagem do robô
                    alt="Robô"
                    className="robot-img robot_img_response"
                />
            
                <p className="balao3">{infoDictionary[selectedOption]}</p> {/* Exibe o texto correspondente da opção */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionIcon;
