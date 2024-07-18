"use client";
import { useSport } from "@/context/SportContext";
import { useUser } from "@/context/UserContext";
import { ISede } from "@/interface/ISedes";
import Link from "next/link";
import { useState } from "react";

export const SedesAdmin = ({ sedes }: { sedes: ISede[] }) => {
  const { sport } = useSport();
  const { userData } = useUser();
  const [openId, setOpenId] = useState<string | null>(null);

  const filteredSedes = sedes?.filter(
    (sede: ISede) => sede?.user?.id === userData?.userDb.id
  );

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div
      className={`bg-white p-8 rounded-lg shadow-lg space-y-4 w-[80vw] sm:w-[60vw] lg:w-[50vw] text-black border-2 ${
        sport == 2
          ? "border-blue-400"
          : sport == 3
          ? "border-orange-400"
          : "border-main"
      }`}
    >
      <h1 className="text-3xl font-bold text-black">Mis sedes</h1>
      <p className="text-lg text-gray-400">
        Esta es la sección de tus sedes creadas.
      </p>
      <div className="flex flex-col w-full space-y-6 text-2xl">
        {filteredSedes.map((sede) => (
          <div
            key={sede.name}
            className={`border-2 rounded p-2  ${
              sport == 2
                ? "border-blue-400"
                : sport == 3
                ? "border-orange-400"
                : "border-main"
            } w-full`}
          >
            <div className="flex flex-row w-full justify-between">
              <h2 className="font-bold text-3xl">{sede?.name}</h2>
              <button onClick={() => toggleOpen(sede.id)}>
                {openId !== sede.id ? (
                  <svg
                    className="duration-300 ease-in-out hover:cursor-pointer fill-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="16"
                    viewBox="0 0 40 23"
                  >
                    <path d="M20 23L0 2.99995L2.8 0.199951L20 17.4L37.2 0.199951L40 2.99995L20 23Z" />
                  </svg>
                ) : (
                  <svg
                    className="duration-300 ease-in-out hover:cursor-pointer fill-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="16"
                    viewBox="0 0 40 23"
                    style={{ transform: "rotate(180deg)" }}
                  >
                    <path d="M20 23L0 2.99995L2.8 0.199951L20 17.4L37.2 0.199951L40 2.99995L20 23Z" />
                  </svg>
                )}
              </button>
            </div>
            {openId === sede.id && (
              <div className="bg-white m-2 flex-col flex text-sm sm:flex-col sm:text-lg">
                <p>
                  <strong>Ubicación:</strong> {sede.location}.
                </p>
                <p>{sede.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="w-full flex flex-row items-end justify-end space-x-6">
        <Link
          href={"/Formsede"}
          className={` ${
            sport == 2
              ? "hover:bg-blue-400 border-blue-400 text-blue-400"
              : sport == 3
              ? "hover:bg-orange-500 border-orange-500 text-orange-500"
              : "hover:bg-main border-main text-main"
          }  md:text-lg p-3 rounded-lg border border-x-2 border-y-2  font-semibold  hover:text-white duration-200 ease-in-out`}
        >
          Crear sede
        </Link>
        <Link
          className={` ${
            sport == 2
              ? "hover:bg-blue-400 border-blue-400 text-blue-400"
              : sport == 3
              ? "hover:bg-orange-500 border-orange-500 text-orange-500"
              : "hover:bg-main border-main text-main"
          }  md:text-lg p-3 rounded-lg border border-x-2 border-y-2  font-semibold  hover:text-white duration-200 ease-in-out`}
          href={`/FormCancha/${userData?.userDb?.id}`}
        >
          Crear Cancha
        </Link>
      </div>
    </div>
  );
};
export default SedesAdmin;
