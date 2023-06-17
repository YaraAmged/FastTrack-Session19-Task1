import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import * as React from "react";
const greenColor = "#22a565";

export default function NestedList({ title, items, selected }) {
  const isSelected = React.useMemo(
    () => items.includes(selected),
    [items, selected]
  );
  const [open, setOpen] = React.useState(isSelected);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List
      sx={{ width: "100%", maxWidth: 360 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton
        onClick={handleClick}
        sx={
          isSelected
            ? {
                background: greenColor,
                color: "white",
                "&:hover": {
                  background: greenColor,
                },
              }
            : { background: "none" }
        }
      >
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{ background: "rgba(255,255,255,0.05)" }}
        >
          {items.map((item) => {
            const isSelected = selected === item;
            return (
              <ListItemButton
                key={item}
                sx={{
                  pl: 4,
                  background: "#1e2642",
                  ...(isSelected
                    ? {
                        "&,&:hover": {
                          background: "rgba(255,255,255,0.1)",
                          borderLeft: `solid 1px ${greenColor} `,
                          color: greenColor,
                        },
                      }
                    : {}),
                }}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </List>
  );
}
