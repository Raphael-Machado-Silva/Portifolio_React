// ParticlesBackground.jsx
import React, { useEffect } from 'react';

const ParticlesBackground = () => {
    useEffect(() => {
      window.particlesJS('particles-background', {
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          shape: {
            type: 'circle',
          },
          color: {
            value: '#ffffff',
          },
          opacity: {
            value: 0.5,
            random: true,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
            },
          },
          size: {
            value: 3,
            random: true,
            animation: {
              enable: true,
              speed: 40,
              minimumValue: 0.1,
            },
          },
          links: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.5,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            outMode: 'out',
          },
        },
      });
    }, []);
  
    return (
      <div
        id="particles-background"
        style={{
          position: 'fixed', // Garante que o fundo fique fixo
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1, // Coloca as partículas atrás de todos os outros elementos
        }}
      />
    );
  };
  

export default ParticlesBackground;
