"use client";
const apiKey = process.env.NEXT_PUBLIC_API_URL;

import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { Message } from "@/interface/Ichat";
import { database } from "@/app/Firebase/firebase.config";
import { onValue, ref, set } from "firebase/database";


//chat
const socket = io(`${apiKey}`);

const Chat = ({ deporte } :{ deporte: string }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMessage, setNuevoMessage] = useState("");
  const [message, setMessages] = useState<Message[]>([]);
  const [usuario, setUsuario] = useState<{ userDb: { name: string } } | null>(
    null
  );

  useEffect(() => {
    const userFromLocalStorage = window.localStorage.getItem("userSession");
    if (userFromLocalStorage) {
      const user = JSON.parse(userFromLocalStorage);
      setUsuario(user);
    }

    const messagesRef = ref(database, `messages/${deporte}`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(data);
      }
    });

  }, [deporte]);



  useEffect(() => {
    if (usuario) {
      setIsConnected(true);
    }
    console.log("Usuario actual 2:", isConnected);
  }, [usuario]);

  useEffect(() => {
    console.log("ESTADO ACTUAL:", isConnected);
  }, [isConnected]);

  useEffect(() => {
    const handleConnect = () => {
      if (usuario) {
        setIsConnected(true);
        socket.emit('joinRoom', deporte);
      }
      console.log("usuario conectado desde connect");
    };

    const handleDisconnect = () => {
      console.log("Usuario desconectado del socket");
      setIsConnected(false);
      socket.emit('leaveRoom', deporte);
    };

    const handleMessage = (data: any) => {
      const newMessage: Message = {
        usuario: data.usuario,
        message: data.messages,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      set(ref(database, `messages/${deporte}`), [...message, newMessage]);
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
  }, [usuario,message,deporte]);

  const enviarMensaje = (e: any) => {
    e.preventDefault();

    if (!usuario) {
      alert("Usuario no encontrado");
      return;
    }
    socket.emit('joinRoom', deporte)
    socket.emit("chat-mensaje", {
      room: deporte,
      usuario: usuario.userDb.name,
      messages: nuevoMessage,
    });
    setNuevoMessage("");
  };

  return (
<div className="flex h-screen bg-gray-900 text-white">
  {/* Sidebar izquierdo */}
  <div className="w-1/4 border-r border-gray-700 overflow-y-auto">
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Chats</h2>
      <ul>
        <li className="mb-2">
          <a href="#" className="block p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition duration-150">
            <span className="font-medium">Chat global</span>
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="block p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition duration-150">
            <span className="font-medium">Chat de alcance</span>
          </a>
        </li>
      </ul>
    </div>
  </div>

  {/* Área principal del chat */}
  <div className="flex-1 flex flex-col">
    {/* Encabezado del chat */}
    <div className="p-4 border-b border-gray-700 flex items-center">
      <h2 className="text-xl font-semibold">
        Usuario logueado: {usuario?.userDb.name}
      </h2>
      <span
        className={`ml-4 px-2 py-1 rounded-full text-sm ${
          isConnected ? "bg-green-500" : "bg-red-500"
        }`}>
        {isConnected ? "CONECTADO" : "DESCONECTADO"}
      </span>
    </div>

    {/* Mensajes */}
    <div className="flex-1 overflow-y-auto p-4">
      <ul>
        {message.map((mensaje, index) => (
          <li
            key={index}
            className={`mb-4 ${
              mensaje.usuario === usuario?.userDb.name
                ? "text-right"
                : "text-left"
            }`}>
            <div
              className={`inline-block max-w-xs p-3 rounded-lg ${
                mensaje.usuario === usuario?.userDb.name
                  ? "bg-blue-600"
                  : "bg-gray-700"
              }`}>
              <p className="font-semibold">{mensaje.usuario}</p>
              <p>{mensaje.message}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>

    {/* Formulario de entrada */}
    <form
      onSubmit={enviarMensaje}
      className="p-4 border-t border-gray-700 flex">
      <input
        type="text"
        value={nuevoMessage}
        onChange={(e) => setNuevoMessage(e.target.value)}
        className="flex-grow bg-gray-800 text-white rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Escribe un mensaje..."
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Enviar
      </button>
    </form>
  </div>

  {/* Sidebar derecho */}
  <div className="w-1/4 border-l border-gray-700 p-4 overflow-y-auto">
    <h2 className="text-xl font-semibold mb-4">Detalles del chat</h2>
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Participantes</h3>
        <ul className="space-y-2">
          <li className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span>{usuario?.userDb.name} (Tú)</span>
          </li>
          {/* Aquí puedes mapear otros participantes si los tienes */}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Estadísticas</h3>
        <p>Mensajes totales: {message.length}</p>
        <p>Chat activo desde: {new Date().toLocaleDateString()}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Opciones</h3>
        <button className="bg-gray-700 hover:bg-gray-600 text-white rounded px-4 py-2 w-full mb-2">
          Buscar en el chat
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 text-white rounded px-4 py-2 w-full">
          Configuración
        </button>
      </div>
    </div>
  </div>
</div>
  );
};

export default Chat;
