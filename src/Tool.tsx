import React from "react";

import { CategoryTool, Category, TOOLS } from "./tools";
import {
  Typography,
  Container,
  Select,
  MenuItem,
  TextField,
  FormControl,
  FormHelperText
} from "@material-ui/core";
import styled from "styled-components";

type Props = {
  tool: { name: CategoryTool["name"]; category: Category };
  setInput: React.Dispatch<
    React.SetStateAction<Partial<Parameters<CategoryTool["func"]>[number]>>
  >;
  input: Partial<Parameters<CategoryTool["func"]>[number]>;
};

const OptionHeader = styled(Typography)`
  display: block;
  margin-top: 2em;
`;

const Options = styled.div`
  & > * {
    display: block;
    width: 100%;
    margin-bottom: 1em;
  }

  div,
  input {
    width: 100%;
  }
`;

const ToolContainer = styled(Container)`
  padding-top: 3em;
`;

const Tool: React.FC<Props> = props => {
  const selected = (TOOLS[props.tool.category] as Array<CategoryTool>).find(
    e => e.name === props.tool.name
  )!;

  const updateField = (fieldName: any) => (ev: React.ChangeEvent<any>) => {
    ev.persist();
    props.setInput(vals => ({
      ...vals,
      [fieldName]: ev.target.value
    }));
  };

  return (
    <ToolContainer>
      <Typography variant="overline">{props.tool.category}</Typography>
      <Typography variant="h2">{props.tool.name}</Typography>
      {selected.description}
      {Object.entries(selected.schema).length > 0 && (
        <OptionHeader variant="overline">Options</OptionHeader>
      )}
      <Options>
        {Object.entries(selected?.schema ?? {}).map(
          ([fieldName, fieldOptions]) => {
            switch (fieldOptions.type) {
              case "string":
                return (
                  <TextField
                    key={fieldName}
                    label={fieldName}
                    onChange={updateField(fieldName)}
                    value={props.input[fieldName] || fieldOptions.defaultValue}
                  />
                );
              case "number":
                return (
                  <TextField
                    label={fieldName}
                    onChange={updateField(fieldName)}
                    value={props.input[fieldName] || fieldOptions.defaultValue}
                    type="number"
                  />
                );
              case "select":
                return (
                  <FormControl key={fieldName}>
                    <FormHelperText>{fieldName}</FormHelperText>
                    <Select
                      label={fieldName}
                      id={fieldName}
                      onChange={updateField(fieldName)}
                      value={
                        props.input[fieldName] || fieldOptions.defaultValue
                      }
                    >
                      {fieldOptions.options?.map(e => (
                        <MenuItem key={e} value={e}>
                          {e}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                );
              default:
                return null;
            }
          }
        )}
      </Options>
    </ToolContainer>
  );
};

export default Tool;
