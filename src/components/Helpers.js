import { useCallback, useState } from "react";

export const useCenteredTree = (defaultTranslate = { x: -400, y: 0 }) => {
  const [translate, setTranslate] = useState(defaultTranslate);
  const [dimensions, setDimensions] = useState();
  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setDimensions({ width, height })
      setTranslate({ x: 400, y: height / 2 });
    }
  }, []);
  return [dimensions, translate, containerRef];
};
