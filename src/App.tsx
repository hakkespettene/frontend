import React from "react";

import { Formik, Field } from "formik";
import { TOOLS } from "./tools";
import styled from "styled-components";

const OutputPane = styled.div`
  border: 1px solid black;
  padding: 1em;
`;

const App: React.FC = props => {
  const [tool, setTool] = React.useState<number>(0);
  const [output, setOutput] = React.useState<typeof props.children>(
    TOOLS[tool].func(TOOLS[tool].defaultValues)
  );

  const onSelectToolChange: React.ChangeEventHandler<HTMLSelectElement> = e => {
    const toolNum = Number(e.currentTarget.value);
    setTool(toolNum);
    setOutput(TOOLS[toolNum].func(TOOLS[toolNum].defaultValues));
  };

  const updateOutput = (values: typeof TOOLS[typeof tool]["defaultValues"]) => {
    setOutput(TOOLS[tool].func(values));
  };

  return (
    <div>
      <h1>Hikk hakk hakkespettene's hakkeverktøy</h1>

      {/* Select the tool you wish to use */}
      <select value={tool} onChange={onSelectToolChange}>
        {TOOLS.map((e, i) => (
          <option key={e.name} value={i}>
            {e.name}
          </option>
        ))}
      </select>

      <Formik
        initialValues={TOOLS[tool].defaultValues}
        onSubmit={(values, _) => setOutput(TOOLS[tool].func(values))}
        enableReinitialize={true}
      >
        {props => (
          <>
            {Object.entries(props.values).map(e => (
              <Field
                key={e[0]}
                type={typeof e[1]}
                name={e[0]}
                value={props.values[e[0]]}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                  props.handleChange(ev);
                  TOOLS[tool].live &&
                    updateOutput({
                      ...props.values,
                      [e[0]]: ev.currentTarget.value
                    });
                }}
              />
            ))}
            <button onClick={props.submitForm} type="submit">
              Hack
            </button>
          </>
        )}
      </Formik>

      <h2>Output</h2>
      <OutputPane>{output}</OutputPane>
    </div>
  );
};

export default App;
