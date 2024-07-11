// ReactNode
import { ReactNode } from "react";
import { ITurno } from "./ISedes";

export interface ISede {
  name: string;
  location: string;
  description: string;
}

export interface IUserSession {
  token: string | null;
  userDb: {
    displayName: string;
    address?: string;
    email: string;
    uid?: string;
    id?: string;
    name: string;
    phone: string;
    rol?: string;
    sedes?: ISede[];
    turnos?: ITurno[];
  };
}
export interface IUserDb {
  displayName: string;
  address?: string;
  email: string;
  uid?: string;
  id?: string;
  name: string;
  phone: string;
  rol?: string;
  sedes?: ISede[];
  turnos?: ITurno[];
}

export interface IUser {
  token: string;
  userDb: {
    email: string;
    id: string;
    imgUrl: string;
    name: string;
    phone: string;
    rol: string;
    sedes?: ISede[];
    turnos?: ITurno[];
  };
}

export interface IUserContext {
  userData: IUserSession | null;
  setUserData: React.Dispatch<React.SetStateAction<IUserSession | null>>;
  logOut: () => void;
  logIn: (userData: IUserSession) => void;
}

export interface IUserProviderProps {
  children: ReactNode;
}
