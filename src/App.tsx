import { useState, useEffect, useRef, useLayoutEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "@chatui/core/es/styles/index.less";
// 引入组件
import Chat, { Bubble, useMessages } from "@chatui/core";
// 引入样式
import "@chatui/core/dist/index.css";
import "./App.css";

function App() {
  const { messages, appendMsg, setTyping } = useMessages([]);
  const ws = useRef<WebSocket | null>(null);
  const [msg, setMsg] = useState("");
  let timer: any = null;
  let msgs = "";
  let time = 0;

  useLayoutEffect(() => {
    ws.current = new WebSocket(
      "ws://gpt.imarin.cn:9999/api/websocket/Bearer chatgpt-12893127ghjasflgas89124ghwqdf7812dh2178ed"
    );
    ws.current.onmessage = (res) => {
      clearTimeout(timer);
      timer = null;
      const data = JSON.parse(res.data);
      if (data.code === 200) {
        msgs += data.data;
      }
      timer = setTimeout(() => {
        appendMsg({
          type: "text",
          content: { text: msgs },
        });
        msgs = "";
        timer = null;
      }, 500);
    };
  });

  function handleSend(type: string, val: string) {
    console.log(val);
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
      });
      ws.current?.send(val);
      setTyping(true);
    }
  }

  function renderMessageContent(msg: any) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  return (
    <Chat
      navbar={{ title: "美女在线陪聊" }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
    />
  );
}

export default App;
