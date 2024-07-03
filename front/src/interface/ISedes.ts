import { IUser } from "./IUser";
import {IUserSede} from "./IUserSede";

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
  sedeName: string;
  turnos: [];
}

export interface ITurno {
  id: string;
  date: string;
  time: string;
  status: string;
}
