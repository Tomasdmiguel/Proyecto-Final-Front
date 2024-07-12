/* eslint-disable @next/next/no-img-element */
import { ISede } from "@/interface/ISedes";
import React from "react";
import Link from "next/link";
import { useSport } from "@/context/SportContext";

const CardSede = ({ name, location, description, id, imgUrl }: ISede) => {
  const { sport } = useSport();
  return (
    <Link
      className={`rounded overflow-hidden flex flex-col hover:scale-105 transition duration-300 ease-in-out ${
        sport == 2
          ? "hover:shadow-md hover:shadow-blue-400 shadow-2xl border border-blue-300"
          : sport == 3
          ? "hover:shadow-md hover:shadow-orange-500 shadow-2xl border hover:border-orange-300"
          : "hover:shadow-md hover:shadow-main shadow-2xl border hover:border-green-400"
      }`}
      href={`/sede/${id}`}
    >
      <div className="relative">
        <img className="w-full h-48 object-cover" src={imgUrl} alt={name} />
        <div className="transition-opacity duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-15 hover:opacity-0"></div>
      </div>
      <div className="px-6 py-4 mb-auto">
        <div className="font-medium text-lg inline-block mb-2">{name}</div>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
      <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-800">
        <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
          <svg
            className="h-5 w-5 text-gray-600 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 12a3 3 0 100-6 3 3 0 000 6z"
            />
          </svg>
          <span className="ml-1 text-gray-100 font-semibold font-bebas-neue">
            {location}
          </span>
        </span>
      </div>
    </Link>
  );
};

export default CardSede;


// /* eslint-disable @next/next/no-img-element */
// import { ISede } from "@/interface/ISedes";
// import React from "react";

// import Link from "next/link";
// import { useSport } from "@/context/SportContext";

// const CardSede = ({ name, location, description, id, imgUrl }: ISede) => {
//   const { sport } = useSport();
//   return (
//     <div
//       className={`
//         ${
//           sport == 2
//             ? "hover:bg-blue-400 shadow-blue-400"
//             : sport == 3
//             ? "hover:bg-orange-500 shadow-orange-500"
//             : "hover:bg-main shadow-main"
//         }
//         w-full min-h-fit font-Marko text-lg flex flex-row rounded-md shadow-lg hover:text-white hover:shadow-xl  transition duration-300 ease-in-out p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 md:space-y-8`}
//     >
//       <img className="size-60 rounded-full" src={imgUrl} alt="" />
//       <div className="h-full flex flex-col items-center justify-start w-full ">
//         <h1 className="font-black text-2xl uppercase">{name} </h1>
//         <p>{location} </p>
//         <p className="text-center">Descripción: {description} </p>
//         <Link
//           href={`/sede/${id}`}
//           className="px-4 py-2 w-fit self-end bg-terciario text-terciario-white font-bold rounded-md  transition duration-300 ease-in-out sm:mt-6 sm:px-6 sm:py-3 md:mt-8 md:px-8 md:py-4 hover:bg-terciario-white hover:text-terciario hover:shadow-sm hover:shadow-terciario"
//         >
//           Ver canchas
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default CardSede;
