import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800">Todo App</h1>
      <div className="w-full max-w-2xl mt-4">{children}</div>
    </div>
  );
};

export default Layout;
