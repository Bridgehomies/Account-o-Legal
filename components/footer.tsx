import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-beige-100 text-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PakLegalAssist</h3>
            <p className="mb-4">
              Your trusted platform for legal assistance and information about Pakistani laws and regulations.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-primary transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-primary transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-primary transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/lawyers" className="hover:text-primary transition-colors">
                  Find a Lawyer
                </Link>
              </li>
              <li>
                <Link href="/laws" className="hover:text-primary transition-colors">
                  Laws & Rules
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Legal Areas</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/lawyers/tax" className="hover:text-primary transition-colors">
                  Tax Law
                </Link>
              </li>
              <li>
                <Link href="/lawyers/criminal" className="hover:text-primary transition-colors">
                  Criminal Law
                </Link>
              </li>
              <li>
                <Link href="/lawyers/family" className="hover:text-primary transition-colors">
                  Family Law
                </Link>
              </li>
              <li>
                <Link href="/lawyers/corporate" className="hover:text-primary transition-colors">
                  Corporate Law
                </Link>
              </li>
              <li>
                <Link href="/lawyers/property" className="hover:text-primary transition-colors">
                  Property Law
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>123 Legal Street, Islamabad, Pakistan</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-primary" />
                <span>+92 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-primary" />
                <span>info@paklegalassist.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-beige-200 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} PakLegalAssist. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/terms" className="text-sm hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-sm hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
