//*Este modulo FormSede es un componente del cliente que lo que hace es crear la sede, esta opcion solamente la va a tener un usuario admin (Los usuarios admin son cuentas creadas por nostros)
"use client";
import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

//*Importacion de funcion que controlara este formulario
import { CRegister } from "@/helpers/Controllers/CRegister";

//*Importamos para hacer la peticion POST para registrarse
import { FetchRegister } from "@/service/ApiRegister";
import { IRegister } from "@/interface/IRegister";

const FormRegister = () => {
  const [data, setData] = useState<IRegister>({
    email: "",
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  
  //*Funcion que guarda los cambios
  const hanldeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value, name } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  //*Funcion que envia el formulario
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (CRegister(data)) {
      try {
        const response = await FetchRegister(data);
        Swal.fire({
          icon: response.success ? 'success' : 'error',
          title: response.message,
        });
        console.log(response.success)
        
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: "Error del servidor, intenta más tarde",
        });
      }
    }
  };

  return (
    <div className="bg-main max-w-md w-full p-8 rounded-lg shadow-lg text">
  <h1 className="text-terciario-white text-center text-3xl font-bold mb-6">
    CANCHITAS GOL
  </h1>

  <p className="text-secundario text-center mb-4">Registrate gratis</p>

  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label htmlFor="email" className="block text-terciario-white mb-2">
        Email
      </label>
      <input
        type="text"
        name="email"
        value={data.email}
        placeholder="Escribí tu email"
        onChange={hanldeChange}
        className="w-full p-3 rounded-lg bg-white text-black placeholder-black focus:border-yellow-600"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="user" className="block text-terciario-white mb-2">
        Nombre de usuario
      </label>
      <input
        type="text"
        name="name"
        value={data.name}
        placeholder="Nombre de usuario"
        onChange={hanldeChange}
        className="w-full p-3 rounded-lg bg-white text-black placeholder-black focus:border-yellow-600"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="phone" className="block text-terciario-white mb-2">
        Número telefónico
      </label>
      <input
        type="number"
        name="phone"
        value={data.phone}
        placeholder="Número telefónico"
        onChange={hanldeChange}
        className="w-full p-3 rounded-lg bg-white text-black placeholder-black focus:border-yellow-600"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="password" className="block text-terciario-white mb-2">
        Contraseña
      </label>
      <input
        type="password"
        name="password"
        value={data.password}
        placeholder="Escribe tu contraseña"
        onChange={hanldeChange}
        className="w-full p-3 rounded-lg bg-white text-black placeholder-black focus:border-yellow-600"
      />
    </div>

    <div className="mb-4">
      <label
        htmlFor="passwordMatch"
        className="block text-terciario-white mb-2">
        Repite la contraseña
      </label>
      <input
        type="password"
        name="confirmPassword"
        value={data.confirmPassword}
        placeholder="Escribe tu contraseña nuevamente"
        onChange={hanldeChange}
        className="w-full p-3 rounded-lg bg-white text-black placeholder-black focus:border-yellow-600"
      />
    </div>

    <button
      type="submit"
      className="w-full border border-secundario text-terciario-white p-3 rounded-lg hover:bg-yellow-600">
      Registrarse
    </button>
  </form>

  <p className="text-terciario-white text-center mt-4">
    Si ya tienes una cuenta creada
    <br />
    <Link className="text-secundario" href="/Login">
      Iniciar sesión
    </Link>
  </p>
</div>

  );
};
export default FormRegister;
