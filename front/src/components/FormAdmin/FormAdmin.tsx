"use client";
import { useState } from "react";
import ApiPostAdmin from "@/service/ApiPostAdmin";

import { CAdmin } from "@/helpers/Controllers/CAdmin";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/helpers/alert.helper/alert.helper";
import { useRouter } from "next/navigation";

const FormAdmin = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
    dni: "",
    phone: "",
    city: "",
    address: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!data) {
      showErrorAlert("Datos no disponibles, revisa los campos");
      return;
    }

    try {
      setLoading(true);
      if (CAdmin(data)) {
        const result = await ApiPostAdmin(data);
        if (result.success) {
          showSuccessAlert(
            `Nos contactaremos en breve, gracias por elegirnos ${data.name}`
          );
          router.push("/");
        } else {
          showErrorAlert(
            result.message ||
              "La solicitud no fue exitosa. Por favor, intente nuevamente."
          );
        }
      } else {
        showErrorAlert("Algo salió mal, revisa los campos");
      }
    } catch (error: any) {
      console.error("Error en ApiPostAdmin:", error);
      showErrorAlert(
        error.message || "Algo salió mal, vuelve a intentarlo más tarde"
      );
    } finally {
      setLoading(false);
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
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
          <div className="w-full p-8 lg:w-1/2 justify-center align-middle flex flex-col">
            <form onSubmit={handleSubmit}>
              <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">
                Formulario
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
                  <label
                    htmlFor="bithdate"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Fecha de Nacimiento
                  </label>
                </div>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  value={data.birthdate}
                  onChange={handleChange}
                  // required
                />
              </div>

              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    DNI
                  </label>
                </div>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="text"
                  id="dni"
                  name="dni"
                  value={data.dni}
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
                  type="text"
                  id="phone"
                  name="phone"
                  value={data.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Ciudad
                  </label>
                </div>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="text"
                  id="city"
                  name="city"
                  value={data.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Dirección
                  </label>
                </div>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="text"
                  id="address"
                  name="address"
                  value={data.address}
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
                        className={`h-[30px] w-[30px] fill-none stroke-gray-700
                        `}
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
                  // id="address"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-8">
                <button
                  disabled={loading}
                  className="bg-blue-700 text-white font-bold py-3 px-4 w-full rounded hover:bg-blue-600"
                >
                  {loading && (
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span className="ml-3">Cargando...</span>
                    </div>
                  )}
                  Registrarse
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAdmin;
