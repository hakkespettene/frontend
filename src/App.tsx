import React from "react";

import { Container, List, ListSubheader } from "@material-ui/core";

import styled from "styled-components";

import { TOOLS, Category, CategoryTool } from "./tools";
import MenuCategory from "./MenuCategory";
import { ToolCtx, ToolCtxInit } from "./ToolCtx";
import Tool from "./Tool";

const MainContainer = styled(Container)`
  display: grid;
  gap: 2.5em;
  grid-template-columns: 2fr 6fr 4fr;
  grid-template-rows: 7fr 3fr;
  max-width: 100%;
  height: 100vh;
`;

const ToolList = styled(List)`
  grid-row: 1 / span 2;
  height: 100%;
`;

const App: React.FC = props => {
  const [tool, setTool] = React.useState<{
    category: Category;
    name: CategoryTool["name"];
  }>(ToolCtxInit);

  return (
    <ToolCtx.Provider value={tool}>
      <MainContainer>
        <ToolList
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Tools
            </ListSubheader>
          }
        >
          {((Object.keys(TOOLS) as unknown) as Array<keyof typeof TOOLS>).map(
            k => (
              <MenuCategory
                tools={TOOLS[k]}
                category={k}
                key={k}
                setTool={setTool}
              />
            )
          )}
        </ToolList>
        <Tool tool={tool} />
      </MainContainer>
    </ToolCtx.Provider>
  );
};

export default App;
