"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Search, Scale, BookOpen, Users, MessageSquare, ChevronRight } from "lucide-react"
import ChatBot from "@/components/chat-bot"
import LawyerFinder from "@/components/lawyer-finder"

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const lawyersRef = useRef<HTMLDivElement>(null)
  const lawsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in", "animate-slide-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = [featuresRef.current, lawyersRef.current, lawsRef.current]
    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-beige-100 to-white transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Your Trusted Legal <span className="text-primary">Assistance</span> in Pakistan
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Get expert legal advice, find specialized lawyers, and access Pakistani laws and regulations all in one
                place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-beige-600 text-white">
                  Find a Lawyer <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Explore Laws
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-6 -left-6 w-full h-full bg-beige-200 rounded-lg"></div>
                <div className="relative bg-white p-6 rounded-lg shadow-lg">
                  <ChatBot />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-beige-50 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Find Legal Resources</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <Input
                  type="text"
                  placeholder="Search for laws, lawyers, or legal topics..."
                  className="pl-10 pr-4 py-3 w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
              <Button className="bg-primary hover:bg-beige-600 text-white">Search</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lawyer Finder Section */}
      <section className="py-16 bg-beige-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Not Sure Which Lawyer You Need?</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Answer a few questions about your legal issue, and we'll help you find the right legal expert for your
              case
            </p>
          </div>

          <LawyerFinder />
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Can Help You</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              PakLegalAssist provides comprehensive legal resources and assistance for all your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-beige-50 rounded-lg p-8 shadow-sm card-hover">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Legal Chatbot</h3>
              <p className="text-gray-700 mb-4">
                Get instant answers to your legal questions from our AI-powered chatbot trained on Pakistani laws.
              </p>
              <Link href="/chat" className="text-primary font-medium flex items-center hover:underline">
                Chat Now <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-beige-50 rounded-lg p-8 shadow-sm card-hover">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Lawyers</h3>
              <p className="text-gray-700 mb-4">
                Connect with specialized lawyers across Pakistan in various fields of law for personalized assistance.
              </p>
              <Link href="/lawyers" className="text-primary font-medium flex items-center hover:underline">
                Find a Lawyer <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-beige-50 rounded-lg p-8 shadow-sm card-hover">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Laws & Regulations</h3>
              <p className="text-gray-700 mb-4">
                Access, read, and download Pakistani laws and regulations in an easy-to-understand format.
              </p>
              <Link href="/laws" className="text-primary font-medium flex items-center hover:underline">
                Explore Laws <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lawyers Section */}
      <section ref={lawyersRef} className="py-16 md:py-24 bg-beige-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Legal Experts</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Connect with specialized lawyers across Pakistan who can provide expert assistance in various legal
              matters
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
              <div className="relative h-64">
                <Image src="/placeholder.svg?height=400&width=300" alt="Tax Lawyer" fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="bg-beige-100 text-primary text-sm font-medium px-3 py-1 rounded-full inline-block mb-3">
                  Tax Law
                </div>
                <h3 className="text-xl font-bold mb-2">Tax Lawyers</h3>
                <p className="text-gray-700 mb-4">
                  Experts in Pakistani tax laws, regulations, and compliance matters.
                </p>
                <Link href="/lawyers/tax" className="text-primary font-medium flex items-center hover:underline">
                  View Specialists <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
              <div className="relative h-64">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="Criminal Lawyer"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="bg-beige-100 text-primary text-sm font-medium px-3 py-1 rounded-full inline-block mb-3">
                  Criminal Law
                </div>
                <h3 className="text-xl font-bold mb-2">Criminal Lawyers</h3>
                <p className="text-gray-700 mb-4">
                  Specialized in criminal defense, prosecution, and legal proceedings.
                </p>
                <Link href="/lawyers/criminal" className="text-primary font-medium flex items-center hover:underline">
                  View Specialists <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
              <div className="relative h-64">
                <Image src="/placeholder.svg?height=400&width=300" alt="Family Lawyer" fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="bg-beige-100 text-primary text-sm font-medium px-3 py-1 rounded-full inline-block mb-3">
                  Family Law
                </div>
                <h3 className="text-xl font-bold mb-2">Family Lawyers</h3>
                <p className="text-gray-700 mb-4">Experts in marriage, divorce, custody, and inheritance matters.</p>
                <Link href="/lawyers/family" className="text-primary font-medium flex items-center hover:underline">
                  View Specialists <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
              <div className="relative h-64">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="Corporate Lawyer"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="bg-beige-100 text-primary text-sm font-medium px-3 py-1 rounded-full inline-block mb-3">
                  Corporate Law
                </div>
                <h3 className="text-xl font-bold mb-2">Corporate Lawyers</h3>
                <p className="text-gray-700 mb-4">Specialized in business law, contracts, and corporate compliance.</p>
                <Link href="/lawyers/corporate" className="text-primary font-medium flex items-center hover:underline">
                  View Specialists <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-primary hover:bg-beige-600 text-white">
              View All Lawyers <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Laws Section */}
      <section ref={lawsRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pakistani Laws & Regulations</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Access comprehensive collection of Pakistani laws, rules, and regulations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-beige-50 rounded-lg p-6 shadow-sm card-hover border border-beige-100">
              <div className="flex items-center mb-4">
                <Scale className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-bold">Constitution</h3>
              </div>
              <p className="text-gray-700 mb-4">
                The Constitution of Pakistan, including all amendments and interpretations.
              </p>
              <Link href="/laws/constitution" className="text-primary font-medium flex items-center hover:underline">
                Read More <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-beige-50 rounded-lg p-6 shadow-sm card-hover border border-beige-100">
              <div className="flex items-center mb-4">
                <Scale className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-bold">Criminal Laws</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Pakistan Penal Code, Criminal Procedure Code, and related criminal legislation.
              </p>
              <Link href="/laws/criminal" className="text-primary font-medium flex items-center hover:underline">
                Read More <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-beige-50 rounded-lg p-6 shadow-sm card-hover border border-beige-100">
              <div className="flex items-center mb-4">
                <Scale className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-bold">Civil Laws</h3>
              </div>
              <p className="text-gray-700 mb-4">Civil Procedure Code, Contract Act, and other civil legislation.</p>
              <Link href="/laws/civil" className="text-primary font-medium flex items-center hover:underline">
                Read More <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-beige-50 rounded-lg p-6 shadow-sm card-hover border border-beige-100">
              <div className="flex items-center mb-4">
                <Scale className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-bold">Family Laws</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Muslim Family Laws Ordinance, Guardian and Wards Act, and related legislation.
              </p>
              <Link href="/laws/family" className="text-primary font-medium flex items-center hover:underline">
                Read More <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-beige-50 rounded-lg p-6 shadow-sm card-hover border border-beige-100">
              <div className="flex items-center mb-4">
                <Scale className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-bold">Tax Laws</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Income Tax Ordinance, Sales Tax Act, and other tax-related legislation.
              </p>
              <Link href="/laws/tax" className="text-primary font-medium flex items-center hover:underline">
                Read More <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-beige-50 rounded-lg p-6 shadow-sm card-hover border border-beige-100">
              <div className="flex items-center mb-4">
                <Scale className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-bold">Corporate Laws</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Companies Act, Securities Act, and other business-related legislation.
              </p>
              <Link href="/laws/corporate" className="text-primary font-medium flex items-center hover:underline">
                Read More <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-primary hover:bg-beige-600 text-white">
              View All Laws <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-beige-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Hear from people who have received legal assistance through our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold">
                "
              </div>
              <p className="text-gray-700 mb-6 pt-4">
                The legal chatbot provided me with clear information about property laws in Pakistan. I was able to
                understand my rights before proceeding with a property purchase.
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-beige-200 flex items-center justify-center text-primary font-bold mr-3">
                  SK
                </div>
                <div>
                  <h4 className="font-bold">Saad Khan</h4>
                  <p className="text-sm text-gray-600">Karachi, Pakistan</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold">
                "
              </div>
              <p className="text-gray-700 mb-6 pt-4">
                I found an excellent tax lawyer through this platform who helped me resolve a complex tax dispute. The
                filtering options made it easy to find the right specialist.
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-beige-200 flex items-center justify-center text-primary font-bold mr-3">
                  FA
                </div>
                <div>
                  <h4 className="font-bold">Fatima Ahmed</h4>
                  <p className="text-sm text-gray-600">Lahore, Pakistan</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold">
                "
              </div>
              <p className="text-gray-700 mb-6 pt-4">
                The downloadable resources on family law were incredibly helpful for my research. I appreciate how
                well-organized and accessible all the legal information is.
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-beige-200 flex items-center justify-center text-primary font-bold mr-3">
                  MH
                </div>
                <div>
                  <h4 className="font-bold">Muhammad Hassan</h4>
                  <p className="text-sm text-gray-600">Islamabad, Pakistan</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              View More Testimonials
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-beige-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Legal Assistance?</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Join our platform to get expert legal advice, find specialized lawyers, and access Pakistani laws and
              regulations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-beige-600 text-white">
                Register as a Lawyer
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Start Using as a Client
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
