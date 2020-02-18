import React from "react";

import { Container, List, TextField, Button } from "@material-ui/core";

import styled from "styled-components";

import { TOOLS, Category, CategoryTool } from "./tools";
import MenuCategory from "./MenuCategory";
import { ToolCtx, ToolCtxInit } from "./ToolCtx";
import Tool from "./Tool";

const MainContainer = styled(Container)`
  display: grid;
  gap: 0 2.5em;
  grid-template-columns: 2fr 6fr 4fr;
  grid-template-rows: 7fr 3fr;
  max-width: 100%;
  height: 100vh;
`;

const ToolList = styled(List)`
  grid-row: 1 / span 2;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.23);
  padding-right: 2.5em;
  padding-top: calc(3em - 8px);
`;

const InputField = styled(TextField)`
  flex-grow: 1;
  margin: 1em;

  & > div {
    flex-grow: 1;
  }

  textarea {
    /* So we can get the text on the top while typing */
    height: 100% !important;
  }
`;

const RunButton = styled(Button)`
  width: 100%;
  padding: 0.75em;
`;

const RunParent = styled.div`
  padding: 24px;
  place-self: end;
  width: 100%;
`;

const OutputField = styled(InputField)`
  grid-row: 2;
  grid-column: 3;
`;

const App: React.FC = props => {
  const [tool, setTool] = React.useState<{
    category: Category;
    name: CategoryTool["name"];
  }>(ToolCtxInit);

  const selected = (TOOLS[tool.category] as Array<CategoryTool>).find(
    e => e.name === tool.name
  )!;

  const [input, setInput] = React.useState<
    Partial<Parameters<CategoryTool["func"]>[number]>
  >({ Message: "" });

  React.useEffect(() => {
    const defaults = Object.fromEntries(
      Object.entries(selected.schema).map(([k, v]) => [k, v.defaultValue])
    );

    setInput({ Message: "", ...defaults });
  }, [selected]);

  const inputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = ev => {
    const resp = ev.currentTarget.value;
    setInput(e => ({ ...e, Message: resp }));

    if (selected.live) {
      calcOutput({ ...input, Message: resp });
    }
  };

  const [output, setOutput] = React.useState<typeof props.children>("");

  const calcOutput = (i: typeof input = input) => {
    setOutput((selected.func as Function)(i));
  };

  return (
    <ToolCtx.Provider value={tool}>
      <MainContainer>
        <ToolList>
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
        <Tool tool={tool} setInput={setInput} input={input} />
        <InputField
          multiline
          variant="outlined"
          label="Input"
          value={input.Message}
          onChange={inputChangeHandler}
        />
        <OutputField
          multiline
          variant="outlined"
          label="Ouptut goes here"
          inputMode="none"
          value={output}
        />
        <RunParent>
          <RunButton
            variant="contained"
            color="secondary"
            onClick={() => calcOutput()}
          >
            Hakkespetterér
          </RunButton>
        </RunParent>
      </MainContainer>
    </ToolCtx.Provider>
  );
};

export default App;
