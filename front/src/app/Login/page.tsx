"use client";
import FormLogin from "@/components/Login/FormLogin";
import { useSport } from "@/context/SportContext";
const RutaFormLogin = () => {
  const { sport } = useSport();
  return (
    <div
      className={` flex justify-center items-center min-h-screen p-4 ${
        sport == 2 ? "bg-blue-400" : sport == 3 ? "bg-orange-500 " : "bg-main "
      } 
  `}
    >
      <FormLogin />
    </div>
  );
};

export default RutaFormLogin;
