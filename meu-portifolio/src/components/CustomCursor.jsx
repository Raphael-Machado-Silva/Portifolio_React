// src/components/CustomCursor.jsx
import { useEffect, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const circleRef = useRef(null);
  const circleInnerRef = useRef(null);

  useEffect(() => {
    const circle = circleRef.current;
    const circleInner = circleInnerRef.current;

    const mouse = { x: 0, y: 0 };
    const previousMouse = { x: 0, y: 0 };
    const circlePos = { x: 0, y: 0 };
    let currentScale = 0;
    let currentAngle = 0;
    const speed = 0.17;

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const elementUnderMouse = document.elementFromPoint(mouse.x, mouse.y);
      if (elementUnderMouse && (elementUnderMouse.classList.contains('obj') || elementUnderMouse.closest('.obj'))) {
        circleInner.classList.add('circle-center');
      } else {
        circleInner.classList.remove('circle-center');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const tick = () => {
      circlePos.x += (mouse.x - circlePos.x) * speed;
      circlePos.y += (mouse.y - circlePos.y) * speed;

      const deltaMouseX = mouse.x - previousMouse.x;
      const deltaMouseY = mouse.y - previousMouse.y;
      previousMouse.x = mouse.x;
      previousMouse.y = mouse.y;

      const mouseVelocity = Math.min(Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4, 150);
      const scaleValue = (mouseVelocity / 150) * 0.5;
      currentScale += (scaleValue - currentScale) * speed;

      const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;
      if (mouseVelocity > 20) currentAngle = angle;

      const translate = `translate(${circlePos.x}px, ${circlePos.y}px)`;
      const scale = `scale(${1 + currentScale}, ${1 - currentScale})`;
      const rotate = `rotate(${currentAngle}deg)`;

      circle.style.transform = `${translate} ${rotate} ${scale}`;

      requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="circle" ref={circleRef}>
      <div ref={circleInnerRef}></div>
    </div>
  );
};

export default CustomCursor;
