import React from "react";

import crypto from "crypto-js";
import { Typography } from "@material-ui/core";

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
 * desc: description to show
 */
type Tool<O, N> = {
  func: ToolFunc<Record<string, string>, O>;
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
const HASH_FUNCTIONS = [
  {
    func: crypto.MD5,
    name: "MD5" as const,
    description: (
      <Typography>
        The MD5 message-digest algorithm is a widely used hash function
        producing a 128-bit hash value. Although MD5 was initially designed to
        be used as a cryptographic hash function, it has been found to suffer
        from extensive vulnerabilities. It can still be used as a checksum to
        verify data integrity, but only against unintentional corruption. It
        remains suitable for other non-cryptographic purposes, for example for
        determining the partition for a particular key in a partitioned
        database.
      </Typography>
    )
  },
  { func: crypto.SHA1, name: "SHA1" as const },
  { func: crypto.SHA256, name: "SHA256" as const },
  { func: crypto.SHA512, name: "SHA512" as const },
  { func: crypto.SHA3, name: "SHA3" as const },
  { func: crypto.RIPEMD160, name: "RIPEMD160" as const }
];

const HMAC_FUNCTIONS = [
  { func: crypto.HmacMD5, name: "Hmac MD5" as const },
  { func: crypto.HmacSHA1, name: "Hmac SHA1" as const },
  { func: crypto.HmacSHA256, name: "Hmac SHA256" as const },
  { func: crypto.HmacSHA512, name: "Hmac SHA512" as const }
];

const ENCODING_FUNCTIONS = [
  {
    func: (input: string) =>
      crypto.enc.Hex.stringify(crypto.enc.Utf8.parse(input)),
    name: "To Hex" as const,
    description: (
      <Typography>
        In mathematics and computing, hexadecimal (also base 16, or hex) is a
        positional system that represents numbers using a base of 16. Unlike the
        common way of representing numbers with ten symbols, it uses sixteen
        distinct symbols, most often the symbols "0"–"9" to represent values
        zero to nine, and "A"–"F" (or alternatively "a"–"f") to represent values
        ten to fifteen.
      </Typography>
    ),
    schema: {}
  },
  {
    func: (input: string) => btoa(input),
    name: "To Base64" as const,
    description: (
      <Typography>
        In computer science, Base64 is a group of binary-to-text encoding
        schemes that represent binary data in an ASCII string format by
        translating it into a radix-64 representation. The term Base64
        originates from a specific MIME content transfer encoding. Each Base64
        digit represents exactly 6 bits of data. Three 8-bit bytes (i.e., a
        total of 24 bits) can therefore be represented by four 6-bit Base64
        digits.
      </Typography>
    ),
    schema: {}
  }
];

export const TOOLS = {
  Hashing: [
    ...HASH_FUNCTIONS.map(
      e =>
        ({
          func: input => e.func(input.Message).toString(crypto.enc.Hex),
          name: e.name,
          live: true,
          description: e.description,
          schema: {}
        } as Tool<string, typeof e.name>)
    )
  ],
  Hmac: [
    ...HMAC_FUNCTIONS.map(
      e =>
        ({
          func: input =>
            e.func(input.Message, input.Passphrase).toString(crypto.enc.Hex),
          name: e.name,
          live: true,
          description: (
            <Typography>
              In cryptography, an HMAC (sometimes expanded as either keyed-hash
              message authentication code or hash-based message authentication
              code) is a specific type of message authentication code (MAC)
              involving a cryptographic hash function and a secret cryptographic
              key. As with any MAC, it may be used to simultaneously verify both
              the data integrity and the authenticity of a message. Any
              cryptographic hash function, such as SHA-256 or SHA-3, may be used
              in the calculation of an HMAC; the resulting MAC algorithm is
              termed HMAC-X, where X is the hash function used (e.g. HMAC-SHA256
              or HMAC-SHA3). The cryptographic strength of the HMAC depends upon
              the cryptographic strength of the underlying hash function, the
              size of its hash output, and the size and quality of the key.
            </Typography>
          ),
          schema: {
            Passphrase: { type: "string", defaultValue: "hunter2" }
          }
        } as Tool<string, typeof e.name>)
    )
  ],
  Encoding: [
    ...ENCODING_FUNCTIONS.map(
      e =>
        ({
          func: input => e.func(input.Message),
          name: e.name,
          live: true,
          description: e.description,
          schema: {}
        } as Tool<string, typeof e.name>)
    )
  ]
};

export type Category = keyof typeof TOOLS;
export type CategoryTool = typeof TOOLS[Category][number];
