/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
//*Importación de Controlador para este formulario
import { CLogin } from "@/helpers/Controllers/CLogin";
//*Importación de función para hacer peticiones para este form
import { fetchLogin } from "@/service/ApiLogin";
//!Importación para el login por Google
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
//*Importacion para registrar uusuario que se logea de google
import { PostRegistroGoogle } from "@/service/ApiRegistroGoogle";
import { useUser } from "@/context/UserContext";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/helpers/alert.helper/alert.helper";
import { IUserDb, IUserSession } from "@/interface/context";
import { useSport } from "@/context/SportContext";
import { FetchUserByEmail } from "@/service/Superadmin/ApiGetUserByEmail";

import { provider, auth } from "../../../firebase.config";

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
        rol: "",
      };

      const userGoogle = await PostRegistroGoogle(userDb);
      const user = await FetchUserByEmail(userDb.email);
      const userSession: IUserSession = {
        token: userGoogle.token,
        userDb: user,
      };
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
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex bg-white h-full shadow-lg overflow-hidden w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
          style={{
            backgroundImage: `url(loginImage.png)`,
          }}
        ></div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center mb-20">
          <div className="w-full p-8 lg:w-1/2 justify-center align-middle flex flex-col mb-10">
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <h1 className="text-2xl font-bold text-center text-gray-700">Iniciar sesión</h1>
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Correo electronico
                </label>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Contraseña
                  </label>
                </div>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                />
                <a
                  href="#"
                  className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
                >
                  Olvidaste tu contraseña?
                </a>
              </div>
              <div className="mt-8">
                <button className="bg-blue-700 text-white font-bold py-3 px-4 w-full rounded hover:bg-blue-600">
                  Iniciar sesión
                </button>
              </div>

            </form>
            <button
              onClick={callLoginGoogle}
              className=" flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
            >
              <div className="flex px-5 justify-center w-full py-3">
                <div className="min-w-[30px]">
                  <svg className="h-6 w-6" viewBox="0 0 40 40">
                    <path
                      d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                      fill="#1976D2"
                    />
                  </svg>
                </div>
                <div className="flex w-full justify-center">
                  <h1 className="whitespace-nowrap text-gray-600 font-bold">
                    Iniciar sesion con Google
                  </h1>
                </div>
              </div>
            </button>
            <div className="mt-4 flex items-center w-full text-center">
              <Link
                href="/Register"
                className="text-xs text-gray-500 capitalize text-center w-full"
              >
                No tienes cuenta?
                <span className="text-blue-700"> Registrate aqui.</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FormLogin;
