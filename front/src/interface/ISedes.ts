import { IUser } from "./IUser";

export interface ISede {
  id: string;
  name: string;
  description?: string;
  location?: string;
  imgUrl?: string;
  canchas?: ICancha[];
  user: IUser;
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
}
