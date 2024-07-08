"use client";
import { useState } from "react";
import ApiPostAdmin from "@/service/ApiPostAdmin";

import { CAdmin } from "@/helpers/Controllers/CAdmin";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/helpers/alert.helper/alert.helper";

const FormAdmin = () => {
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
      if (CAdmin(data)) {
        const result = await ApiPostAdmin(data);
       
        
        if (result.success) { 
          showSuccessAlert(`Nos contactaremos en breve, gracias por elegirnos ${data.name}`);
        } else {
          showErrorAlert("La solicitud no fue exitosa. Por favor, intente nuevamente.");
          console.log(result.message)
        }
      } else {
        showErrorAlert("Algo salió mal, revisa los campos");
      }
    } catch (error) {
      console.error("Error en ApiPostAdmin:", error);
      showErrorAlert("Algo salió mal, vuelve a intentarlo más tarde");
    }
  };

  return (
    <div className="bg-main max-w-md w-full mx-auto p-8 rounded-lg shadow-lg text">
      <h1 className="text-terciario-white text-center text-3xl font-bold mb-6">
        Formulario
      </h1>

      <p className="text-secundario text-center mb-4">
        Por favor, complete su información personal
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
            placeholder="Nombre"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white text-black placeholder-black focus:border-yellow-600"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="birthdate"
            className="block text-terciario-white mb-2">
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={data.birthdate}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white text-black focus:border-yellow-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dni" className="block text-terciario-white mb-2">
            DNI
          </label>
          <input
            type="text"
            id="dni"
            name="dni"
            value={data.dni}
            onChange={handleChange}
            placeholder="Ingrese su DNI"
            className="w-full p-3 rounded-lg bg-white text-black focus:border-yellow-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-terciario-white mb-2">
            Teléfono
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            placeholder="Ingrese su número de teléfono"
            className="w-full p-3 rounded-lg bg-white text-black focus:border-yellow-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-terciario-white mb-2">
            Ciudad
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={data.city}
            onChange={handleChange}
            placeholder="Ingrese su ciudad"
            className="w-full p-3 rounded-lg bg-white text-black focus:border-yellow-600"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="address" className="block text-terciario-white mb-2">
            Dirección
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={data.address}
            onChange={handleChange}
            placeholder="Ingrese su dirección"
            className="w-full p-3 rounded-lg bg-white text-black focus:border-yellow-600"
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
            onChange={handleChange}
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
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white text-black placeholder-black focus:border-yellow-600"
          />
        </div>
        <button
          type="submit"
          className="w-full border border-secundario text-terciario-white p-3 rounded-lg hover:bg-yellow-600 transition duration-300">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default FormAdmin;
