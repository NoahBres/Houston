import { useState, useEffect } from "react";

export default function useWindowSize() {
  const isClient = typeof window === "object";

  const [windowSize, setWindowSize] = useState({
    innerHeight: isClient ? window.innerHeight : undefined,
    innerWidth: isClient ? window.innerWidth : undefined,
    outerHeight: isClient ? window.outerHeight : undefined,
    outerWidth: isClient ? window.outerWidth : undefined
  });

  useEffect(() => {
    if (!isClient) return false;

    function handleResize() {
      setWindowSize({
        innerHeight: isClient ? window.innerHeight : undefined,
        innerWidth: isClient ? window.innerWidth : undefined,
        outerHeight: isClient ? window.outerHeight : undefined,
        outerWidth: isClient ? window.outerWidth : undefined
      });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient]);

  return windowSize;
}
