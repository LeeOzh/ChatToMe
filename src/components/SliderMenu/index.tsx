import * as React from "react";
import "./index.less";
import { useState, useEffect, useRef, useLayoutEffect } from "react";

//Mui
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";

interface Props {
  selectedIndex: number;
  handleListItemClick: Function;
  setSelectedIndex?: React.Dispatch<React.SetStateAction<number>>;
}

const tabMenuList: string[] = ["ChatApp", "JSON"];

export default function SliderMenu(props: Props) {
  const { selectedIndex, handleListItemClick } = props;

  useLayoutEffect(() => {});

  return (
    <Box
      position={"fixed"}
      sx={{
        width: "100%",
        maxWidth: 380,
        height: 800,
        maxHeight: 800,
        color: "#fff",
        bgcolor: "#263238",
        top: "50%",
        left: "2px",
        marginTop: "-400px",
        borderRadius: 6,
      }}
    >
      <List component="nav" aria-label="main mailbox folders">
        {tabMenuList.map((item, index) => {
          return (
            <React.Fragment key={item}>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItemButton>
              <Divider />
            </React.Fragment>
          );
        })}

        {/* <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Claude" />
        </ListItemButton>
        <Divider /> */}
      </List>
    </Box>
  );
}
