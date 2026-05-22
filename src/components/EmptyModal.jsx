import React from 'react'

export default function EmptyModal({ message = 'Información vacía', onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal centered">
        <div className="modal-content">
          <p>{message}</p>
        </div>
        <div className="modal-actions">
          <button className="btn" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}
