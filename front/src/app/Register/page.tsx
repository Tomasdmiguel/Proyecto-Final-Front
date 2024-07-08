//*Este  es una ruta para poder mostrar el componente register
"use client";
import FormRegister from "@/components/Register/FormRegister";
import { useSport } from "@/context/SportContext";
const RutaFormRegister = () => {
  const { sport } = useSport();
  return (
    <main>
      <div
        className={` flex justify-center items-center min-h-screen p-4 ${
          sport == 2
            ? "bg-blue-400"
            : sport == 3
            ? "bg-orange-500 "
            : "bg-main "
        } 
      `}
      >
        <FormRegister />
      </div>
    </main>
  );
};

export default RutaFormRegister;
