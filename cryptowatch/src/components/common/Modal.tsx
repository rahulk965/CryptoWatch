import React from 'react'
import Button from './Button'

type ModalProps = {
  open: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ open, title, onClose, children }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-4 shadow-lg dark:bg-gray-900">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Button variant="ghost" aria-label="Close" onClick={onClose}>✕</Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
export default Modal
