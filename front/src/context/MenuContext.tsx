"use client";
// interfaz de contexto de menu hamburguesa
import { IHamburgerMenuContext } from "@/interface/context";
// hooks, createContext y ReactNode
import React, { createContext, useState, useContext, ReactNode } from "react";

const HamburgerMenuContext = createContext<IHamburgerMenuContext | undefined>(
  undefined
);

export const HamburgerMenuProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [Open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <HamburgerMenuContext.Provider value={{ Open, toggleMenu, closeMenu }}>
      {children}
    </HamburgerMenuContext.Provider>
  );
};

export const useHamburgerMenu = () => {
  const context = useContext(HamburgerMenuContext);
  if (context === undefined) {
    throw new Error(
      "useHamburgerMenu must be used within a HamburgerMenuProvider"
    );
  }
  return context;
};
