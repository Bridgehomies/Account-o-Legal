"use client"

import { X } from "lucide-react"
import ContactLawyerForm from "./contact-lawyer-form"

interface ContactLawyerModalProps {
  isOpen: boolean
  onClose: () => void
  lawyer: {
    name: string
    specialization?: string
    image?: string
  }
}

export default function ContactLawyerModal({ isOpen, onClose, lawyer }: ContactLawyerModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-2 text-center">Contact {lawyer.name}</h2>
        {lawyer.specialization && <p className="text-center text-gray-600 mb-6">{lawyer.specialization}</p>}

        <ContactLawyerForm lawyerName={lawyer.name} lawyerSpecialization={lawyer.specialization} onClose={onClose} />
      </div>
    </div>
  )
}
