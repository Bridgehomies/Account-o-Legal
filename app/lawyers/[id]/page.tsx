"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Phone, Mail, FileText, Award, Calendar, MessageSquare } from "lucide-react"
import ContactLawyerModal from "@/components/contact-lawyer-modal"
import QuickChat from "@/components/quick-chat"
import AppointmentModal from "@/components/appointment-modal"

export default function LawyerDetailPage({ params }: { params: { id: string } }) {
  const [showContactModal, setShowContactModal] = useState(false)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [showChat, setShowChat] = useState(false)

  // Mock lawyer data - in a real app, this would be fetched from an API
  const lawyer = {
    id: params.id,
    name: "Adv. Zainab Ahmed",
    specialization: "Family Law Specialist",
    courtLevel: "Supreme Court",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.8,
    reviewCount: 32,
    experience: "12 years",
    about:
      "Specialized in family law matters with expertise in divorce, child custody, and inheritance disputes. With over 12 years of experience, I have successfully handled more than 500 cases with a success rate of 85%.",
    education: [
      { degree: "LLB", institution: "Punjab University Law College", year: "2008" },
      { degree: "LLM in Family Law", institution: "Quaid-i-Azam University", year: "2010" },
    ],
    contact: {
      phone: "+92 300 1234567",
      email: "zainab.ahmed@example.com",
      address: "123 Legal Street, Islamabad, Pakistan",
    },
    expertise: [
      "Divorce Law",
      "Child Custody",
      "Inheritance Disputes",
      "Matrimonial Property",
      "Domestic Violence Protection",
    ],
    languages: ["English", "Urdu", "Punjabi"],
    availability: "Mon-Fri, 9:00 AM - 5:00 PM",
  }

  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
          {/* Lawyer Profile Image and Contact */}
          <div className="md:w-1/3">
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden mb-4">
                <Image src={lawyer.image || "/placeholder.svg"} alt={lawyer.name} fill className="object-cover" />
              </div>

              <div className="flex mb-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(lawyer.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
              </div>

              <p className="text-lg font-bold mb-1">{lawyer.rating} / 5</p>
              <p className="text-sm text-gray-600 mb-6">{lawyer.reviewCount} reviews</p>

              <Button
                className="w-full bg-primary hover:bg-beige-600 text-white mb-3"
                onClick={() => setShowContactModal(true)}
              >
                <MessageSquare className="mr-2 h-4 w-4" /> Contact Lawyer
              </Button>

              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-white mb-3"
                onClick={() => setShowChat(!showChat)}
              >
                {showChat ? "Hide Chat" : "Quick Chat"}
              </Button>

              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => setShowAppointmentModal(true)}
              >
                <Calendar className="mr-2 h-4 w-4" /> Schedule Consultation
              </Button>

              <div className="mt-6 w-full space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <p className="text-gray-700">{lawyer.contact.address}</p>
                </div>

                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <p className="text-gray-700">{lawyer.contact.phone}</p>
                </div>

                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <p className="text-gray-700">{lawyer.contact.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lawyer Details */}
          <div className="md:w-2/3">
            {showChat ? (
              <div className="mb-6">
                <QuickChat lawyerId={lawyer.id} lawyerName={lawyer.name} />
                <Button variant="outline" className="mt-4 border-gray-300" onClick={() => setShowChat(false)}>
                  Hide Chat
                </Button>
              </div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold">{lawyer.name}</h1>
                    <p className="text-primary font-medium">{lawyer.specialization}</p>
                  </div>
                  <div className="mt-2 md:mt-0 flex items-center bg-beige-50 px-3 py-1 rounded-full">
                    <FileText className="h-4 w-4 mr-1 text-primary" />
                    <span className="text-sm font-medium">{lawyer.courtLevel}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-beige-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Experience</p>
                    <p className="font-bold">{lawyer.experience}</p>
                  </div>

                  <div className="bg-beige-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Languages</p>
                    <p className="font-bold">{lawyer.languages.join(", ")}</p>
                  </div>

                  <div className="bg-beige-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Availability</p>
                    <p className="font-bold">{lawyer.availability}</p>
                  </div>
                </div>

                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="expertise">Expertise</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                  </TabsList>

                  <TabsContent value="about">
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-gray-700">{lawyer.about}</p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="expertise">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          {lawyer.expertise.map((item, index) => (
                            <div key={index} className="flex items-start">
                              <Award className="h-5 w-5 text-primary mr-3 mt-0.5" />
                              <div>
                                <h3 className="font-medium">{item}</h3>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="education">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          {lawyer.education.map((edu, index) => (
                            <div key={index} className="flex items-start">
                              <Award className="h-5 w-5 text-primary mr-3 mt-0.5" />
                              <div>
                                <h3 className="font-medium">{edu.degree}</h3>
                                <p className="text-sm text-gray-600">
                                  {edu.institution}, {edu.year}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        </div>
      </div>

      <ContactLawyerModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        lawyer={{
          name: lawyer.name,
          specialization: lawyer.specialization,
          image: lawyer.image,
        }}
      />

      <AppointmentModal
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
        lawyer={{
          name: lawyer.name,
          specialization: lawyer.specialization,
          image: lawyer.image,
        }}
      />
    </div>
  )
}
