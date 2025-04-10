import { useRef, useState, useEffect } from "react";

export default function useElementScrollPercentage(threshold = 0.5) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const visibilityRatio = visibleHeight / rect.height;

      setIsVisible(visibilityRatio >= threshold);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return [ref, isVisible];
}
