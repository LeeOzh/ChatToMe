import * as React from "react";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "@chatui/core/es/styles/index.less";
// 引入组件
import Chat, { Bubble, useMessages } from "@chatui/core";
// 引入样式
import "@chatui/core/dist/index.css";
import "./App.css";
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
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

function App() {
  const ws = useRef<WebSocket | null>(null);
  const { messages, appendMsg, setTyping } = useMessages([]);
  const [msg, setMsg] = useState("");

  let timer: any = null;
  let msgs = "";
  let time = 0;

  function renderMessageContent(msg) {
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
      "ws://gpt.imarin.cn:9999/api/websocket/5c9b22cb-b91b-447a-8f3f-6ecc5dbbe81a"
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

  // nav
  const [value, setValue] = useState("recents");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  //switch
  const [switchFlag, setSwitchFlag] = useState(true);
  const handleSwitch = (event, val: boolean) => {
    console.log(val);
    setSwitchFlag(val);
  };

  //input
  const jsonItem = { key: "", value: "" };
  const [jsonList, setJsonList] = useState<{ key: string; value: string }[]>([
    { key: "", value: "" },
  ]);
  const [json, setJson] = useState({});
  const ariaLabel = { "aria-label": "description" };
  const handleAdd = () => {
    const newJsonList = jsonList;
    newJsonList.push(jsonItem);
    console.log(newJsonList);
    setJsonList([...newJsonList]);
  };
  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    type?: string
  ) => {
    const val = event.target.value;
    const newJsonList = jsonList;
    if (type === "value") {
      newJsonList[index].value = val;
    } else {
      newJsonList[index].key = val;
    }
    setJsonList([...newJsonList]);
  };

  const handleCreate = () => {
    const newL = jsonList;
    const json: any = {};
    newL.forEach((item) => {
      json[item.key] = item.value;
    });
    setJson({ ...json });
  };

  const handleReset = () => {
    setJsonList([{ key: "", value: "" }]);
    setJson({});
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
    <div className="app_wrapper">
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
        {value === "chat" ? (
          <Chat
            navbar={{ title: "美女在线陪聊" }}
            messages={messages}
            renderMessageContent={renderMessageContent}
            onSend={handleSend}
          />
        ) : null}
        {value === "profile" ? (
          <div>
            <div style={{ display: "flex" }}>
              <Button variant="contained" onClick={handleAdd}>
                添加
              </Button>
              <Button variant="outlined" onClick={handleCreate}>
                生成JSON
              </Button>
              <Button variant="contained" onClick={handleReset}>
                重置
              </Button>
            </div>
            {jsonList.map((item, index) => {
              return (
                <Box
                  key={index}
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1 },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Input
                    placeholder="key"
                    inputProps={ariaLabel}
                    onBlur={(
                      event: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
                    ) => {
                      handleInput(event, index);
                    }}
                  />
                  <Input
                    placeholder="value"
                    inputProps={ariaLabel}
                    onBlur={(
                      event: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
                    ) => {
                      handleInput(event, index, "value");
                    }}
                  />
                </Box>
              );
            })}
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <span>{JSON.stringify(json)}</span>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>
      <div className="nav_wrapper">
        <BottomNavigation
          sx={{ width: "100%", height: "100%" }}
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            label="Home"
            value="home"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            label="Chat"
            value="chat"
            icon={<ChatBubbleSharpIcon />}
          />
          <BottomNavigationAction
            label="Image"
            value="image"
            icon={<ImageRoundedIcon />}
          />
          <BottomNavigationAction
            label="Profile"
            value="profile"
            icon={<PersonSharpIcon />}
          />
        </BottomNavigation>
      </div>
    </div>
  );
}

export default App;
