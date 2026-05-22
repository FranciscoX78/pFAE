import React, { useState } from 'react'
import Header from './components/Header'
import MainScreen from './components/MainScreen'
import QRScanner from './components/QRScanner'
import ComboModal from './components/ComboModal'
import EmptyModal from './components/EmptyModal'

export default function App() {
  // estado inicial: no hay datos cargados
  const [data, setData] = useState(null)
  const [scannerOpen, setScannerOpen] = useState(false)
  const [activeModal, setActiveModal] = useState(null) // 'induccion'|'mantenimiento'|'despertar'|null
  const [errorMsg, setErrorMsg] = useState(null)

  const handleScanSuccess = (parsed) => {
    // Cerrar cámara (QRScanner lo hará después de invocar esta función)
    // Validación mínima del JSON
    const valid = validateJSON(parsed)
    if (!valid.ok) {
      setErrorMsg(valid.message || 'QR inválido o formato no compatible')
      setScannerOpen(false)
      return
    }
    setData(parsed)
    setScannerOpen(false)
    setErrorMsg(null)
  }

  const handleOpenScanner = () => {
    setScannerOpen(true)
    setErrorMsg(null)
  }

  const handleClose = () => {
    // Reset completo de la aplicación
    setData(null)
    setScannerOpen(false)
    setActiveModal(null)
    setErrorMsg(null)
  }

  const handleOpenPhase = (phase) => {
    // Si no hay datos, mostrar EmptyModal
    if (!data) {
      setActiveModal('empty')
      return
    }
    setActiveModal(phase)
  }

  return (
    <div className="app-root">
      <Header medico={data?.medico} />
      <MainScreen
        onScan={handleOpenScanner}
        onPhase={handleOpenPhase}
        onClose={handleClose}
      />

      {scannerOpen && (
        <QRScanner
          onClose={() => setScannerOpen(false)}
          onScan={(parsed) => handleScanSuccess(parsed)}
          onError={(msg) => setErrorMsg(msg)}
        />
      )}

      {errorMsg && (
        <EmptyModal message={errorMsg} onClose={() => setErrorMsg(null)} />
      )}

      {activeModal === 'empty' && (
        <EmptyModal message={'Información vacía'} onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'induccion' && (
        <ComboModal
          title="Inducción"
          combos={data?.induccion || []}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'mantenimiento' && (
        <ComboModal
          title="Mantenimiento"
          combos={data?.mantenimiento || []}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'despertar' && (
        <ComboModal
          title="Despertar"
          combos={data?.despertar || []}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  )
}

function validateJSON(obj) {
  // Validación mínima según especificación
  if (!obj || typeof obj !== 'object') return { ok: false, message: 'QR inválido o formato no compatible' }

  const hasKeys = ['medico', 'induccion', 'mantenimiento', 'despertar'].every((k) => k in obj)
  if (!hasKeys) return { ok: false, message: 'Faltan claves requeridas' }

  const medico = obj.medico
  if (medico && (typeof medico !== 'object' || (!medico.nombre && !medico.apellido))) {
    // medico opcional válido; si no trae nombre/apellido se mantendrá Anónimo
  }

  const arrs = ['induccion', 'mantenimiento', 'despertar']
  for (const a of arrs) {
    if (!Array.isArray(obj[a])) return { ok: false, message: `${a} debe ser un array` }
    for (const combo of obj[a]) {
      if (typeof combo !== 'object') return { ok: false, message: 'Combo inválido' }
      if (!('nombre' in combo) || !('items' in combo)) return { ok: false, message: 'Combo incompleto' }
      if (!Array.isArray(combo.items)) return { ok: false, message: 'items debe ser un array de strings' }
    }
  }

  return { ok: true }
}
