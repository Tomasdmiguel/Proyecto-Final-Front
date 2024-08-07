"use client";
import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

//* Importación de función que controlará este formulario
import { CRegister } from "@/helpers/Controllers/CRegister";

//* Importamos para hacer la petición POST para registrarse
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
  const [isLoading, setIsLoading] = useState(false);

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

  //* Función que guarda los cambios
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value, name } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  //* Función que envía el formulario
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

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
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
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
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Contraseña
                  </label>
                </div>
                <div className="flex flex-row items-center border border-gray-300">
                  <input
                    className="text-gray-700  rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    className={`p-[1px] h-2/3  rounded-full`}
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? (
                      <svg
                        className={`h-[30px] w-[30px] fill-none stroke-gray-700                        }`}
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
                        className={`h-[30px] w-[30px] fill-none stroke-gray-700
                        `}
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

              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Repite la contraseña
                  </label>
                </div>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type={passwordVisible ? "text" : "password"}
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-8">
                <button
                  className="bg-blue-700 text-white font-bold py-3 px-4 w-full rounded hover:bg-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 text-white mr-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Cargando...
                    </div>
                  ) : (
                    "Registrarse"
                  )}
                </button>
              </div>
              <div className="mt-4 flex items-center w-full text-center">
                <Link
                  href="/Login"
                  className="text-xs text-gray-500 capitalize text-center w-full"
                >
                  ¿Ya tienes cuenta?
                  <span className="text-blue-700"> Inicia sesión.</span>
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
