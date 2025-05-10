"use client"

import type React from "react"

import { useState } from "react"
import { X, Calendar, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  lawyer: {
    name: string
    specialization?: string
    image?: string
  }
}

export default function AppointmentModal({ isOpen, onClose, lawyer }: AppointmentModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    appointmentType: "in-person",
    caseDetails: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Available dates (next 7 days)
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i + 1) // Start from tomorrow
    return date.toISOString().split("T")[0]
  })

  // Available time slots
  const availableTimeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ]

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } },
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      handleSubmit()
    }
  }

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1)
    }
  }

  const handleSubmit = () => {
    // TODO: Implement appointment scheduling logic
    console.log("Appointment scheduled", formData)
    setIsSubmitted(true)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6">
            <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Appointment Scheduled!</h2>
            <p className="text-gray-600 mb-6">
              Your appointment with {lawyer.name} has been scheduled for {formatDate(formData.date)} at {formData.time}.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              You will receive a confirmation email shortly with all the details.
            </p>
            <Button onClick={onClose} className="bg-primary hover:bg-beige-600 text-white">
              Close
            </Button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2 text-center">Schedule an Appointment</h2>
            <p className="text-center text-gray-600 mb-6">
              with {lawyer.name}
              {lawyer.specialization && <span> ({lawyer.specialization})</span>}
            </p>

            <div className="mb-6">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm",
                    step >= 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-500",
                  )}
                >
                  1
                </div>
                <div className={cn("w-16 h-1", step >= 2 ? "bg-primary" : "bg-gray-200")}></div>
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm",
                    step >= 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-500",
                  )}
                >
                  2
                </div>
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </Label>
                    <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>

                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+92 3XX XXXXXXX"
                    />
                  </div>

                  <div>
                    <Label htmlFor="caseDetails" className="block text-sm font-medium text-gray-700 mb-1">
                      Brief Description of Your Case
                    </Label>
                    <Textarea
                      id="caseDetails"
                      name="caseDetails"
                      value={formData.caseDetails}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Please provide a brief description of your legal matter"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type</Label>
                    <RadioGroup
                      value={formData.appointmentType}
                      onValueChange={(value) => handleSelectChange("appointmentType", value)}
                      className="flex flex-col space-y-2 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="in-person" id="in-person" />
                        <Label htmlFor="in-person">In-Person Meeting</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="video" id="video" />
                        <Label htmlFor="video">Video Consultation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id="phone" />
                        <Label htmlFor="phone">Phone Call</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Select Date
                    </Label>
                    <Select value={formData.date} onValueChange={(value) => handleSelectChange("date", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a date" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableDates.map((date) => (
                          <SelectItem key={date} value={date}>
                            {formatDate(date)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                      Select Time
                    </Label>
                    <Select value={formData.time} onValueChange={(value) => handleSelectChange("time", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTimeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-md flex items-start mt-4">
                    <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-700">
                      Appointment duration is 45 minutes. Please arrive 10 minutes early if you've selected an in-person
                      meeting.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              {step === 1 ? (
                <Button variant="outline" onClick={onClose} className="border-gray-300">
                  Cancel
                </Button>
              ) : (
                <Button variant="outline" onClick={handlePrevStep} className="border-gray-300">
                  Back
                </Button>
              )}
              <Button
                onClick={handleNextStep}
                className="bg-primary hover:bg-beige-600 text-white"
                disabled={
                  (step === 1 && (!formData.name || !formData.email || !formData.phone)) ||
                  (step === 2 && (!formData.date || !formData.time))
                }
              >
                {step === 1 ? "Next" : "Schedule Appointment"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
