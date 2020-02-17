import React from "react";

import { Formik, Field } from "formik";
import { TOOLS } from "./tools";
import styled from "styled-components";

/**
 * Styled components
 */
const OutputPane = styled.div`
  border: 1px solid black;
  padding: 1em;
`;

const Container = styled.div`
  padding: 2em 1em 1em;
  margin: auto;
  width: 70vw;
`;

const Label = styled.label`
  display: block;
  font-weight: 300;
  margin-top: 0.5em;
`;

const Subheading = styled.h2`
  margin-top: 1em;
  margin-bottom: 0.5em;
`;

const HackButton = styled.button`
  padding: 0.5em 1em;
  display: block;
  background: none;
  width: 100%;
`;

const Input = styled.input`
  padding: 0.5em 1em;
  display: inline-block;
  width: 100%;
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 0.5em;
`;

const ToolSelect = styled.select`
  background: none;
  width: 100%;
`;

const App: React.FC = props => {
  const [tool, setTool] = React.useState<number>(0);
  const selectedTool = React.useMemo(() => TOOLS[tool], [tool]);
  const [output, setOutput] = React.useState<typeof props.children>(
    selectedTool.func(selectedTool.defaultValues)
  );

  const onSelectToolChange: React.ChangeEventHandler<HTMLSelectElement> = e => {
    const toolNum = Number(e.currentTarget.value);
    setTool(toolNum);
    setOutput(TOOLS[toolNum].func(TOOLS[toolNum].defaultValues));
  };

  const updateOutput = (values: typeof TOOLS[typeof tool]["defaultValues"]) => {
    setOutput(selectedTool.func(values));
  };

  return (
    <Container>
      <h1>Hikk hakk hakkespettene's hakkeverktøy</h1>

      {/* Select the tool you wish to use */}
      <Label htmlFor="tool-select">Tool</Label>
      <ToolSelect value={tool} onChange={onSelectToolChange} id="tool-select">
        {TOOLS.map((e, i) => (
          <option key={e.name} value={i}>
            {e.name}
          </option>
        ))}
      </ToolSelect>

      <Subheading>Input</Subheading>
      <Formik
        initialValues={selectedTool.defaultValues}
        onSubmit={(values, _) => setOutput(selectedTool.func(values))}
        enableReinitialize={true}
      >
        {props => (
          <>
            <InputGroup>
              {Object.entries(props.values).map(e => (
                <div key={e[0]}>
                  <Label htmlFor={e[0]}>{e[0]}</Label>
                  <Field
                    as={Input}
                    id={e[0]}
                    type={typeof e[1]}
                    name={e[0]}
                    value={props.values[e[0]]}
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                      props.handleChange(ev);
                      selectedTool.live &&
                        updateOutput({
                          ...props.values,
                          [e[0]]: ev.currentTarget.value
                        });
                    }}
                  />
                </div>
              ))}
            </InputGroup>
            <HackButton onClick={props.submitForm} type="submit">
              Hack
            </HackButton>
          </>
        )}
      </Formik>

      <Subheading>Output</Subheading>
      <OutputPane>{output}</OutputPane>
    </Container>
  );
};

export default App;
