import { useEffect } from 'react';
import Lenis from 'lenis';

const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true, // Habilita rolagem suave
      lerp: 0.1, // Transição suave de rolagem
      duration: 1.2, // Duração do scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing customizado
      smoothWheel: true, // Ativa o scroll suave com o mouse
      smoothTouch: true, // Ativa o scroll suave no touch
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
};

export default useLenis;
