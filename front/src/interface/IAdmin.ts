

export interface IUserDb {
    id: string;
    name: string;
    email: string;
    imgUrl: string;
    phone: string;
    rol: string;
    birthdate?: string | null;
    dni?: string | null;
    city?: string | null;
    address?: string | null;
    sedes: any[]; 
  }
  
  export interface IUserSession {
    success: string;
    token: string;
    userDb: IUserDb;
  }

  export interface addAdmin {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    birthdate: string;
    dni: string;
    phone: string;
    city: string;
    address: string;
  }