"use client";
import { useSport } from "@/context/SportContext";
import { ISede } from "@/interface/ISedes";
import { IUserSession } from "@/interface/context";
import { useEffect, useState } from "react";

export const SedesAdmin = ({ sedes }: { sedes: ISede[] }) => {
  const { sport } = useSport();
  const [userData, setUserData] = useState<IUserSession | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = localStorage.getItem("usuarioSesion");
      if (userData) {
        setUserData(JSON.parse(userData));
      }
    }
  }, [setUserData]);

  const filteredSedes = sedes?.filter(
    (sede: ISede) => sede?.user?.id === userData?.userDb.id
  );

  return (
    <div className="flex flex-col gap-16 text-2xl">
      {filteredSedes.map((sede) => (
        <div
          key={sede.name}
          className={`w-full max-h-60 rounded-sm shadow-xl  ${
            sport == 2
              ? "hover:bg-blue-400"
              : sport == 3
              ? "hover:bg-orange-500"
              : "hover:bg-main"
          } hover:text-white ease-in-out duration-300 p-4 space-x-4 space-y-6`}
        >
          <h2 className="font-Marko font-bold text-3xl">{sede.name}</h2>
          <p>Dirección: {sede.location}</p>
          <p>Descripción: {sede.description}</p>
        </div>
      ))}
    </div>
  );
};
export default SedesAdmin;
