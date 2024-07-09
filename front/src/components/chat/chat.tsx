"use client";
const apiKey = process.env.NEXT_PUBLIC_API_URL;

import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';
import { Message } from '@/interface/Ichat';


//chat
const socket = io(`${apiKey}`);


const Chat = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMessage, setNuevoMessage] = useState('');
  const [message, setMessages] = useState<Message[]>([]);
  const [usuario, setUsuario] = useState<{ userDb: { name: string } } | null>(null);

  useEffect(() => {
    const userFromLocalStorage = window.localStorage.getItem('userSession');
    if (userFromLocalStorage) {
      const user = JSON.parse(userFromLocalStorage);
      setUsuario(user);
    }
  }, []);

  useEffect(() => {
    if (usuario) { setIsConnected(true) }
    console.log('Usuario actual 2:', isConnected);
  }, [usuario]);
  
  useEffect(() => {
    console.log('ESTADO ACTUAL:', isConnected);
  }, [isConnected]);
  
  useEffect(() => {
    const handleConnect = () => {
      if (usuario) {
        setIsConnected(true);
      }
      console.log('usuario conectado desde connect');
    }

    const handleDisconnect = () => {
      console.log('Usuario desconectado del socket');
      setIsConnected(false);
    };

    const handleMessage = (data: any) => {
      const newMessage: Message = {
        usuario: data.usuario,
        message: data.messages,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('chat-mensaje', handleMessage);

    return () => {
      console.log('Desmontando componente Chat');
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('chat-mensaje', handleMessage);
    };
  }, [usuario]);

  const enviarMensaje = (e: any) => {
    e.preventDefault();

    if (!usuario) {
      alert('Usuario no encontrado');
      return;
    }
    socket.emit('chat-mensaje', {
      usuario: usuario.userDb.name,
      messages: nuevoMessage,
    });
    setNuevoMessage('');
  };

  return (
    <div className="p-4 text-black">
      <h1 className={`text-2xl font-bold ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
        {isConnected ? 'CONECTADO' : 'DESCONECTADO'}
      </h1>
      <h2 className="text-xl mb-4">Usuario logueado: {usuario?.userDb.name}</h2>

      <div className="flex flex-col h-96 border-2 border-gray-300 rounded-lg p-4">
        <div className="flex-grow overflow-y-auto mb-4">
          <ul>
            {message.map((mensaje, index) => (
              <li key={index} className="mb-2">
                <span className="font-bold">{mensaje.usuario}:</span> {mensaje.message}
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={enviarMensaje} className="flex">
          <input
            type="text"
            value={nuevoMessage}
            onChange={(e) => setNuevoMessage(e.target.value)}
            className="flex-grow border-2 border-gray-300 rounded-lg p-2 mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white rounded-lg p-2">
            ENVIAR
          </button>
        </form>
      </div>
    </div>
  );
};


export default Chat;
