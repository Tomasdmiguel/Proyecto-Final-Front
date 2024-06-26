import React from "react";
import Link from "next/link";


export default function NavBar (){
    return (
        <nav className="flex gap-40 items-center w-[100%] p-2 mx-auto bg-[#F5F7F8] mb-3 ">
            
            <div className="pl-32">
                <input type="text" className="border rounded-xl border-[#F4CE14] pl-32 pb-1"/>
            </div>

        <div className="md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 top-[9%] flex items-center px-5 pl-20 ">
            <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] text-xl ">

                <li>
                <Link href={"/"} className="text-[#369676] p-2 text-2xl">
                Home
                </Link>
                </li>

                <li>
                <Link href={"/"} className="text-[#369676] p-2 text-2xl">
                Canchas
                </Link>
                </li>

                <li>
                <Link href={"/"} className="text-[#369676] p-2 text-2xl">
                Reserva
                </Link>
                </li>

                <li>
                <Link href={"/"} className="text-[#369676] p-2 text-2xl">
                Mis canchas
                </Link>
                </li>
  
                <li>
                <Link href={"/"} className="text-[#369676] p-2 text-2xl">
                Usuario
                </Link>
                </li>
  
            </ul>

        </div>
        </nav>
    )
}