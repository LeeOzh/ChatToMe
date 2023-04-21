import * as React from "react";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
//mui
import { styled } from "@mui/material/styles";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import ChatBubbleSharpIcon from "@mui/icons-material/ChatBubbleSharp";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
// 引入组件
import Chat, { Bubble, useMessages, MessageProps } from "@chatui/core";
// 引入样式
import "@chatui/core/dist/index.css";
import "./index.less";

export default function ChatApp() {
  const ws = useRef<WebSocket | null>(null);
  const { messages, appendMsg, setTyping } = useMessages([]);
  const [msg, setMsg] = useState("");

  let timer: any = null;
  let msgs = "";
  let time = 0;

  function renderMessageContent(msg: MessageProps) {
    const { type, content } = msg;

    // 根据消息类型来渲染
    switch (type) {
      case "text":
        return <Bubble content={content.text} />;
      case "image":
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      default:
        return null;
    }
  }

  useLayoutEffect(() => {
    ws.current = new WebSocket(
      "ws://gpt.imarin.cn:9999/api/websocket/Bearer chatgpt-12893127ghjasflgas89124ghwqdf7812dh2178ed"
    );
    ws.current.onmessage = (res) => {
      clearTimeout(timer);
      timer = null;
      const data = JSON.parse(res.data);
      console.log;
      if (data.code === 200) {
        msgs += data.data;
      }
      // console.log(msgs);
      timer = setTimeout(() => {
        if (switchFlag) {
          appendMsg({
            type: "text",
            content: { text: msgs },
          });
        } else {
          appendMsg({
            type: "image",
            content: { picUrl: msgs },
          });
        }
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
      const params = {
        model: switchFlag ? 1 : 2,
        msg: val,
      };
      console.log(params, "hhhh");
      ws.current?.send(JSON.stringify(params));
      setTyping(true);
    }
  }

  //switch
  const [switchFlag, setSwitchFlag] = useState(true);
  const handleSwitch = (
    event: React.ChangeEvent<HTMLElement | HTMLInputElement>,
    val: boolean
  ) => {
    console.log(val);
    setSwitchFlag(val);
  };

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));

  return (
    <React.Fragment>
      <div className="header_wrapper">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>IMAGE</Typography>
                <AntSwitch
                  defaultChecked
                  onChange={handleSwitch}
                  inputProps={{ "aria-label": "ant design" }}
                />
                <Typography>TEXT</Typography>
              </Stack>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <div className="content_wrapper">
        <Chat
          navbar={{ title: "美女在线陪聊" }}
          messages={messages}
          renderMessageContent={renderMessageContent}
          onSend={handleSend}
        />
      </div>
    </React.Fragment>
  );
}
