//* Tarjeta que se muestra en la sección MISedes!!
import React, { useEffect, useState } from "react";
import { ISede } from "@/interface/ISedes";
import CardSede from "./CardSede";

//* Importamos la función que nos trae todas las sedes
import { getSedes } from "@/service/ApiSedes";

const Sedes = () => {
  const [sedes, setSedes] = useState<ISede[]>([]);

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const sedesData = await getSedes();
        setSedes(sedesData);
      } catch (error) {
        console.error("Error fetching sedes:", error);
      }
    };

    fetchSedes();
  }, []);

  return (
    <div className="bg-main flex flex-col justify-center items-center w-full p-4 gap-12">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto text-black space-y-8">
        {sedes.length > 0 ? (
          sedes.map((sede) => (
            <div key={sede.id} className="w-full">
              <CardSede {...sede} />
            </div>
          ))
       
        ) : (
          <p className="text-center">No hay sedes disponibles</p>
        )}
      </div>
    </div>
  );
};

export default Sedes;
