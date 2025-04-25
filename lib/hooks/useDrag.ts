import { useState, RefObject } from "react";

const useDrag = (sectionRef: RefObject<HTMLDivElement | null>) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [preventClick, setPreventClick] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sectionRef.current.offsetLeft);
    setScrollLeft(sectionRef.current.scrollLeft);
    setPreventClick(false);
    sectionRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !sectionRef.current) return;
    const x = e.pageX - sectionRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sectionRef.current.scrollLeft = scrollLeft - walk;

    if (Math.abs(walk) > 5) {
      setPreventClick(true);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (sectionRef.current) sectionRef.current.style.cursor = "grab";
  };

  const preventedClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (preventClick) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const dragStyle = {
    overflow: "hidden",
    cursor: "grab",
    userSelect: "none",
    overflowX: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  };

  return {
    preventedClick,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    dragStyle,
  };
};

export default useDrag;
