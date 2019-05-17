import { useState, useRef, useEffect } from "react";

export default function useHover() {
  const [isHovered, setIsHovered] = useState(false);

  const hoverRef = useRef(null);

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  useEffect(() => {
    const elem = hoverRef.current;

    if (elem) {
      elem.addEventListener("mouseover", handleMouseOver);
      elem.addEventListener("mouseout", handleMouseOut);

      return () => {
        elem.removeEventListener("mouseover", handleMouseOver);
        elem.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [hoverRef.current]);

  return [hoverRef, isHovered];
}
