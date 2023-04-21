import { useState, useEffect, useRef, useLayoutEffect } from "react";
export function useSlider(idx: number) {
  const [selectedIndex, setSelectedIndex] = useState(idx);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return {
    selectedIndex,
    setSelectedIndex,
    handleListItemClick,
  };
}
