import React from "react";

import { ENCODING_TOOLS, HASH_TOOLS, HMAC_TOOLS } from "./tools/cryptoLib";
import { fromHex } from "./tools/fromHex";

/**
 * List of all tools, generate UI from this.
 */

/**
 * It is worth noting that the input received from the form will always be a
 * string, even though you specify otherwise, so remember to convert!
 */
type ToolFunc<I extends { Message: string }, O> = (input: I) => O;

/**
 * func: the function to generate the output
 * defaultValues: the defualt inputs -- used to generate form
 * name: name of the function
 * live: should it update on each keypress? don't enable for taxing operations
 * desc: description to show
 */
export type Tool<O, N> = {
  func: ToolFunc<Record<string, string> & { Message: string }, O>;
  name: N;
  description?: JSX.Element;
  live: boolean;
  /**
   * Used to define exra options
   */
  schema: Record<
    string,
    {
      type: "number" | "string" | "select";
      options?: Array<string>;
      defaultValue: number | string;
    }
  >;
};

/**
 * FUNCTIONS
 */

export const TOOLS = {
  Hashing: HASH_TOOLS,
  Hmac: HMAC_TOOLS,
  Encoding: [...ENCODING_TOOLS, fromHex]
};

export type Category = keyof typeof TOOLS;
export type CategoryTool = typeof TOOLS[Category][number];
