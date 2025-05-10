"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Phone, Mail, Star, Gavel, Calendar } from "lucide-react"
import Link from "next/link"
import ContactLawyerModal from "@/components/contact-lawyer-modal"
import AppointmentModal from "@/components/appointment-modal"
import { cn } from "@/lib/utils"

export default function LawyersPage() {
  const [selectedLawyer, setSelectedLawyer] = useState<any>(null)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    courtLevels: [] as string[],
    specializations: [] as string[],
    locations: [] as string[],
    experience: [] as string[],
    rating: null as number | null,
  })

  // Mock data for lawyers
  const lawyers = [
    {
      id: "1",
      name: "Adv. Ahmed Khan",
      specialization: "Tax Law Specialist",
      courtLevel: "Supreme Court",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4,
      reviewCount: 32,
      location: "Islamabad, Pakistan",
      phone: "+92 123 456 7890",
      email: "ahmed@example.com",
      tags: ["Tax Planning", "Tax Disputes", "Corporate Tax", "International Tax"],
      bio: "Specialized in corporate and individual taxation matters with expertise in tax planning, compliance, and dispute resolution. Handled over 200 cases with a success rate of 85%.",
      experience: "15+ years",
    },
    {
      id: "2",
      name: "Adv. Fatima Ali",
      specialization: "Family Law Specialist",
      courtLevel: "High Court",
      image: "/placeholder.svg?height=200&width=200",
      rating: 5,
      reviewCount: 48,
      location: "Lahore, Pakistan",
      phone: "+92 123 456 7891",
      email: "fatima@example.com",
      tags: ["Divorce", "Child Custody", "Inheritance", "Matrimonial Property"],
      bio: "Expert in family law matters with a focus on divorce, child custody, and inheritance disputes. Committed to providing compassionate and effective legal representation.",
      experience: "10-15 years",
    },
    {
      id: "3",
      name: "Adv. Tariq Malik",
      specialization: "Criminal Law Specialist",
      courtLevel: "High Court",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.5,
      reviewCount: 36,
      location: "Karachi, Pakistan",
      phone: "+92 123 456 7892",
      email: "tariq@example.com",
      tags: ["Criminal Defense", "White Collar Crime", "Bail Applications", "Appeals"],
      bio: "Experienced criminal defense attorney with expertise in handling complex criminal cases. Former prosecutor with deep understanding of criminal justice system.",
      experience: "10-15 years",
    },
    {
      id: "4",
      name: "Adv. Zainab Ahmed",
      specialization: "Corporate Law Specialist",
      courtLevel: "Supreme Court",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviewCount: 52,
      location: "Islamabad, Pakistan",
      phone: "+92 123 456 7893",
      email: "zainab@example.com",
      tags: ["Corporate Formation", "Mergers & Acquisitions", "Commercial Contracts", "Compliance"],
      bio: "Corporate law expert with extensive experience in business formations, mergers and acquisitions, and commercial contracts. Advised numerous multinational corporations.",
      experience: "15+ years",
    },
    {
      id: "5",
      name: "Adv. Hassan Raza",
      specialization: "Property Law Specialist",
      courtLevel: "Session Court",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.2,
      reviewCount: 28,
      location: "Multan, Pakistan",
      phone: "+92 123 456 7894",
      email: "hassan@example.com",
      tags: ["Property Disputes", "Land Registration", "Tenant Issues", "Real Estate Transactions"],
      bio: "Specialized in property law with expertise in resolving complex property disputes, land registration issues, and real estate transactions.",
      experience: "5-10 years",
    },
    {
      id: "6",
      name: "Adv. Aisha Malik",
      specialization: "Immigration Law Specialist",
      courtLevel: "Session Court",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.3,
      reviewCount: 24,
      location: "Lahore, Pakistan",
      phone: "+92 123 456 7895",
      email: "aisha@example.com",
      tags: ["Visa Applications", "Citizenship", "Deportation Defense", "Asylum"],
      bio: "Immigration law expert helping clients navigate complex immigration processes, visa applications, and citizenship matters.",
      experience: "5-10 years",
    },
  ]

  // Court levels for filtering
  const courtLevels = ["Supreme Court", "High Court", "Session Court", "Civil Court", "Special Court"]

  // Filter lawyers based on active filters
  const filteredLawyers = lawyers.filter((lawyer) => {
    // Filter by court level
    if (activeFilters.courtLevels.length > 0 && !activeFilters.courtLevels.includes(lawyer.courtLevel)) {
      return false
    }

    // Filter by specialization
    if (
      activeFilters.specializations.length > 0 &&
      !activeFilters.specializations.some((spec) => lawyer.specialization.includes(spec))
    ) {
      return false
    }

    // Filter by location
    if (activeFilters.locations.length > 0 && !activeFilters.locations.some((loc) => lawyer.location.includes(loc))) {
      return false
    }

    // Filter by experience
    if (activeFilters.experience.length > 0 && !activeFilters.experience.includes(lawyer.experience)) {
      return false
    }

    // Filter by rating
    if (activeFilters.rating !== null && lawyer.rating < activeFilters.rating) {
      return false
    }

    return true
  })

  const handleContactClick = (lawyer: any) => {
    setSelectedLawyer(lawyer)
    setShowContactModal(true)
  }

  const handleAppointmentClick = (lawyer: any) => {
    setSelectedLawyer(lawyer)
    setShowAppointmentModal(true)
  }

  const toggleCourtLevelFilter = (courtLevel: string) => {
    setActiveFilters((prev) => {
      const courtLevels = prev.courtLevels.includes(courtLevel)
        ? prev.courtLevels.filter((level) => level !== courtLevel)
        : [...prev.courtLevels, courtLevel]

      return { ...prev, courtLevels }
    })
  }

  const toggleSpecializationFilter = (specialization: string) => {
    setActiveFilters((prev) => {
      const specializations = prev.specializations.includes(specialization)
        ? prev.specializations.filter((spec) => spec !== specialization)
        : [...prev.specializations, specialization]

      return { ...prev, specializations }
    })
  }

  const toggleLocationFilter = (location: string) => {
    setActiveFilters((prev) => {
      const locations = prev.locations.includes(location)
        ? prev.locations.filter((loc) => loc !== location)
        : [...prev.locations, location]

      return { ...prev, locations }
    })
  }

  const toggleExperienceFilter = (experience: string) => {
    setActiveFilters((prev) => {
      const experiences = prev.experience.includes(experience)
        ? prev.experience.filter((exp) => exp !== experience)
        : [...prev.experience, experience]

      return { ...prev, experiences }
    })
  }

  const setRatingFilter = (rating: number) => {
    setActiveFilters((prev) => ({
      ...prev,
      rating: prev.rating === rating ? null : rating,
    }))
  }

  const clearFilters = () => {
    setActiveFilters({
      courtLevels: [],
      specializations: [],
      locations: [],
      experience: [],
      rating: null,
    })
  }

  return (
    <div className="pt-24 pb-16">
      <section className="bg-beige-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find the Right Lawyer</h1>
            <p className="text-lg text-gray-700 mb-8">
              Connect with specialized lawyers across Pakistan who can provide expert assistance in various legal
              matters
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-grow relative">
                <Input
                  type="text"
                  placeholder="Search by name, specialty, or location..."
                  className="pl-10 pr-4 py-3 w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
              <Button className="bg-primary hover:bg-beige-600 text-white">Search</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Filter Lawyers</h2>
                  {(activeFilters.courtLevels.length > 0 ||
                    activeFilters.specializations.length > 0 ||
                    activeFilters.locations.length > 0 ||
                    activeFilters.experience.length > 0 ||
                    activeFilters.rating !== null) && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="text-primary">
                      Clear All
                    </Button>
                  )}
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Court Level</h3>
                  <div className="space-y-2">
                    {courtLevels.map((courtLevel) => (
                      <div key={courtLevel} className="flex items-center">
                        <button
                          onClick={() => toggleCourtLevelFilter(courtLevel)}
                          className={cn(
                            "flex items-center w-full text-left",
                            activeFilters.courtLevels.includes(courtLevel) && "font-medium text-primary",
                          )}
                        >
                          <div
                            className={cn(
                              "w-4 h-4 mr-2 border rounded flex items-center justify-center",
                              activeFilters.courtLevels.includes(courtLevel)
                                ? "border-primary bg-primary text-white"
                                : "border-gray-300",
                            )}
                          >
                            {activeFilters.courtLevels.includes(courtLevel) && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-3 h-3"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            )}
                          </div>
                          <span>{courtLevel}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Specialization</h3>
                  <div className="space-y-2">
                    {["Tax Law", "Criminal Law", "Family Law", "Corporate Law", "Property Law", "Immigration Law"].map(
                      (specialty) => (
                        <div key={specialty} className="flex items-center">
                          <button
                            onClick={() => toggleSpecializationFilter(specialty)}
                            className={cn(
                              "flex items-center w-full text-left",
                              activeFilters.specializations.includes(specialty) && "font-medium text-primary",
                            )}
                          >
                            <div
                              className={cn(
                                "w-4 h-4 mr-2 border rounded flex items-center justify-center",
                                activeFilters.specializations.includes(specialty)
                                  ? "border-primary bg-primary text-white"
                                  : "border-gray-300",
                              )}
                            >
                              {activeFilters.specializations.includes(specialty) && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="w-3 h-3"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              )}
                            </div>
                            <span>{specialty}</span>
                          </button>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Location</h3>
                  <div className="space-y-2">
                    {["Islamabad", "Lahore", "Karachi", "Peshawar", "Quetta", "Multan"].map((city) => (
                      <div key={city} className="flex items-center">
                        <button
                          onClick={() => toggleLocationFilter(city)}
                          className={cn(
                            "flex items-center w-full text-left",
                            activeFilters.locations.includes(city) && "font-medium text-primary",
                          )}
                        >
                          <div
                            className={cn(
                              "w-4 h-4 mr-2 border rounded flex items-center justify-center",
                              activeFilters.locations.includes(city)
                                ? "border-primary bg-primary text-white"
                                : "border-gray-300",
                            )}
                          >
                            {activeFilters.locations.includes(city) && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-3 h-3"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            )}
                          </div>
                          <span>{city}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Experience</h3>
                  <div className="space-y-2">
                    {["0-5 years", "5-10 years", "10-15 years", "15+ years"].map((exp) => (
                      <div key={exp} className="flex items-center">
                        <button
                          onClick={() => toggleExperienceFilter(exp)}
                          className={cn(
                            "flex items-center w-full text-left",
                            activeFilters.experience.includes(exp) && "font-medium text-primary",
                          )}
                        >
                          <div
                            className={cn(
                              "w-4 h-4 mr-2 border rounded flex items-center justify-center",
                              activeFilters.experience.includes(exp)
                                ? "border-primary bg-primary text-white"
                                : "border-gray-300",
                            )}
                          >
                            {activeFilters.experience.includes(exp) && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-3 h-3"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            )}
                          </div>
                          <span>{exp}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Rating</h3>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <button
                          onClick={() => setRatingFilter(rating)}
                          className={cn(
                            "flex items-center w-full text-left",
                            activeFilters.rating === rating && "font-medium text-primary",
                          )}
                        >
                          <div
                            className={cn(
                              "w-4 h-4 mr-2 border rounded flex items-center justify-center",
                              activeFilters.rating === rating
                                ? "border-primary bg-primary text-white"
                                : "border-gray-300",
                            )}
                          >
                            {activeFilters.rating === rating && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-3 h-3"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            )}
                          </div>
                          <div className="flex items-center">
                            {Array(rating)
                              .fill(0)
                              .map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            {Array(5 - rating)
                              .fill(0)
                              .map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-gray-300" />
                              ))}
                            <span className="ml-1">& Up</span>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-beige-600 text-white">Apply Filters</Button>
              </div>
            </div>

            <div className="md:w-3/4">
              <div className="mb-8 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Featured Lawyers</h2>
                <div className="flex items-center">
                  <span className="mr-2">Sort by:</span>
                  <select className="border rounded-md p-2">
                    <option>Relevance</option>
                    <option>Rating: High to Low</option>
                    <option>Experience: High to Low</option>
                    <option>Name: A to Z</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                {filteredLawyers.length > 0 ? (
                  filteredLawyers.map((lawyer) => (
                    <div
                      key={lawyer.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden border border-beige-100 hover:shadow-lg transition-shadow"
                    >
                      <div className="p-6 flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/4 flex flex-col items-center">
                          <div className="relative w-32 h-32 rounded-full overflow-hidden mb-3">
                            <Image
                              src={lawyer.image || "/placeholder.svg"}
                              alt={`${lawyer.name} Profile`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex mb-2">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < lawyer.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                          </div>
                          <span className="text-sm text-gray-600">{lawyer.reviewCount} Reviews</span>
                        </div>

                        <div className="md:w-3/4">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold">{lawyer.name}</h3>
                              <p className="text-primary font-medium">{lawyer.specialization}</p>
                            </div>
                            <div className="mt-2 md:mt-0 flex items-center">
                              <Gavel className="h-4 w-4 mr-1 text-primary" />
                              <span className="text-sm font-medium text-gray-700">{lawyer.courtLevel}</span>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4">{lawyer.bio}</p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                            <div className="flex items-center text-gray-600">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span className="text-sm">{lawyer.location}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Phone className="h-4 w-4 mr-1" />
                              <span className="text-sm">{lawyer.phone}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Mail className="h-4 w-4 mr-1" />
                              <span className="text-sm">{lawyer.email}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {lawyer.tags.map((tag) => (
                              <span key={tag} className="bg-beige-50 text-gray-700 text-xs px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button className="bg-primary hover:bg-beige-600 text-white" asChild>
                              <Link href={`/lawyers/${lawyer.id}`}>View Profile</Link>
                            </Button>
                            <Button
                              variant="outline"
                              className="border-primary text-primary hover:bg-primary hover:text-white"
                              onClick={() => handleContactClick(lawyer)}
                            >
                              Contact
                            </Button>
                            <Button
                              variant="outline"
                              className="border-primary text-primary hover:bg-primary hover:text-white"
                              onClick={() => handleAppointmentClick(lawyer)}
                            >
                              <Calendar className="mr-2 h-4 w-4" /> Schedule Appointment
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <h3 className="text-xl font-bold mb-2">No lawyers found</h3>
                    <p className="text-gray-600 mb-4">No lawyers match your current filter criteria.</p>
                    <Button onClick={clearFilters} className="bg-primary hover:bg-beige-600 text-white">
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="w-9 p-0">
                    &lt;
                  </Button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <Button
                      key={page}
                      variant={page === 1 ? "default" : "outline"}
                      size="sm"
                      className={`w-9 p-0 ${page === 1 ? "bg-primary" : ""}`}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button variant="outline" size="sm" className="w-9 p-0">
                    &gt;
                  </Button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactLawyerModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        lawyer={selectedLawyer || { name: "", specialization: "" }}
      />

      <AppointmentModal
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
        lawyer={selectedLawyer || { name: "", specialization: "" }}
      />
    </div>
  )
}
