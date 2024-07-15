//*Este modulo FormSede es un componente del cliente que lo que hace es crear la sede, esta opcion solamente la va a tener un usuario admin (Los usuarios admin son cuentas creadas por nostros)
"use client";
import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

//*Importacion de funcion que controlara este formulario
import { CRegister } from "@/helpers/Controllers/CRegister";

//*Importamos para hacer la peticion POST para registrarse
import { FetchRegister } from "@/service/ApiRegister";
import { IRegister } from "@/interface/IRegister";
import { useSport } from "@/context/SportContext";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/helpers/alert.helper/alert.helper";
import { useUser } from "@/context/UserContext";

const FormRegister = () => {
  const { sport } = useSport();
  const { logIn } = useUser();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [data, setData] = useState<IRegister>({
    email: "",
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const history = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  //*Funcion que guarda los cambios
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        if (response.success) {
          showSuccessAlert("Registro exitoso");

          history.push("/Login");
        } else {
          showErrorAlert("Error al registrarse");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error del servidor, intenta más tarde",
        });
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex bg-white h-full shadow-lg overflow-hidden w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
          style={{
            backgroundImage: `url(loginImage.png)`,
          }}
        ></div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center mb-20">
          <div className="w-full p-8 lg:w-1/2 justify-center align-middle flex flex-col mb-10">
            <form onSubmit={handleSubmit}>
              <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">
                Registrate
              </h1>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Correo electronico
                </label>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nombre completo
                  </label>
                </div>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Telefono
                  </label>
                </div>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="number"
                  name="phone"
                  value={data.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Contraseña
                  </label>
                </div>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Repite la contraseña
                  </label>
                </div>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="password"
                  // id="address"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-8">
                <button
                  // type="submit"
                  className="bg-blue-700 text-white font-bold py-3 px-4 w-full rounded hover:bg-blue-600">

                  Registrarse

                </button>
              </div>
              <div className="mt-4 flex items-center w-full text-center">
                <Link
                  href="/Login"
                  className="text-xs text-gray-500 capitalize text-center w-full"
                >
                  Ya tienes cuenta?
                  <span className="text-blue-700"> Inicie sesión.</span>
                </Link>
              </div>

            </form>


          </div>
        </div>

      </div>
    </div>
  );
};
export default FormRegister;
