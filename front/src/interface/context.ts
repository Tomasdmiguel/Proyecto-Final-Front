// ReactNode
import { ReactNode } from "react";

export interface ISede {
  id: string;
  name: string;
  description?: string;
  location?: string;
  imgUrl?: string;
  canchas?: [];
}
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

export interface IUserSession {
  token: string;
  user: {
    address: string;
    email: string;
    id: number;
    name: string;
    phone: string;
    role: string;
    orders: [];
  };
}

export interface IUser {
  address: string;
  email: string;
  id: number;
  name: string;
  phone: string;
  role: string;
  orders: [];
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