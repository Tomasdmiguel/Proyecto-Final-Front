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
    <div className="bg-gray-700 max-w-md w-full p-8 rounded-lg shadow-lg text">
      <h1 className="text-terciario-white text-center text-3xl font-bold mb-6">
        RESERVA GOL
      </h1>

      <p
        className={`${sport == 2
            ? "text-blue-400"
            : sport == 3
              ? "text-orange-500"
              : "text-main"
          } text-center font-semibold text-lg mb-4`}
      >
        Registrate gratis
      </p>

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
            onChange={handleChange}
            className={`w-full p-3 rounded-lg bg-white text-black placeholder-black outline-0 focus:ring-4 ${sport == 2
                ? "ring-blue-400"
                : sport == 3
                  ? "ring-orange-500"
                  : "focus:ring-main"
              }`}
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
            onChange={handleChange}
            className={`w-full p-3 rounded-lg bg-white text-black placeholder-black outline-0 focus:ring-4 ${sport == 2
                ? "ring-blue-400"
                : sport == 3
                  ? "ring-orange-500"
                  : "focus:ring-main"
              }`}
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
            onChange={handleChange}
            className={`w-full p-3 rounded-lg bg-white text-black placeholder-black outline-0 focus:ring-4 ${sport == 2
                ? "ring-blue-400"
                : sport == 3
                  ? "ring-orange-500"
                  : "focus:ring-main"
              }`}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-terciario-white mb-2">
            Contraseña
          </label>
          <div className="flex flex-row space-x-4 items-center">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={data.password}
              placeholder="Escribe tu contraseña"
              onChange={handleChange}
              className={`w-full p-3 rounded-lg bg-white text-black placeholder-black outline-0 focus:ring-4 ${sport == 2
                  ? "ring-blue-400"
                  : sport == 3
                    ? "ring-orange-500"
                    : "focus:ring-main"
                }`}
            />
            <button
              className={`p-[1px] h-2/3 border-2 ${sport == 2
                  ? "border-blue-400"
                  : sport == 3
                    ? "border-orange-500"
                    : "border-main"
                }  rounded-full`}
              type="button"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <svg
                  className={`h-[30px] w-[30px] fill-none ${sport == 2
                      ? "stroke-blue-400"
                      : sport == 3
                        ? "stroke-orange-500"
                        : "stroke-main"
                    }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                </svg>
              ) : (
                <svg
                  className={`h-[30px] w-[30px] fill-none ${sport == 2
                      ? "stroke-blue-400"
                      : sport == 3
                        ? "stroke-orange-500"
                        : "stroke-main"
                    }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                  <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                  <path d="M3 3l18 18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="passwordMatch"
            className="block text-terciario-white mb-2"
          >
            Repite la contraseña
          </label>
          <input
            type={passwordVisible ? "text" : "password"}
            name="confirmPassword"
            value={data.confirmPassword}
            placeholder="Escribe tu contraseña nuevamente"
            onChange={handleChange}
            className={`w-full p-3 rounded-lg bg-white text-black placeholder-black outline-0 focus:ring-4 ${sport == 2
                ? "ring-blue-400"
                : sport == 3
                  ? "ring-orange-500"
                  : "focus:ring-main"
              }`}
          />
        </div>

        <button
          type="submit"
          className={`w-full border ${sport == 2
              ? "border-blue-400 hover:bg-blue-400"
              : sport == 3
                ? "border-orange-500 hover:bg-orange-500"
                : "border-main hover:bg-main"
            } text-terciario-white p-3 rounded-lg duration-300 ease-in-out`}
        >
          Registrarse
        </button>
      </form>

      <p className="text-terciario-white text-center mt-4">
        Si ya tienes una cuenta creada
        <br />
        <Link
          className={`${sport == 2
              ? "text-blue-400"
              : sport == 3
                ? "text-orange-500"
                : "text-main"
            }`}
          href="/Login"
        >
          Iniciar sesión
        </Link>
      </p>
    </div>
  );
};
export default FormRegister;
