//* Tarjeta que se muestra en la sección MISedes!!
import React, { useEffect, useState } from "react";
import { ISede } from "@/interface/ISedes";
import CardSede from "./CardSede";

//* Importamos la función que nos trae todas las sedes
import { getSedes } from "@/service/ApiSedes";

const MiSede = () => {
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
    <div>
      {sedes.length > 0 ? (
        sedes.map((sede) => <CardSede key={sede.id} {...sede} />)
      ) : (
        <p>No hay sedes disponibles</p>
      )}
    </div>
  );
};

export default MiSede;
