"use client";
//*Este componente importado es un formulario para crear una sede
import FormSede from "@/components/Sede/FormSede";
import { useSport } from "@/context/SportContext";
const RutaFormsede = () => {
  const { sport } = useSport();
  return (
    <main>
      <div
        className={`${
          sport == 2 ? "bg-blue-400" : sport == 3 ? "bg-orange-500" : "bg-main"
        } flex justify-center items-center min-h-screen p-4 `}
      >
        <FormSede />
      </div>
    </main>
  );
};

export default RutaFormsede;
