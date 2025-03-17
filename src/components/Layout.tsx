import React from "react";
import { ModeToggle } from "@/components/ModeToggle";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-background p-4">
      <div className="w-full max-w-2xl flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Todo App</h1>
        <ModeToggle /> 
      </div>
      <div className="w-full max-w-2xl mt-4">{children}</div>
    </div>
  );
};

export default Layout;
