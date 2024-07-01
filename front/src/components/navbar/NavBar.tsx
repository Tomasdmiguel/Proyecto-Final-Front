/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import imgUsuario from "@/assets/user_profile_man-256.webp";
import { usePathname } from "next/navigation";
import { useSport } from "@/context/SportContext";

export default function NavBar() {
  const pathname = usePathname();
  const [userData, setUserData] = useState<any>();
  const { sport } = useSport();

  //Cada vez que el nav se carge va intentar traer el userSession y setearlo dentro de este estado local del componente
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = localStorage.getItem("usuarioSesion");
      setUserData(JSON.parse(userData!));
    }
  }, [pathname]);

  return (
    <nav
      className={`flex flex-row justify-center items-center h-[15vh] w-full p-2 bg-terciario-white border-b-2 ${
        sport == 2
          ? "border-blue-400 text-blue-400"
          : sport == 3
          ? "border-orange-500 text-orange-500"
          : "border-main text-main"
      }
     `}
    >
      <div className="flex flex-row justify-around items-center lg:max-w-[60vw]">
        <Link href={"/"}>
          <div>
            <img src="/icon.png" alt="Companny Logo" className=" w-[12vh]" />
          </div>
        </Link>

        <div className="px-5">
          <ul className="max-w-[768px] flex flex-row items-center space-x-10 text-xl ">
            <li>
              <Link
                href={"/"}
                className=" hover:font-black p-2 text-2xl duration-300 ease-in-out"
              >
                Home
              </Link>
            </li>

            {/* <li>
              <Link
                href={"/"}
                className=" hover:font-black p-2 text-2xl duration-300 ease-in-out"
              >
                Mis reservas
              </Link>
            </li> */}

            <li>
              <Link
                href={"/sedes"}
                className=" hover:font-black p-2 text-2xl duration-300 ease-in-out"
              >
                Sedes
              </Link>
            </li>
          </ul>
        </div>

        {userData?.token ? (
          <Link
            href={"/Dashboard"}
            className=" hover:font-black p-2 text-2xl duration-300 ease-in-out"
          >
            <img src={imgUsuario.src} alt="" className="h-10" />
          </Link>
        ) : (
          <div>
            <Link
              href={"/Login"}
              className={`  font-bold text-base md:text-lg p-2 rounded-lg border-2  hover:text-terciario-white duration-300 ease-in-out ${
                sport == 2
                  ? "border-blue-400 text-blue-400 hover:bg-blue-400"
                  : sport == 3
                  ? "border-orange-500 text-orange-600 hover:bg-orange-500"
                  : "border-main text-main hover:bg-main"
              }`}
            >
              Log In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
