"use client";

import { io } from 'socket.io-client';
import { useState, useEffect, FormEvent } from 'react';

import './chat.css'
import { Message } from '@/interface/Ichat';
const apiKey = process.env.NEXT_PUBLIC_API_URL;
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
    // isConnected no se actualiza inmediatamente dentro del mismo ciclo de renderizado de useEffect
    // Esto significa que cuando imprimes isConnected en console.log, podría no mostrar el valor actualizado de isConnected
  }, [usuario]);
  
  useEffect(() => {
    // Mostrar información de depuración
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
      // formato { usuario: 'Marcos Gómez', messages: 'sssss' }
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
    
    <div className='bg-white h-[40vw] max-h-[120vw] flex flex-row gap-10 justify-center items-center space-y-4 '>
      <div className='flex flex-col'>

      <h1 className={`text-2xl font-bold ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
        {isConnected ? 'CONECTADO' : 'DESCONECTADO'}
      </h1>
      <h2 className="text-xl mb-4 text-black">Usuario logueado: <span className='font-semibold text-blue-500'>{usuario?.userDb.name}</span></h2>
      </div>

      {<div className="bg-white border-2 border-gray-400 rounded-lg w-[25vw]">
        <div className="p-14 text-black h-[30vw] max-h-[60vw]">
          <ul className='space-y-4'>
            {message.map((mensaje, index) => (
              <li key={index}  className=' p-4 rounded-2xl bg-gray-300 rounded-bl-none mb-2'> <span className='text-blue-500 font-semibold'>{mensaje.usuario}</span> : {mensaje.message} </li>
            ))}
          </ul>
        </div>
        <div className='border border-t-gray-400'>
        <form onSubmit={enviarMensaje} className='flex'>
          <input
          className="flex-grow border-2 border-gray-300 rounded-lg p-2 mr-2 text-black"
            type="text"
            value={nuevoMessage}
            onChange={(e) => setNuevoMessage(e.target.value)}
          />
          <button type="submit"  className="bg-blue-500 text-white rounded-lg p-2">ENVIAR</button>
        </form>
        </div>

      </div>}
    </div>
  );
};

export default Chat;