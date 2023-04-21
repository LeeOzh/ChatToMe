import * as React from "react";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Input from "@mui/material/Input";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import "./index.less";

export default function CreateJson() {
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

  return (
    <React.Fragment>
      <div className="json_wrapper">
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
        <span>{JSON.stringify(json)}</span>
      </div>
    </React.Fragment>
  );
}
