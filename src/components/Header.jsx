import React from 'react'

export default function Header({ medico }) {
  // Mostrar médico recibido o Anónimo por defecto
  const nombre = medico && (medico.nombre || '')
  const apellido = medico && (medico.apellido || '')
  const display = nombre || apellido ? `${nombre} ${apellido}`.trim() : 'Anónimo'

  return (
    <header className="header">
      <div className="header-inner">
        <div className="medico">Médico: {display}</div>
      </div>
    </header>
  )
}
