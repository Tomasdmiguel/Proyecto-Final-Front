// import { IUser } from "./IUser";
import { IUserSede } from "./IUserSede";

export interface ISede {
  id: string;
  name: string;
  description?: string;
  location?: string;
  imgUrl?: string;
  canchas?: ICancha[];
  user: IUserSede;
}

export interface ICancha {
  id: string;
  name: string;
  price: number;
  sport: number;
  type?: string;
  player?: number;
  timeopen?: Date;
  timeclose?: Date;
  techado?: boolean;
  imgUrl?: string;
  sede: ISede;
  turnos: [];
}

export interface ITurno {
  id: string;
  date: string;
  time: string;
  status: string;
  cancha: ICancha;
}

export interface IUserSession {
  token: string;
  userDb: {
    displayName: string;
    address: string;
    email: string;
    id: string;
    name: string;
    phone: string;
    rol: string;
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
