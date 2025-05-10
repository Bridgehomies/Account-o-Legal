"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import LoginModal from "@/components/login-modal"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-primary">PakLegal</span>
          <span className="text-2xl font-light text-beige-500">Assist</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-800 hover:text-primary transition-colors">
            Home
          </Link>
          <div className="relative group">
            <button className="flex items-center text-gray-800 hover:text-primary transition-colors">
              Lawyers <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <Link href="/lawyers/tax" className="block px-4 py-2 text-sm text-gray-700 hover:bg-beige-100">
                Tax Law
              </Link>
              <Link href="/lawyers/criminal" className="block px-4 py-2 text-sm text-gray-700 hover:bg-beige-100">
                Criminal Law
              </Link>
              <Link href="/lawyers/family" className="block px-4 py-2 text-sm text-gray-700 hover:bg-beige-100">
                Family Law
              </Link>
              <Link href="/lawyers/corporate" className="block px-4 py-2 text-sm text-gray-700 hover:bg-beige-100">
                Corporate Law
              </Link>
              <Link href="/lawyers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-beige-100">
                View All
              </Link>
            </div>
          </div>
          <Link href="/laws" className="text-gray-800 hover:text-primary transition-colors">
            Laws & Rules
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
            onClick={() => setShowLoginModal(true)}
          >
            Lawyer Login
          </Button>
          <Button className="bg-primary text-white hover:bg-beige-600" onClick={() => router.push("/register-lawyer")}>
            Register as Lawyer
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-800 focus:outline-none" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-gray-800 hover:text-primary py-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <details className="group">
                <summary className="flex justify-between items-center text-gray-800 hover:text-primary py-2 cursor-pointer">
                  Lawyers
                  <ChevronDown className="h-4 w-4" />
                </summary>
                <div className="pl-4 mt-2 space-y-2">
                  <Link
                    href="/lawyers/tax"
                    className="block py-2 text-gray-700 hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Tax Law
                  </Link>
                  <Link
                    href="/lawyers/criminal"
                    className="block py-2 text-gray-700 hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Criminal Law
                  </Link>
                  <Link
                    href="/lawyers/family"
                    className="block py-2 text-gray-700 hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Family Law
                  </Link>
                  <Link
                    href="/lawyers/corporate"
                    className="block py-2 text-gray-700 hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Corporate Law
                  </Link>
                  <Link
                    href="/lawyers"
                    className="block py-2 text-gray-700 hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    View All
                  </Link>
                </div>
              </details>
              <Link
                href="/laws"
                className="text-gray-800 hover:text-primary py-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Laws & Rules
              </Link>
              <div className="pt-4 flex flex-col space-y-3">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white w-full"
                  onClick={() => {
                    setIsOpen(false)
                    setShowLoginModal(true)
                  }}
                >
                  Lawyer Login
                </Button>
                <Button
                  className="bg-primary text-white hover:bg-beige-600 w-full"
                  onClick={() => {
                    setIsOpen(false)
                    router.push("/register-lawyer")
                  }}
                >
                  Register as Lawyer
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </header>
  )
}
