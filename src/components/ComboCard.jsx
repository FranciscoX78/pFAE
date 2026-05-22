import React from 'react'

export default function ComboCard({ combo }) {
  return (
    <div className="card">
      <h3 className="card-title">{combo.nombre}</h3>
      <ul className="card-items">
        {combo.items && combo.items.map((it, idx) => (
          <li key={idx}>{it}</li>
        ))}
      </ul>
    </div>
  )
}
