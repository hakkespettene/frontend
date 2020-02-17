import React from "react";

import { Formik, Field } from "formik";
import { TOOLS } from "./tools";

const App: React.FC = props => {
  const [output, setOutput] = React.useState<typeof props.children>(null);

  const [tool, setTool] = React.useState<number>(0);

  const onSelectToolChange: React.ChangeEventHandler<HTMLSelectElement> = e => {
    setTool(Number(e.currentTarget.value));
  };

  return (
    <div>
      <h1>Hikk hakk hakkespettene's hakkeverktøy</h1>

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
            {Object.entries(TOOLS[tool].defaultValues).map(e => (
              <Field
                key={e[0]}
                type={typeof e[1]}
                name={e[0]}
                value={props.values[e[0]]}
              />
            ))}
            <button onClick={props.submitForm} type="submit">
              Hack
            </button>
          </>
        )}
      </Formik>

      <h2>Output</h2>
      <div>{output}</div>
    </div>
  );
};

export default App;
