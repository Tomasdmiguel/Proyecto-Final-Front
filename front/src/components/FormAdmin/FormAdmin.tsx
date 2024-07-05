"use client";
import { useState, useEffect } from "react";
import ApiPostAdmin from "@/service/ApiPostAdmin";
import { IUserDb } from "@/interface/IAdmin";
import { CCancha } from "@/helpers/Controllers/CCancha";
import { CAdmin } from "@/helpers/Controllers/CAdmin";
import { showErrorAlert, showSuccessAlert } from "@/helpers/alert.helper/alert.helper";

const FormAdmin = () => {
  const [data, setData] = useState({
    birthdate: "",
    dni: "",
    phone: "",
    city: "",
    address: "",
  });
  const [userDb, setUserDb] = useState<IUserDb>();

  useEffect(() => {
    const user = localStorage.getItem("userSession");
    if (user) {
      setUserDb(JSON.parse(user).userDb);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userDb) {
      try {
       if(CAdmin(data)) {

           const result = await ApiPostAdmin(userDb, data);
           console.log("Success:", result);
           showSuccessAlert(`Nos contactaremos en breve, gracias por elegirnos ${userDb.name}`)
       } else {
        showErrorAlert("Algo salio mal, revisa los campos")
       }
      } catch (error) {
        showErrorAlert("Algo salio mal vuelve a intentarlo mas tarde")
      }
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

      <form onSubmit={handleSubmit }>
        <div className="mb-4">
          <label htmlFor="birthdate" className="block text-terciario-white mb-2">
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
        
          <button
            type="submit"
            className="w-full border border-secundario text-terciario-white p-3 rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Enviar
          </button>
        
      </form>
    </div>
  );
};

export default FormAdmin;