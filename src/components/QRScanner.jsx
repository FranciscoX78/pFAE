import React, { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'

// QRScanner component: usa Html5Qrcode para capturar desde la cámara
export default function QRScanner({ onClose, onScan, onError }) {
  const containerRef = useRef(null)
  const scannerRef = useRef(null)
  const isRunningRef = useRef(false)
  const isStoppingRef = useRef(false)
  const mountedRef = useRef(false)
  const onScanRef = useRef(onScan)
  const onErrorRef = useRef(onError)
  const [cameraError, setCameraError] = useState(null)

  useEffect(() => {
    onScanRef.current = onScan
    onErrorRef.current = onError
  }, [onScan, onError])

  const stopScannerSafely = async () => {
    const scanner = scannerRef.current
    if (!scanner || !isRunningRef.current || isStoppingRef.current) {
      return
    }

    isStoppingRef.current = true
    try {
      await scanner.stop()
      await scanner.clear()
    } catch (stopError) {
      // No debe romper la app si el scanner ya está detenido o hubo un error al detenerlo.
    } finally {
      isRunningRef.current = false
      isStoppingRef.current = false
      scannerRef.current = null
    }
  }

  useEffect(() => {
    mountedRef.current = true

    if (!containerRef.current || scannerRef.current) {
      return () => {
        mountedRef.current = false
      }
    }

    const elementId = 'qr-reader'
    const qr = new Html5Qrcode(elementId)
    scannerRef.current = qr

    const config = { fps: 10, qrbox: 250 }

    qr.start(
      { facingMode: 'environment' },
      config,
      async (decodedText) => {
        if (!mountedRef.current) {
          return
        }

        try {
          const parsed = JSON.parse(decodedText)
          onScanRef.current?.(parsed)
        } catch (parseError) {
          onErrorRef.current?.('QR inválido o formato no compatible')
        } finally {
          await stopScannerSafely()
        }
      },
      () => {
        // Ignorar mensajes de error de lectura mientras se escanea.
      }
    ).then(() => {
      isRunningRef.current = true
    }).catch(() => {
      const message = 'No se pudo abrir la cámara'
      if (mountedRef.current) {
        setCameraError(message)
        onErrorRef.current?.(message)
      }
    })

    return () => {
      mountedRef.current = false
      stopScannerSafely()
    }
  }, [])

  const handleClose = () => {
    stopScannerSafely()
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal centered">
        <div style={{ width: '100%' }}>
          <div id="qr-reader" ref={containerRef} />
          {cameraError && (
            <p style={{ marginTop: '1rem', color: '#b00020' }}>
              {cameraError}. Revise los permisos de la cámara o intente de nuevo.
            </p>
          )}
        </div>
        <div className="modal-actions">
          <button className="btn" onClick={handleClose}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}
