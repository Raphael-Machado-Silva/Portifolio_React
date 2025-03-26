import React, { createContext, useState, useEffect, useContext } from "react";
import Loading from "../components/Loading"; // Supondo que a animação Lottie esteja aqui

export const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento
  const [loading, setLoading] = useState(0); // Caso queira acompanhar o percentual de carregamento
  const [isFullScreen, setIsFullScreen] = useState(false); // Controla a tela de fundo branca
  const [revealContent, setRevealContent] = useState(false); // Controla quando o conteúdo aparece

  useEffect(() => {
    // Controlando a duração do carregamento (ex: 4.2 segundos)
    const timer = setTimeout(() => {
      setIsLoading(false); // Após o tempo, o carregamento termina
      setIsFullScreen(true); // Aplica a tela branca
      setTimeout(() => {
        setRevealContent(true); // Depois de mais um tempo, revela o conteúdo principal
      }, 1000); // Deixa a tela branca deslizar por 1 segundo antes de revelar
    }, 4200); // Modifique para o tempo que deseja

    return () => clearTimeout(timer); // Limpar o timer se o componente for desmontado
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, setLoading }}>
      {isLoading && <Loading percent={loading} />} {/* Exibindo a animação Lottie */}

      {/* Tela branca com animação */}
      {isFullScreen && <div className="fullscreen-white"></div>}

      {/* Conteúdo principal */}
      <main className={`main-body ${revealContent ? "reveal-content" : ""}`}>
        {children}
      </main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
