"use client";
import FormAdmin from "@/components/FormAdmin/FormAdmin";
import { useSport } from "@/context/SportContext";

const AddAdmin = () => {
  const { sport } = useSport();
  return (
    <div
      className={`min-h-screen ${
        sport == 2 ? "bg-blue-400" : sport == 3 ? "bg-orange-500" : "bg-main"
      } flex items-center justify-center p-6  lg:p-8`}
    >
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Agregar Nuevo Canchero
          </h2>
        </div>
        <FormAdmin />
      </div>
    </div>
  );
};

export default AddAdmin;
// Complete el formulario para registrarte como un nuevo canchero
