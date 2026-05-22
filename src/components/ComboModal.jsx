import React from 'react'
import ComboCard from './ComboCard'

export default function ComboModal({ title, combos, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal centered">
        <h2>{title}</h2>
        <div className="modal-content">
          {combos && combos.length > 0 ? (
            combos.map((c, i) => <ComboCard key={i} combo={c} />)
          ) : (
            <div className="empty">Información vacía</div>
          )}
        </div>
        <div className="modal-actions">
          <button className="btn" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}
