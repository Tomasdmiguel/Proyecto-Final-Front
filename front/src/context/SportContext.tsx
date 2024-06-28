"use client";
// hooks, createContext y ReactNode
import React, { createContext, useState, useContext, ReactNode } from "react";
interface ISport {
  sport: number;
  home: boolean;
  handleSport: (n: number) => void;
  closeSport: () => void;
  toggleHome: () => void;
}
const SportContext = createContext<ISport | undefined>(undefined);

export const SportProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sport, setSport] = useState<number>(0);
  const [home, setHome] = useState<boolean>(true);

  const handleSport = (n: number) => {
    setSport(n);
  };
  const closeSport = () => {
    setSport(0);
  };

  const toggleHome = () => {
    setHome(!home);
  };

  return (
    <SportContext.Provider
      value={{ sport, handleSport, closeSport, toggleHome, home }}
    >
      {children}
    </SportContext.Provider>
  );
};

export const useSport = () => {
  const context = useContext(SportContext);
  if (context === undefined) {
    throw new Error("useSport must be used within a useSport");
  }
  return context;
};
