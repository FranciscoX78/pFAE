import React from 'react'

export default function MainScreen({ onScan, onPhase, onClose }) {
  return (
    <main className="main-screen">
      <div className="buttons">
        <button className="btn primary" onClick={onScan}>Leer QR</button>
        <button className="btn" onClick={() => onPhase('induccion')}>Inducción</button>
        <button className="btn" onClick={() => onPhase('mantenimiento')}>Mantenimiento</button>
        <button className="btn" onClick={() => onPhase('despertar')}>Despertar</button>
        <button className="btn danger" onClick={onClose}>Cerrar</button>
      </div>
    </main>
  )
}
