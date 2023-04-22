import * as React from "react";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
// import "@chatui/core/es/styles/index.less";
import "./App.css";
import Container from "@mui/material/Container";

// types
//components
import SliderMenu from "./components/SliderMenu";
import ChatApp from "./pages/App";
import CreateJson from "./pages/Json";

import { useSlider } from "./hooks/useSlider";
import Login from "./pages/Login";

function getSize() {
  const currentW = document.documentElement.clientWidth;
  if (currentW >= 2000) return "lg";
  if (currentW >= 1700) return "md";
  if (currentW <= 1200) return "sm";
}
let timer: any = null;
function App() {
  const { selectedIndex, setSelectedIndex, handleListItemClick } = useSlider(0);
  const [size, setSize] = useState<any>(getSize());

  useLayoutEffect(() => {
    window.addEventListener("resize", (event: UIEvent) => {
      clearTimeout(timer);
      timer = null;
      timer = setTimeout(() => {
        setSize(getSize());
      }, 200);
    });
  });

  return (
    <div className="app_wrapper">
      <Login />
      <SliderMenu
        selectedIndex={selectedIndex}
        handleListItemClick={handleListItemClick}
      />
      <Container
        maxWidth={size}
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        {selectedIndex === 0 ? <ChatApp /> : void 0}
        {selectedIndex === 1 ? <CreateJson /> : void 0}
      </Container>
    </div>
  );
}

export default App;
