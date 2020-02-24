import React from "react";

import { Typography } from "@material-ui/core";

import { Tool } from "../tools";

export const fromHex = {
  // If the input is 0x414243, convert to 414243.
  func: input => {
    const massagedInput = input.Message.replace(
      /0x|\n|\t|\s/gim,
      ""
    ).toLowerCase();

    if (massagedInput.length % 2 !== 0 || /[^0-9a-fx]/.test(massagedInput)) {
      return "Invalid input. Must be of even length and only contain hex characters (and optionally 0x at the beginning).";
    }
    return new Buffer(massagedInput, "hex").toString();
  },
  live: true,
  name: "From Hex",
  schema: {},
  description: (
    <Typography>
      In mathematics and computing, hexadecimal (also base 16, or hex) is a
      positional system that represents numbers using a base of 16. Unlike the
      common way of representing numbers with ten symbols, it uses sixteen
      distinct symbols, most often the symbols "0"–"9" to represent values zero
      to nine, and "A"–"F" (or alternatively "a"–"f") to represent values ten to
      fifteen.
    </Typography>
  )
} as Tool<string, "From Hex">;
