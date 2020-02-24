import React from "react";

import { Typography } from "@material-ui/core";

import { Tool } from "../tools";

// Algo stolen from @EvanHahn @ GitHub
// https://gist.github.com/EvanHahn/2587465
const caesarShift = (str: string, amount: number): string => {
  if (amount < 0) return caesarShift(str, amount + 26);
  var output = "";
  for (var i = 0; i < str.length; i++) {
    var c = str[i];
    if (c.match(/[a-z]/i)) {
      var code = str.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
      }
    }
    output += c;
  }

  return output;
};

export const caesarCipher = {
  func: input => caesarShift(input.Message, Number(input["Rotation Amount"])),
  live: true,
  name: "Caesar Cipher",
  schema: {
    "Rotation Amount": { type: "number", defaultValue: 13 }
  },
  description: (
    <Typography>
      In cryptography, a Caesar cipher, also known as Caesar's cipher, the shift
      cipher, Caesar's code or Caesar shift, is one of the simplest and most
      widely known encryption techniques. It is a type of substitution cipher in
      which each letter in the plaintext is replaced by a letter some fixed
      number of positions down the alphabet. For example, with a left shift of
      3, D would be replaced by A, E would become B, and so on. The method is
      named after Julius Caesar, who used it in his private correspondence.
    </Typography>
  )
} as Tool<string, "Caesar Cipher">;
