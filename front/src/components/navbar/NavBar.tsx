'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import imgUsuario from "@/assets/user_profile_man-256.webp";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const [userData, setUserData] = useState<any>();
  
//Cada vez que el nav se carge va intentar traer el userSession y setearlo dentro de este estado local del componente
  useEffect(() => {
      if (typeof window !== "undefined" && window.localStorage){
          const userData = localStorage.getItem("userSession")
          setUserData(JSON.parse(userData!))
      }
  }, [pathname])

  return (
    <nav className="flex justify-center items-center w-[100%] p-2 mx-auto bg-white">
     

      <Link href={"/"}>
        <div>
          <img src="/logoPagina.png" alt="Companny Logo" className="mr-16  h-[60px] w-[60px]" />
        </div>
      </Link>

      <div className="md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 top-[9%] flex items-center px-5 ">
        <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] text-xl ">
          <li>
            <Link
              href={"/"}
              className="text-[#369676] hover:underline hover:text-[#4ec29b] hover:text-[25px] p-2 text-2xl">
              Home
            </Link>
          </li>

          <li>
            <Link
              href={"/"}
              className="text-[#369676] hover:underline hover:text-[#4ec29b] hover:text-[25px] p-2 text-2xl">
              Canchas
            </Link>
          </li>

          <li>
            <Link
              href={"/"}
              className="text-[#369676] hover:underline hover:text-[#4ec29b] hover:text-[25px] p-2 text-2xl">
              Reserva
            </Link>
          </li>

          <li>
            <Link
              href={"/"}
              className="text-[#369676] hover:underline hover:text-[#4ec29b] hover:text-[25px] p-2 text-2xl">
              Mis canchas
            </Link>
          </li>
          {userData?.token ? (
            <li className="ml-20">
            <Link
              href={"/Dashboard"}
              className="text-[#369676] hover:underline hover:text-[#4ec29b] hover:text-[25px] p-2 text-2xl">
              <img src={imgUsuario.src} alt="" className="h-10" />
            </Link>
          </li>

          ) : (
            <div>
                     <Link href={"/Login"}>
                <button className="bg-black text-white p-2 rounded-lg hover:bg-emerald-500  hover:shadow-cyan-300 px-3 mr-6 ml-20">
                    Log In
                </button>
                </Link>
                </div>
          )}
          
        </ul>
      </div>
    </nav>
  );
}
