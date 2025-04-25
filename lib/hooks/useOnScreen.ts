import { useState, useEffect } from "react";

export const useOnScreen = (ref: any, rootMargin = "0px") => {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line no-undef
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    const currentElement = ref && ref.current;

    if (currentElement) {
      observer.observe(currentElement);
    }
    return () => {
      observer.unobserve(currentElement);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return isIntersecting;
};
