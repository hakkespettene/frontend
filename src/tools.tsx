import React from "react";

import md5 from "md5";

/**
 * List of all tools, generate UI from this.
 */

type ToolFunc<I, O> = (input: I) => O;
type Tool<I, O> = { func: ToolFunc<I, O>; defaultValues: I; name: string };

const nop: ToolFunc<{ data: string }, JSX.Element> = input => (
  <h1>Testing {input.data}</h1>
);
const addOne: ToolFunc<{ data: number }, JSX.Element> = input => (
  <h1>{input.data + 1}</h1>
);
const md5hash: ToolFunc<{ data: string }, JSX.Element> = input => (
  <pre>{md5(input.data)}</pre>
);
const addThreeNumbers: ToolFunc<
  { num1: number; num2: number; num3: number },
  number
> = input => input.num1 + input.num2 + input.num3;

export const TOOLS: Array<Tool<any, any>> = [
  { func: nop, defaultValues: { data: "testing" }, name: "nop" as const },
  { func: addOne, defaultValues: { data: 12 }, name: "addone" as const },
  { func: md5hash, defaultValues: { data: "" }, name: "md5" as const },
  {
    func: addThreeNumbers,
    defaultValues: { num1: 10, num2: 12, num3: 14 },
    name: "add three numbers" as const
  }
];
