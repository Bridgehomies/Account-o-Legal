"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera, CheckCircle2 } from "lucide-react"
import OtpVerification from "@/components/otp-verification"

export default function RegisterClient() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    city: "",
    profilePicture: null as File | null,
  })

  const [profilePreview, setProfilePreview] = useState<string | null>(null)
  const [registrationStep, setRegistrationStep] = useState(1)
  const [phoneVerified, setPhoneVerified] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } },
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, profilePicture: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement registration logic
    console.log("Registration submitted", { ...formData, profilePicture: formData.profilePicture?.name })
    // Redirect to dashboard after successful registration
    window.location.href = "/client-dashboard"
  }

  const handleSendOtp = () => {
    // In a real app, this would send an API request to send an OTP via SMS
    console.log("Sending OTP to", formData.phoneNumber)
    setRegistrationStep(2)
  }

  const handleVerifyOtp = (otp: string) => {
    // In a real app, this would verify the OTP with the server
    console.log("Verifying OTP:", otp)
    setPhoneVerified(true)
    setRegistrationStep(3)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Register as a Client</h1>

      {/* Step indicator */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className={`flex flex-col items-center ${registrationStep >= 1 ? "text-primary" : "text-gray-400"}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${registrationStep >= 1 ? "bg-primary text-white" : "bg-gray-200"}`}
            >
              1
            </div>
            <span className="text-sm mt-1">Basic Info</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${registrationStep >= 2 ? "bg-primary" : "bg-gray-200"}`}></div>
          <div className={`flex flex-col items-center ${registrationStep >= 2 ? "text-primary" : "text-gray-400"}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${registrationStep >= 2 ? "bg-primary text-white" : "bg-gray-200"}`}
            >
              2
            </div>
            <span className="text-sm mt-1">Verify Phone</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${registrationStep >= 3 ? "bg-primary" : "bg-gray-200"}`}></div>
          <div className={`flex flex-col items-center ${registrationStep >= 3 ? "text-primary" : "text-gray-400"}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${registrationStep >= 3 ? "bg-primary text-white" : "bg-gray-200"}`}
            >
              3
            </div>
            <span className="text-sm mt-1">Complete Profile</span>
          </div>
        </div>
      </div>

      {/* Step 1: Basic Information */}
      {registrationStep === 1 && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6">Basic Information</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  placeholder="+92 3XX XXXXXXX"
                />
                <p className="text-xs text-gray-500 mt-1">We'll send a verification code to this number</p>
              </div>
              <div className="pt-4">
                <Button
                  onClick={handleSendOtp}
                  className="w-full bg-primary hover:bg-beige-600 text-white"
                  disabled={
                    !formData.firstName ||
                    !formData.lastName ||
                    !formData.email ||
                    !formData.password ||
                    !formData.confirmPassword ||
                    !formData.phoneNumber ||
                    formData.password !== formData.confirmPassword
                  }
                >
                  Continue & Verify Phone
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Phone Verification */}
      {registrationStep === 2 && (
        <div className="max-w-md mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <OtpVerification
              phoneNumber={formData.phoneNumber}
              onVerify={handleVerifyOtp}
              onResend={() => console.log("Resending OTP to", formData.phoneNumber)}
              onBack={() => setRegistrationStep(1)}
            />
          </div>
        </div>
      )}

      {/* Step 3: Complete Profile */}
      {registrationStep === 3 && (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-1 rounded-full mr-3">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-green-600 font-medium">Phone number verified successfully!</p>
            </div>

            <h2 className="text-xl font-bold mb-6">Complete Your Profile</h2>

            <div className="space-y-6">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <Input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Picture (Optional)
                </Label>
                <div className="mt-1 flex items-center">
                  {profilePreview ? (
                    <img
                      src={profilePreview || "/placeholder.svg"}
                      alt="Profile preview"
                      className="w-32 h-32 object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                      <Camera className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    className="ml-5"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change
                  </Button>
                </div>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileInputRef}
                />
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full bg-primary hover:bg-beige-600 text-white">
                  Complete Registration
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
