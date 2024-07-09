"use client";

import { io } from 'socket.io-client';
import { useState, useEffect, FormEvent } from 'react';

import './chat.css'
import { Message } from '@/interface/Ichat';
//chat
const socket = io('http://localhost:3000');

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
    <div >
      <h1>{isConnected ? 'CONECTADO' : 'DESCONECTADO'}</h1>
      <h2>Usuario logueado: {usuario?.userDb.name}</h2>

      {<div className="chat-screen">
        <div className="chat-messages">
          <ul>
            {message.map((mensaje, index) => (
              <li key={index}> {mensaje.usuario} : {mensaje.message} </li>
            ))}
          </ul>
        </div>
        <form onSubmit={enviarMensaje}>
          <input
            type="text"
            value={nuevoMessage}
            onChange={(e) => setNuevoMessage(e.target.value)}
          />
          <button type="submit">ENVIAR</button>
        </form>

      </div>}
    </div>
  );
};

export default Chat;