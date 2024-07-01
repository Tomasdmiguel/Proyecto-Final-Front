// ReactNode
import { ReactNode } from "react";

export interface ICategory {
  name: string;
}

export interface ILoginProps {
  email: string;
  password: string;
}

export interface ILoginErrorProps {
  email?: string;
  password?: string;
}

export interface IRegisterProps {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
  address: string;
}

export interface IRegisterErrorsProps {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  phone?: string;
  address?: string;
}

export interface ISede {
  name: string;
  location: string;
  description: string;
}

export interface IUserSession {
  token: string;
  userDb: {
    address: string;
    email: string;
    id: number;
    name: string;
    phone: string;
    role: string;
    sedes: ISede[];
  };
}

export interface IUser {
  address: string;
  email: string;
  id: number;
  name: string;
  phone: string;
  role: string;
  sedes: [];
}

export interface IOrder {
  id: number;
  status: string;
  date: Date;
}

export interface IUserContext {
  userData: IUserSession | null;
  setUserData: React.Dispatch<React.SetStateAction<IUserSession | null>>;
  logOut: () => void;
  logIn: (userData: IUserSession) => void;
  user: IUser | undefined;
}

export interface IUserProviderProps {
  children: ReactNode;
}

export interface IHamburgerMenuContext {
  Open: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}
