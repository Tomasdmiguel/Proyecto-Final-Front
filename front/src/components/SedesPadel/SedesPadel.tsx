/* eslint-disable @next/next/no-img-element */
import { useSport } from "@/context/SportContext";
import { ISede } from "@/interface/ISedes";
import Link from "next/link";
import { useState } from "react";

export const SedesPadel = ({ sedes }: { sedes: ISede[] }) => {
  const { sport, closeSport } = useSport();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredSede = sedes.filter((sede) =>
    sede.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`p-8 bg-blue-200 rounded-md flex flex-col justify-center items-center shadow-md space-y-4 text-terciario-white w-full ${
        sport == 1 || sport == 2 || sport == 3 ? "flex" : "hidden absolute"
      }`}
    >
      <div className="flex justify-center items-center w-full">
        <input
          className="m-4 w-3/4 p-3 rounded-3xl  font-semibold hover:shadow-md text-blue-400 outline-blue-400"
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleChange}
        />
      </div>

      {searchTerm
        ? filteredSede?.map(({ id, name, location, description, imgUrl }) => {
            return (
              <Link
                href={`/sede/${id}`}
                key={id}
                className="border-4 max-h-[45vh] border-terciario-white hover:border-blue-400 w-3/4 text-black bg-terciario-white p-2 rounded flex flex-row items-center hover:cursor-pointer  ease-in-out duration-300"
              >
                <div className="w-1/2 p-4">
                  <img className="w-full max-h-[35vh]" src={imgUrl} alt="" />
                </div>
                <div className="flex flex-col p-4 space-y-4 font-bold w-1/2">
                  <h1 className="text-3xl">{name} </h1>
                  <p>{description} </p>
                  <div className="flex flex-row space-x-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 64 64"
                      fill="none"
                    >
                      <path
                        d="M32 36C30.0222 36 28.0888 35.4135 26.4443 34.3147C24.7998 33.2159 23.5181 31.6541 22.7612 29.8268C22.0043 27.9996 21.8063 25.9889 22.1922 24.0491C22.578 22.1093 23.5304 20.3275 24.9289 18.9289C26.3275 17.5304 28.1093 16.578 30.0491 16.1922C31.9889 15.8063 33.9996 16.0043 35.8268 16.7612C37.6541 17.5181 39.2159 18.7998 40.3147 20.4443C41.4135 22.0888 42 24.0222 42 26C41.9968 28.6512 40.9422 31.1929 39.0676 33.0676C37.1929 34.9422 34.6512 35.9968 32 36ZM32 20C30.8133 20 29.6533 20.3519 28.6666 21.0112C27.6799 21.6705 26.9109 22.6075 26.4567 23.7039C26.0026 24.8003 25.8838 26.0067 26.1153 27.1705C26.3468 28.3344 26.9182 29.4035 27.7574 30.2426C28.5965 31.0818 29.6656 31.6532 30.8295 31.8847C31.9934 32.1162 33.1997 31.9974 34.2961 31.5433C35.3925 31.0892 36.3295 30.3201 36.9888 29.3334C37.6481 28.3467 38 27.1867 38 26C37.9984 24.4092 37.3658 22.884 36.2409 21.7591C35.116 20.6342 33.5908 20.0016 32 20Z"
                        fill="black"
                      />
                      <path
                        d="M32 60L15.128 40.102C14.8936 39.8032 14.6616 39.5026 14.432 39.2C11.5514 35.4028 9.99465 30.7662 10 26C10 20.1652 12.3179 14.5695 16.4437 10.4437C20.5695 6.31785 26.1653 4 32 4C37.8348 4 43.4306 6.31785 47.5564 10.4437C51.6822 14.5695 54 20.1652 54 26C54.0046 30.7639 52.4486 35.3982 49.57 39.194L49.568 39.2C49.568 39.2 48.968 39.988 48.878 40.094L32 60ZM17.626 36.79C17.626 36.79 18.092 37.406 18.198 37.538L32 53.816L45.82 37.516C45.908 37.406 46.376 36.786 46.378 36.784C48.7324 33.6823 50.0048 29.8941 50 26C50 21.2261 48.1036 16.6477 44.7279 13.2721C41.3523 9.89642 36.7739 8 32 8C27.2261 8 22.6477 9.89642 19.2721 13.2721C15.8964 16.6477 14 21.2261 14 26C13.9951 29.8966 15.2689 33.6872 17.626 36.79Z"
                        fill="black"
                      />
                    </svg>
                    <p> {location} </p>
                  </div>
                </div>
              </Link>
            );
          })
        : sedes &&
          sedes?.map(({ id, name, location, description, imgUrl }) => {
            return (
              <Link
                href={`/sede/${id}`}
                key={id}
                className="border-4 max-h-[45vh] border-terciario-white hover:border-blue-400 w-3/4 text-black bg-terciario-white p-8 rounded flex flex-row items-center hover:cursor-pointer 0 ease-in-out duration-300"
              >
                <div className="w-1/2 p-4">
                  <img className="w-full max-h-[35vh]" src={imgUrl} alt="" />
                </div>
                <div className="flex flex-col p-4 space-y-4 font-bold w-1/2">
                  <h1 className="text-3xl">{name} </h1>
                  <p>{description} </p>
                  <div className="flex flex-row space-x-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 64 64"
                      fill="none"
                    >
                      <path
                        d="M32 36C30.0222 36 28.0888 35.4135 26.4443 34.3147C24.7998 33.2159 23.5181 31.6541 22.7612 29.8268C22.0043 27.9996 21.8063 25.9889 22.1922 24.0491C22.578 22.1093 23.5304 20.3275 24.9289 18.9289C26.3275 17.5304 28.1093 16.578 30.0491 16.1922C31.9889 15.8063 33.9996 16.0043 35.8268 16.7612C37.6541 17.5181 39.2159 18.7998 40.3147 20.4443C41.4135 22.0888 42 24.0222 42 26C41.9968 28.6512 40.9422 31.1929 39.0676 33.0676C37.1929 34.9422 34.6512 35.9968 32 36ZM32 20C30.8133 20 29.6533 20.3519 28.6666 21.0112C27.6799 21.6705 26.9109 22.6075 26.4567 23.7039C26.0026 24.8003 25.8838 26.0067 26.1153 27.1705C26.3468 28.3344 26.9182 29.4035 27.7574 30.2426C28.5965 31.0818 29.6656 31.6532 30.8295 31.8847C31.9934 32.1162 33.1997 31.9974 34.2961 31.5433C35.3925 31.0892 36.3295 30.3201 36.9888 29.3334C37.6481 28.3467 38 27.1867 38 26C37.9984 24.4092 37.3658 22.884 36.2409 21.7591C35.116 20.6342 33.5908 20.0016 32 20Z"
                        fill="black"
                      />
                      <path
                        d="M32 60L15.128 40.102C14.8936 39.8032 14.6616 39.5026 14.432 39.2C11.5514 35.4028 9.99465 30.7662 10 26C10 20.1652 12.3179 14.5695 16.4437 10.4437C20.5695 6.31785 26.1653 4 32 4C37.8348 4 43.4306 6.31785 47.5564 10.4437C51.6822 14.5695 54 20.1652 54 26C54.0046 30.7639 52.4486 35.3982 49.57 39.194L49.568 39.2C49.568 39.2 48.968 39.988 48.878 40.094L32 60ZM17.626 36.79C17.626 36.79 18.092 37.406 18.198 37.538L32 53.816L45.82 37.516C45.908 37.406 46.376 36.786 46.378 36.784C48.7324 33.6823 50.0048 29.8941 50 26C50 21.2261 48.1036 16.6477 44.7279 13.2721C41.3523 9.89642 36.7739 8 32 8C27.2261 8 22.6477 9.89642 19.2721 13.2721C15.8964 16.6477 14 21.2261 14 26C13.9951 29.8966 15.2689 33.6872 17.626 36.79Z"
                        fill="black"
                      />
                    </svg>
                    <p> {location} </p>
                  </div>
                </div>
              </Link>
            );
          })}
    </div>
  );
};

export default SedesPadel;
