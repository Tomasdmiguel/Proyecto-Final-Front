"use client";
// Interfaces de contexto, sesion de usuario y props de proveedor
import {
  IUserContext,
  IUserProviderProps,
  IUserSession,
} from "@/interface/context";
// React y hooks
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider: React.FC<IUserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<IUserSession | null>(null);
  let storedUserData = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      storedUserData.current = localStorage.getItem("userSession");
      if (storedUserData.current) {
        setUserData(JSON.parse(storedUserData.current));
      }
    }
  }, []);

  const logOut = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("userSession");
    }
    setUserData(null);
  };

  const logIn = (userData: IUserSession) => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("userSession", JSON.stringify(userData));
    }
    setUserData(userData);
  };

  return (
    <UserContext.Provider
      value={{ userData, storedUserData, setUserData, logOut, logIn }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): IUserContext => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser debe ser usado en UserProvider");
  }
  return context;
};
