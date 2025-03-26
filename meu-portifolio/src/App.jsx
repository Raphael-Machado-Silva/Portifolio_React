// src/App.js
import React, { useEffect } from "react";
import { LoadingProvider, useLoading } from "./contexts/LoadingContext";  // Importando os arquivos criados
import "./App.css";
import Page from "./components/Page"; // Componente Page para as rotas
import { BrowserRouter } from "react-router-dom";  // Importando o BrowserRouter
import Header from "./components/Header";  // Importando o Header fixo

const App = () => {
  return (
    <LoadingProvider>
      <BrowserRouter>  {/* Envolvendo a aplicação com BrowserRouter */}
        <Header />
        <Content />
      </BrowserRouter>
    </LoadingProvider>
  );
};

const Content = () => {
  const { setLoading, setIsLoading } = useLoading();  // Usando o hook

  useEffect(() => {
    const loadData = async () => {
      let percent = 0;
      while (percent < 100) {
        setLoading(percent);
        percent += 10;
        await new Promise((resolve) => setTimeout(resolve, 500));  // Simulando carregamento
      }
      setIsLoading(false);  // Finaliza o carregamento
    };

    loadData();
  }, [setLoading, setIsLoading]);

  return <Page />;  // Retorna o componente Page após o carregamento
};

export default App;
