import { useState, useRef, useEffect } from "react";

export default function useHover() {
  const [isHovered, setIsHovered] = useState(false);

  const hoverRef = useRef(null);

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  // eslint-disable-next-line consistent-return
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
  }, []);

  return [hoverRef, isHovered];
}
