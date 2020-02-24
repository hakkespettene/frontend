import React from "react";

import { ListItem, Collapse, List, ListItemText } from "@material-ui/core";
import styled from "styled-components";

import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";

import { Category, CategoryTool } from "./tools";
import { useTool } from "./ToolCtx";

const SublistItem = styled(ListItem)`
  padding-left: 2em;
`;

type Props = {
  tools: Array<CategoryTool>;
  category: Category;
  setTool: React.Dispatch<{ category: Category; name: CategoryTool["name"] }>;
};

const MenuCategory: React.FC<Props> = props => {
  const [open, setOpen] = React.useState(true);

  const toggleOpen = () => setOpen(e => !e);

  const onClick = (n: CategoryTool["name"]) => () =>
    props.setTool({ category: props.category, name: n });

  const selectedTool = useTool();

  return (
    <>
      <ListItem button onClick={toggleOpen}>
        <ListItemText primary={props.category} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.tools.map(t => (
            <SublistItem
              button
              key={t.name}
              onClick={onClick(t.name)}
              selected={
                props.category === selectedTool.category &&
                t.name === selectedTool.name
              }
            >
              <ListItemText primary={t.name} />
            </SublistItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default MenuCategory;
