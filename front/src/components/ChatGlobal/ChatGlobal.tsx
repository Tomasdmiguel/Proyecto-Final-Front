"use client";
const apiKey = process.env.NEXT_PUBLIC_API_URL;

import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { Message } from "@/interface/Ichat";
import { database } from "../../../firebase.config";
import { onValue, ref, set } from "firebase/database";
import { useSport } from "@/context/SportContext";

//chat
const socket = io(`${apiKey}`);

const ChatGlobal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { sport, handleSport } = useSport();
  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMessage, setNuevoMessage] = useState("");
  const [message, setMessages] = useState<Message[]>([]);
  const [usuario, setUsuario] = useState<{ userDb: { name: string } } | null>(
    null
  );

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [message]);

  useEffect(() => {
    const userFromLocalStorage = window.localStorage.getItem("userSession");
    if (userFromLocalStorage) {
      const user = JSON.parse(userFromLocalStorage);
      setUsuario(user);
    }

    const messagesRef = ref(database, `messages/${sport}`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(data);
      }
    });
  }, [sport]);

  useEffect(() => {
    if (usuario) {
      setIsConnected(true);
    }
    console.log("Usuario actual 2:", isConnected);
  }, [usuario, isConnected]);

  useEffect(() => {
    console.log("ESTADO ACTUAL:", isConnected);
  }, [isConnected]);

  useEffect(() => {
    const handleConnect = () => {
      if (usuario) {
        setIsConnected(true);
        socket.emit("joinRoom", sport);
      }
      console.log("usuario conectado desde connect");
    };

    const handleDisconnect = () => {
      console.log("Usuario desconectado del socket");
      setIsConnected(false);
      socket.emit("leaveRoom", sport);
    };

    const handleMessage = (data: any) => {
      const newMessage: Message = {
        usuario: data.usuario,
        message: data.messages,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      set(ref(database, `messages/${sport}`), [...message, newMessage]);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("chat-mensaje", handleMessage);

    return () => {
      console.log("Desmontando componente Chat");
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("chat-mensaje", handleMessage);
    };
  }, [usuario, message, sport]);

  const enviarMensaje = (e: any) => {
    e.preventDefault();

    if (!usuario) {
      alert("Usuario no encontrado");
      return;
    }
    socket.emit("joinRoom", sport);
    socket.emit("chat-mensaje", {
      room: sport,
      usuario: usuario.userDb.name,
      messages: nuevoMessage,
    });
    setNuevoMessage("");
  };

  return (
    <div
      className={`flex min-h-[80vh] w-full bg-terciario-white ${
        sport == 2
          ? "text-blue-400"
          : sport == 3
          ? "text-orange-500"
          : "text-main"
      }`}
    >
      {/* Área principal del chat */}
      <div className="flex-1 flex flex-col">
        {/* Encabezado del chat */}
        <div
          className={`p-4 border-b ${
            sport === 2
              ? "border-blue-400"
              : sport === 3
              ? "border-orange-500"
              : "border-main"
          }  flex items-center space-x-2`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`fill-none ${
              sport === 2
                ? "stroke-blue-400"
                : sport === 3
                ? "stroke-orange-500"
                : "stroke-main"
            }`}
            width="40"
            height="40"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
          <h2 className="text-xl font-semibold">{usuario?.userDb.name}</h2>
        </div>

        {/* Mensajes */}
        <div
          ref={containerRef}
          className="flex-1  p-4 text-terciario-white overflow-y-scroll"
        >
          <ul>
            {message.map((mensaje, index) => (
              <li
                key={index}
                className={`mb-4 ${
                  mensaje.usuario === usuario?.userDb.name
                    ? "text-right"
                    : "text-left"
                }`}
              >
                <div
                  className={`inline-block max-w-xs p-3 rounded-lg ${
                    mensaje.usuario === usuario?.userDb.name
                      ? sport === 2
                        ? "bg-blue-400"
                        : sport === 3
                        ? "bg-orange-500"
                        : "bg-main"
                      : sport === 2
                      ? "bg-blue-600"
                      : sport === 3
                      ? "bg-orange-700"
                      : "bg-green-800"
                  }`}
                >
                  <p className="font-semibold">{mensaje.usuario}</p>
                  <p>{mensaje.message}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* envio de mensaje */}
        <form
          onSubmit={enviarMensaje}
          className={`p-4 border-t ${
            sport === 2
              ? "border-blue-400"
              : sport === 3
              ? "border-orange-500"
              : "border-main"
          } flex`}
        >
          <input
            type="text"
            value={nuevoMessage}
            onChange={(e) => setNuevoMessage(e.target.value)}
            className={`flex-grow ${
              sport === 2
                ? "text-blue-400 focus:ring-blue-400 placeholder-blue-900"
                : sport === 3
                ? "text-orange-500 focus:ring-orange-500 placeholder-orange-700"
                : "text-main focus:ring-main placeholder-green-700"
            }  rounded-full border-2 px-4 py-2 mr-2  focus:outline-none focus:ring-2 `}
            placeholder="Escribe un mensaje..."
          />
          <button
            type="submit"
            className={`${
              sport === 2
                ? "hover:text-blue-400 border-blue-400 bg-blue-400 hover:bg-terciario-white"
                : sport === 3
                ? "hover:text-orange-500 border-orange-500 bg-orange-500 hover:bg-terciario-white"
                : "hover:text-main border-main bg-main hover:bg-terciario-white"
            } text-white border-2 rounded-full px-6 py-2 ease-in-out duration-300 `}
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatGlobal;
