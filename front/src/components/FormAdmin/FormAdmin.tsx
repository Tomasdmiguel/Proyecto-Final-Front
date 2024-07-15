"use client";
import { useState } from "react";
import ApiPostAdmin from "@/service/ApiPostAdmin";

import { CAdmin } from "@/helpers/Controllers/CAdmin";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/helpers/alert.helper/alert.helper";
import { useSport } from "@/context/SportContext";
import Link from "next/link";

const FormAdmin = () => {
  const { sport } = useSport();
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

        console.log(data);
        console.log(result.success);

        if (result.success) {
          showSuccessAlert(
            `Nos contactaremos en breve, gracias por elegirnos ${data.name}`
          );
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
              <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">Formulario</h1>
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
                  <label htmlFor="bithdate" className="block text-gray-700 text-sm font-bold mb-2">
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
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Contraseña
                  </label>
                </div>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="password"
                  // id="address"
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
                  disabled={loading} className="bg-blue-700 text-white font-bold py-3 px-4 w-full rounded hover:bg-blue-600">
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
