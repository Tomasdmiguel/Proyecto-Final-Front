import React from "react";
import Link from "next/link";
import imgUsuario from "@/assets/user_profile_man-256.webp";

export default function NavBar() {
  return (
    <nav className="flex gap-40 items-center w-[100%] p-1 mx-auto bg-[#F5F7F8] ">
      {/* ESTA PARTE ES LA SERARCH BAR */}
      {/* <div className="pl-32">
                <input type="text" className="border rounded-xl border-[#F4CE14] pl-32 pb-1"/>
            </div> */}

      <Link href={"/"}>
        <div>
          <img src="#" alt="Companny Logo" className="w-24" />
        </div>
      </Link>

      <div className="md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 top-[9%] flex items-center px-5 pl-20 ">
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

          <li className="ml-20">
            <Link
              href={"/Dashboard"}
              className="text-[#369676] hover:underline hover:text-[#4ec29b] hover:text-[25px] p-2 text-2xl">
              <img src={imgUsuario.src} alt="" className="h-10" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
