"use client";
import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
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
//*Variables de entorno firebase

// Configuración de Firebase
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

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const FormLogin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  //!Función para iniciar sesión con Google
  const callLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const userDb = result.user;
      PostRegistroGoogle(userDb);

      localStorage.setItem("usuarioSesion", JSON.stringify({ token, userDb }));

      Swal.fire({
        icon: "success",
        title: "Login exitoso",
        text: "Sesión iniciada correctamente con Google",
      });

      router.push("/");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error de inicio de sesión",
        text: error.message,
      });
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
          const { token, userDb } = response.data;
          localStorage.setItem(
            "usuarioSesion",
            JSON.stringify({ token, userDb })
          );

          Swal.fire({
            icon: "success",
            title: "Login exitoso",
            text: "Sesión iniciada correctamente",
          });
          router.push("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error de inicio de sesión",
            text: response.message,
          });
        }
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Error del servidor",
          text: "Intenta más tarde",
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Datos inválidos",
        text: "Por favor, revisa los datos e intenta nuevamente",
      });
    }
  };

  return (
    <div className="bg-main max-w-md w-full p-8 rounded-lg shadow-lg text">
      <h1 className="text-terciario-white text-center text-3xl font-bold mb-6">
        RESERVA GOL
      </h1>

      <p className="text-secundario text-center mb-4">
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
            className="w-full p-3 rounded-lg bg-white text-black"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-terciario-white mb-2">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            value={data.password}
            placeholder="Escribe tu contraseña"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full border border-secundario text-terciario-white p-3 rounded-lg hover:bg-yellow-600">
          Iniciar sesión
        </button>
      </form>

      <button
        onClick={callLoginGoogle}
        className="w-full mt-4 border border-secundario text-terciario-white p-3 rounded-lg hover:bg-yellow-600">
        Iniciar sesión con Google
      </button>

      <p className="text-terciario-white text-center mt-4">
        Si no tienes una cuenta
        <br />
        <Link className="text-secundario" href="/Register">
          regístrate
        </Link>
      </p>
    </div>
  );
};

export default FormLogin;
