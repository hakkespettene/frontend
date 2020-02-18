import React from "react";

import { CategoryTool, Category, TOOLS } from "./tools";
import { Typography, Container } from "@material-ui/core";
import styled from "styled-components";

type Props = {
  tool: { name: CategoryTool["name"]; category: Category };
};

const ToolContainer = styled(Container)`
  padding-top: 3em;
`;

const Tool: React.FC<Props> = props => {
  const selected = (TOOLS[props.tool.category] as Array<CategoryTool>).find(
    e => e.name === props.tool.name
  )!;

  return (
    <ToolContainer>
      <Typography variant="overline">{props.tool.category}</Typography>
      <Typography variant="h2">{props.tool.name}</Typography>
      {selected.description}
    </ToolContainer>
  );
};

export default Tool;
