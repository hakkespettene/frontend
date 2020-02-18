import crypto from "crypto-js";

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
type Tool<I, O, N> = {
  func: ToolFunc<I, O>;
  defaultValues: I;
  name: N;
  live: boolean;
};

/**
 * FUNCTIONS
 */
const HASH_FUNCTIONS = [
  { func: crypto.MD5, name: "MD5" as const },
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

export const TOOLS = {
  Hashing: [
    ...HASH_FUNCTIONS.map(
      e =>
        ({
          func: input => e.func(input.Message).toString(crypto.enc.Hex),
          name: e.name,
          live: true,
          defaultValues: { Message: "hash me!" }
        } as Tool<{ Message: string }, string, typeof e.name>)
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
          defaultValues: { Message: "hash me!", Passphrase: "secret password" }
        } as Tool<
          { Message: string; Passphrase: string },
          string,
          typeof e.name
        >)
    )
  ]
};

export type Category = keyof typeof TOOLS;
export type CategoryTool = typeof TOOLS[Category][number];
