export interface IUser {
  token: string;
  userDb: {
    email: string;
    id: string;
    imgUrl: string;
    name: string;
    phone: string;
    rol: string;
    sedes: any[];
  };
}
