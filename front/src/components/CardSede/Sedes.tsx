//* Tarjeta que se muestra en la sección MISedes!!
import React, { useEffect, useState } from "react";
import { ISede } from "@/interface/ISedes";
import CardSede from "./CardSede";

//* Importamos la función que nos trae todas las sedes
import { getSedes } from "@/service/ApiSedes";
import { useSport } from "@/context/SportContext";

const Sedes = () => {
  const [sedes, setSedes] = useState<ISede[]>([]);
  const { sport } = useSport();

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
    <div className="bg-white py-6">
      <div className="bg-white p-8 rounded-lg w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto text-black space-y-8">
        {sedes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {sedes.map((sede) => (
              <CardSede key={sede.id} {...sede} />
            ))}
          </div>
        ) : (
          <p className="text-center">No hay sedes disponibles</p>
        )}
      </div>
    </div>
  );
};

export default Sedes;


// //* Tarjeta que se muestra en la sección MISedes!!
// import React, { useEffect, useState } from "react";
// import { ISede } from "@/interface/ISedes";
// import CardSede from "./CardSede";

// //* Importamos la función que nos trae todas las sedes
// import { getSedes } from "@/service/ApiSedes";
// import { useSport } from "@/context/SportContext";

// const Sedes = () => {
//   const [sedes, setSedes] = useState<ISede[]>([]);
//   const { sport } = useSport();

//   useEffect(() => {
//     const fetchSedes = async () => {
//       try {
//         const sedesData = await getSedes();
//         setSedes(sedesData);
//       } catch (error) {
//         console.error("Error fetching sedes:", error);
//       }
//     };

//     fetchSedes();
//   }, []);

//   return (
//     <div
//       className={` ${
//         sport == 2 ? "bg-blue-400" : sport == 3 ? "bg-orange-500" : "bg-main"
//       } flex flex-col justify-center items-center w-full p-4 gap-12`}
//     >
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto text-black space-y-8">
//         {sedes.length > 0 ? (
//           sedes.map((sede) => <CardSede key={sede.id} {...sede} />)
//         ) : (
//           <p className="text-center">No hay sedes disponibles</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sedes;
