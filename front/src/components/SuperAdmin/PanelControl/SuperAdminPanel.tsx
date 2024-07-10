"use client"
import React, { useState } from 'react';
import CardAprobacion from '../Aprobacion/CardAprobacion';
import BanearUser from '../BanearUser/BanearUser';

import Dashboard from '../CardPersonal/CardPersonal';

const SuperAdminPanel = () => {
  const [activeView, setActiveView] = useState('home');

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <Dashboard/>;
      case 'approve':
        return <CardAprobacion />;
        case 'ban':
        return <BanearUser/>;
        case 'estadistica':
            return <BanearUser/>;
    
      default:
        return <Dashboard/>;
    }
  };

  return (
    <div className="flex h-screen">
    
      <nav className="w-1/4 bg-gray-800 text-white flex flex-col">
        <h1 className="text-2xl font-bold p-4">Super Admin Panel</h1>
        <button
          className={`p-4 text-left ${activeView === 'home' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          onClick={() => setActiveView('home')}
        >
          Informacion Personal
        </button>
        <button
          className={`p-4 text-left ${activeView === 'approve' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          onClick={() => setActiveView('approve')}
        >
         Aprobar administrador
        </button>
        <button
          className={`p-4 text-left ${activeView === 'ban' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          onClick={() => setActiveView('ban')}
        >
          Banear usuario
        </button>
        <button
          className={`p-4 text-left ${activeView === 'estadistica' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          onClick={() => setActiveView('estadistica')}
        >
          Estadicistas de la web
        </button>
      </nav>

    
      <main className="flex-1 p-8">
        {renderView()}
      </main>
    </div>
  );
};

export default SuperAdminPanel;