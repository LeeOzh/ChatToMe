import { useState, useEffect, useRef, useLayoutEffect } from "react";

function onResize() {
  window.addEventListener("resize", () => {});
}

export function useReset() {
  const [size, setSize] = useState("lg");
}
