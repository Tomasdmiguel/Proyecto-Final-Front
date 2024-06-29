//*Este modulo FormSede es un componente del cliente que lo que hace es crear la sede, esta opcion solamente la va a tener un usuario admin (Los usuarios admin son cuentas creadas por nostros)
"use client";
import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

//*Importacion para controlar el form
import { CSede } from "@/helpers/Controllers/CSede";


//*Importacion para crear sede
import { fetchFormSede } from "@/service/ApiFormSede";

const FormSede = () => {
  const [datoSede, setdatoSede] = useState({
    name: "",
    location: "",
    description: "",
    
  });

  const route = useRouter();
  //*Funcion que guarda los cambios
  const hanldeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value, name } = event.target;
    setdatoSede({
      ...datoSede,
      [name]: value,
    });
  };
  //*Funcion que envia el formulario
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (CSede(datoSede)) {
      try {
        const response = await fetchFormSede(datoSede);
        if (response.success) {
          Swal.fire({
            icon: "success",
            title: "Se creo la sede con exito",
          });
          console.log("Sede creada exitosamente");
          
          route.push("/Dashboard");
        } else {
          console.error(
            "Error al crear la sede, la peticion a la api fue buena pero por algo no se pudo crear:",
            response.message
          );
          Swal.fire({
            icon: "error",
            title: "Error al crear el formulario revisa los datos",
            text: response.message,
          });
        }
      } catch (error) {
        console.error("Error inesperado:", error);
        Swal.fire({
          icon: "error",
          title: "Error inesperado",
          text: "Error desconocido, intenta más tarde",
        });
      }
    } else {
      //Se maneja el error de la validacion si salio todo mal
      Swal.fire({
        icon: "warning",
        title: "Datos inválidos",
        text: "Por favor, revisa los datos e intenta nuevamente",
      });
    }
  };

  return (
    <div className="bg-main max-w-md w-full p-8 rounded-lg shadow-lg text ">
      <h1 className="text-terciario-white text-center text-3xl  mb-6">
        CANCHITAS GOL
      </h1>

      <p className="text-secundario text-center mb-4">
        Bienvenido, crea tu sede para que los jugadores puedan reservar turnos
        en tu cancha
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-terciario-white mb-2">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            value={datoSede.name}
            placeholder="Escribi tu nombre"
            onChange={hanldeChange}
            className="w-full p-3    rounded-lg bg-terciario"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-terciario-white mb-2">
            Locacion
          </label>
          <input
            type="text"
            name="location"
            value={datoSede.location}
            placeholder="Ponga su locacion"
            onChange={hanldeChange}
            className="w-full p-3  rounded-lg bg-terciario"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="describe" className="block text-terciario-white mb-2">
            Descripcion
          </label>
          <input
            type="text"
            name="description"
            value={datoSede.description}
            placeholder="Descripcion"
            onChange={hanldeChange}
            className="w-full p-3  rounded-lg bg-terciario"
          />
        </div>

        {/* <div className="mb-6">
          <label htmlFor="img" className="block text-terciario-white mb-2">
            Imagen
          </label>
          <input
            type="url"
            name="img"
            value={datoSede.img}
            placeholder="Imagen"
            onChange={hanldeChange}
            className="w-full p-3   rounded-lg bg-terciario"
          />
        </div> */}

        <button
          type="submit"
          className="w-full border border-secundario text-terciario-white p-3 rounded-lg hover:bg-yellow-600">
          Crear sede
        </button>
      </form>

      <p className="text-terciario-white text-center mt-4">
        Si ya tienes una sede creada, ingresa para crear tu cancha.
      </p>
      <Link href="/FormCancha" className="text-secundario text-center">
        <p>Ingresa</p>
      </Link>
    </div>
  );
};
export default FormSede;
