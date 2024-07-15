"use client";
import FormAdmin from "@/components/FormAdmin/FormAdmin";
import { useSport } from "@/context/SportContext";

const AddAdmin = () => {
  const { sport } = useSport();
  return (
    <div
      className={` ${sport == 2 ? "bg-blue-400" : sport == 3 ? "bg-orange-500" : "bg-main"
        } flex items-center justify-center`}
    >
      <div className="w-full h-full">

        <FormAdmin />
      </div>
    </div>
  );
};

export default AddAdmin;

