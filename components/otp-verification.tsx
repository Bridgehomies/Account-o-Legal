"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"

interface OtpVerificationProps {
  phoneNumber: string
  onVerify: (otp: string) => void
  onResend: () => void
  onBack: () => void
}

export default function OtpVerification({ phoneNumber, onVerify, onResend, onBack }: OtpVerificationProps) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const [timer, setTimer] = useState(60)
  const [isResendDisabled, setIsResendDisabled] = useState(true)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown)
          setIsResendDisabled(false)
          return 0
        }
        return prevTimer - 1
      })
    }, 1000)

    return () => clearInterval(countdown)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value

    // Only allow one digit
    if (value.length > 1) return

    // Update the OTP array
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input if a digit was entered
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        // If current input is empty and backspace is pressed, focus previous input
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("")
      setOtp(digits)

      // Focus the last input
      inputRefs.current[5]?.focus()
    }
  }

  const handleVerify = () => {
    const otpString = otp.join("")
    if (otpString.length === 6) {
      onVerify(otpString)
    }
  }

  const handleResend = () => {
    setOtp(Array(6).fill(""))
    setTimer(60)
    setIsResendDisabled(true)
    onResend()
  }

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-2">Verify Your Phone</h2>
      <p className="text-gray-600 mb-6">
        We've sent a 6-digit verification code to <span className="font-medium">{phoneNumber}</span>
      </p>

      <div className="flex justify-center gap-2 mb-6">
        {otp.map((digit, index) => (
          <Input
            key={index}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            className="w-12 h-12 text-center text-xl"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={index === 0 ? handlePaste : undefined}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </div>

      <Button
        onClick={handleVerify}
        className="w-full bg-primary hover:bg-beige-600 text-white mb-4"
        disabled={otp.join("").length !== 6}
      >
        Verify
      </Button>

      <div className="text-sm text-gray-600 mb-4">
        {isResendDisabled ? (
          <p>
            Resend code in <span className="font-medium">{timer}s</span>
          </p>
        ) : (
          <button onClick={handleResend} className="text-primary hover:underline">
            Resend verification code
          </button>
        )}
      </div>

      <Button variant="ghost" className="flex items-center text-gray-600 hover:text-gray-900" onClick={onBack}>
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to registration
      </Button>
    </div>
  )
}
