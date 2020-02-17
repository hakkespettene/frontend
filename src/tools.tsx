import React from "react";

import md5 from "md5";

/**
 * List of all tools, generate UI from this.
 */

/**
 * It is worth noting that the input received from the form will always be a
 * string, even though you specify otherwise, so remember to convert!
 */
type ToolFunc<I, O> = (input: I) => O;

/**
 * func: the function to generate the output
 * defaultValues: the defualt inputs -- used to generate form
 * name: name of the function
 * live: should it update on each keypress? don't enable for taxing operations
 */
type Tool<I, O> = {
  func: ToolFunc<I, O>;
  defaultValues: I;
  name: string;
  live: boolean;
};

/**
 * FUNCTIONS
 */
const nop: ToolFunc<{ data: string }, JSX.Element> = input => (
  <h1>Testing {input.data}</h1>
);
const addOne: ToolFunc<{ data: string }, JSX.Element> = input => {
  return <h1>{Number(input.data) + 1}</h1>;
};
const md5hash: ToolFunc<{ data: string }, JSX.Element> = input => (
  <pre>{md5(input.data)}</pre>
);
const addThreeNumbers: ToolFunc<
  { num1: number; num2: number; num3: number },
  number
> = input => Number(input.num1) + Number(input.num2) + Number(input.num3);

export const TOOLS: Array<Tool<any, any>> = [
  {
    func: nop,
    defaultValues: { data: "testing" },
    name: "nop" as const,
    live: true
  },
  {
    func: addOne,
    defaultValues: { data: 12 },
    name: "addone" as const,
    live: true
  },
  {
    func: md5hash,
    defaultValues: { data: "eller hva" },
    name: "md5" as const,
    live: true
  },
  {
    func: addThreeNumbers,
    defaultValues: { num1: 10, num2: 12, num3: 14 },
    name: "add three numbers" as const,
    live: true
  }
];
