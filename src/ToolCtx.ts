import React from "react";

import { Category, CategoryTool } from "./tools";

export const ToolCtxInit = {
  category: "Hashing" as const,
  name: "MD5" as const
};

export const ToolCtx = React.createContext<{
  category: Category;
  name: CategoryTool["name"];
}>(ToolCtxInit);

export const useTool = () => {
  const tool = React.useContext(ToolCtx);

  return tool;
};
