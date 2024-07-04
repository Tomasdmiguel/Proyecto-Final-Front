import { ISede } from "./ISedes";

export interface IUserSede {
  email: string;
  id: string;
  imgUrl: string;
  name: string;
  phone: string;
  rol: string;
  sedes: ISede[];
}
