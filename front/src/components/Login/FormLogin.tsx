/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dotenv from "dotenv";
//*Importación de Controlador para este formulario
import { CLogin } from "@/helpers/Controllers/CLogin";
//*Importación de función para hacer peticiones para este form
import { fetchLogin } from "@/service/ApiLogin";
//!Importación para el login por Google
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
//*Importacion para registrar uusuario que se logea de google
import { PostRegistroGoogle } from "@/service/ApiRegistroGoogle";
import { useUser } from "@/context/UserContext";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/helpers/alert.helper/alert.helper";
import { IUser, IUserDb, IUserSession } from "@/interface/context";
import { useSport } from "@/context/SportContext";

//*Variables de entorno firebase

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const FormLogin = () => {
  const { sport } = useSport();
  const { logIn } = useUser();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const router = useRouter();
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  //!Función para iniciar sesión con Google
  const callLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken || null;
      const userDb: IUserDb = {
        displayName: result.user.displayName || "",
        email: result.user.email || "",
        uid: result.user.uid,
        name: result.user.displayName || "",
        phone: result.user.phoneNumber || "",
      };

      PostRegistroGoogle(userDb);

      const userSession: IUserSession = { token, userDb };
      logIn(userSession);

      showSuccessAlert(
        "Login exitoso",
        "Sesión iniciada correctamente con Google"
      );

      router.push("/");
    } catch (error: any) {
      showErrorAlert("Error de inicio de sesión");
    }
  };

  //*Función que guarda los cambios
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  //*Función que envía el formulario
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (CLogin(data)) {
      try {
        const response = await fetchLogin(data);
        if (response.success) {
          const user = response.data;
          logIn(user);

          showSuccessAlert("Login exitoso.", "Sesión iniciada correctamente.");
          router.push("/");
        } else {
          showErrorAlert("Email o contraseña incorrecto.");
        }
      } catch (error: any) {
        showErrorAlert("Error del servidor", "Intenta más tarde");
      }
    } else {
      showErrorAlert(
        "Campos incompletos o datos inválidos",
        "Por favor, revisa los datos e intenta nuevamente."
      );
    }
  };

  return (
    <div className="bg-gray-700 max-w-md w-full p-8 rounded-lg shadow-lg space-y-3">
      <h1 className="text-terciario-white text-center text-3xl font-bold mb-6">
        RESERVA GOL
      </h1>

      <p
        className={`${
          sport == 2
            ? "text-blue-400"
            : sport == 3
            ? "text-orange-500"
            : "text-main"
        } text-center font-semibold text-lg mb-4`}
      >
        Inicia sesión en tu cuenta
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-terciario-white mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={data.email}
            placeholder="Escribí tu email"
            onChange={handleChange}
            className={`w-full p-3 rounded-lg bg-white text-black placeholder-black outline-0 focus:ring-4 ${
              sport == 2
                ? "ring-blue-400"
                : sport == 3
                ? "ring-orange-500"
                : "focus:ring-main"
            }`}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-terciario-white mb-2">
            Contraseña
          </label>
          <div className="flex flex-row space-x-4 items-center">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={data.password}
              placeholder="Escribe tu contraseña"
              onChange={handleChange}
              className={`w-full p-3 rounded-lg bg-white text-black placeholder-black outline-0 focus:ring-4 ${
                sport == 2
                  ? "ring-blue-400"
                  : sport == 3
                  ? "ring-orange-500"
                  : "focus:ring-main"
              }`}
            />
            <button
              className={`p-[1px] h-2/3 border-2 ${
                sport == 2
                  ? "border-blue-400"
                  : sport == 3
                  ? "border-orange-500"
                  : "border-main"
              }  rounded-full`}
              type="button"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <svg
                  className={`h-[30px] w-[30px] fill-none ${
                    sport == 2
                      ? "stroke-blue-400"
                      : sport == 3
                      ? "stroke-orange-500"
                      : "stroke-main"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                </svg>
              ) : (
                <svg
                  className={`h-[30px] w-[30px] fill-none ${
                    sport == 2
                      ? "stroke-blue-400"
                      : sport == 3
                      ? "stroke-orange-500"
                      : "stroke-main"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                  <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                  <path d="M3 3l18 18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full border grid grid-cols-3 items-center ${
            sport == 2
              ? "border-blue-400 hover:text-blue-400"
              : sport == 3
              ? "border-orange-500 hover:text-orange-500"
              : "border-main hover:text-main"
          } text-terciario-white hover:bg-terciario-white  p-3 rounded-lg duration-300 ease-in-out`}
        >
          <div className="col-span-1 flex justify-end items-center">
            <img
              src="/icon.png"
              alt="Page icon"
              className="w-5 h-5 col-span-1"
            />
          </div>
          Iniciar sesión
        </button>
      </form>

      <button
        onClick={callLoginGoogle}
        className={`w-full border flex flex-row justify-center items-center ${
          sport == 2
            ? "border-blue-400 hover:text-blue-400"
            : sport == 3
            ? "border-orange-500 hover:text-orange-500"
            : "border-main hover:text-main"
        } text-terciario-white hover:bg-terciario-white  p-3 rounded-lg duration-300 ease-in-out`}
      >
        <svg
          className={`h-5 w-5  ${
            sport == 2
              ? "stroke-blue-400"
              : sport == 3
              ? "stroke-orange-500"
              : "stroke-main"
          } mr-3`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945z" />
        </svg>
        Iniciar sesión con Google
      </button>

      <p className="text-terciario-white text-center mt-4">
        Si no tienes una cuenta
        <br />
        <Link
          className={`${
            sport == 2
              ? "text-blue-400"
              : sport == 3
              ? "text-orange-500"
              : "text-main"
          } text-center font-semibold text-md mb-4`}
          href="/Register"
        >
          regístrate
        </Link>
      </p>
    </div>
  );
};

export default FormLogin;
