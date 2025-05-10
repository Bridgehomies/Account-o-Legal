"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Calendar, MessageSquare, User, FileText, Settings, LogOut, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ChatInterface from "@/components/chat-interface"

export default function ClientDashboard() {
  const [selectedLawyerId, setSelectedLawyerId] = useState<string | null>(null)

  // Mock data for lawyers
  const lawyers = [
    {
      id: "1",
      name: "Adv. Zainab Ahmed",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I'll review your property documents and get back to you tomorrow.",
      time: "10:30 AM",
      unread: 1,
      specialization: "Property Law",
    },
    {
      id: "2",
      name: "Adv. Tariq Malik",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "We can schedule a meeting to discuss your case in detail.",
      time: "Yesterday",
      unread: 0,
      specialization: "Criminal Law",
    },
  ]

  // Find the selected lawyer
  const selectedLawyer = lawyers.find((lawyer) => lawyer.id === selectedLawyerId)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center mb-6">
              <div className="relative w-16 h-16 mr-4">
                <Image src="/placeholder.svg?height=64&width=64" alt="Client profile" className="rounded-full" fill />
              </div>
              <div>
                <h2 className="font-bold text-lg">Ahmed Khan</h2>
                <p className="text-sm text-gray-600">Client</p>
              </div>
            </div>

            <nav className="space-y-1">
              <Link href="/client-dashboard" className="flex items-center p-3 text-primary bg-primary/5 rounded-md">
                <MessageSquare className="h-5 w-5 mr-3" />
                <span>Messages</span>
              </Link>
              <Link
                href="/client-dashboard/appointments"
                className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Calendar className="h-5 w-5 mr-3" />
                <span>Appointments</span>
              </Link>
              <Link
                href="/client-dashboard/cases"
                className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <FileText className="h-5 w-5 mr-3" />
                <span>My Cases</span>
              </Link>
              <Link
                href="/client-dashboard/find-lawyers"
                className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Search className="h-5 w-5 mr-3" />
                <span>Find Lawyers</span>
              </Link>
              <Link
                href="/client-dashboard/profile"
                className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <User className="h-5 w-5 mr-3" />
                <span>Profile</span>
              </Link>
              <Link
                href="/client-dashboard/settings"
                className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Settings className="h-5 w-5 mr-3" />
                <span>Settings</span>
              </Link>
              <Link href="/logout" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md">
                <LogOut className="h-5 w-5 mr-3" />
                <span>Logout</span>
              </Link>
            </nav>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Notifications</h3>
              <Bell className="h-5 w-5 text-gray-500" />
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-primary/5 rounded-md">
                <p className="text-sm">New message from Adv. Zainab Ahmed</p>
                <p className="text-xs text-gray-500">10 minutes ago</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm">Appointment confirmed with Adv. Tariq Malik</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm">Case update: Property Dispute</p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <Tabs defaultValue="messages" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="cases">My Cases</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
            </TabsList>

            <TabsContent value="messages" className="mt-0">
              <div className="bg-white rounded-lg shadow-md">
                <div className="grid md:grid-cols-3 h-[700px]">
                  {/* Lawyer List */}
                  <div className="border-r">
                    <div className="p-4 border-b">
                      <h3 className="font-bold mb-2">My Lawyers</h3>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search messages..."
                          className="w-full p-2 pl-8 border rounded-md text-sm"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 absolute left-2 top-3 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="overflow-y-auto h-[calc(700px-73px)]">
                      {lawyers.map((lawyer) => (
                        <div
                          key={lawyer.id}
                          className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                            selectedLawyerId === lawyer.id ? "bg-primary/5" : ""
                          }`}
                          onClick={() => setSelectedLawyerId(lawyer.id)}
                        >
                          <div className="flex items-start">
                            <div className="relative w-10 h-10 mr-3">
                              <Image
                                src={lawyer.avatar || "/placeholder.svg"}
                                alt={lawyer.name}
                                fill
                                className="rounded-full"
                              />
                            </div>
                            <div className="flex-grow min-w-0">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium truncate">{lawyer.name}</h4>
                                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{lawyer.time}</span>
                              </div>
                              <p className="text-sm text-gray-600 truncate">{lawyer.lastMessage}</p>
                              <span className="text-xs text-gray-500">{lawyer.specialization}</span>
                            </div>
                            {lawyer.unread > 0 && (
                              <div className="ml-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {lawyer.unread}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="col-span-2">
                    {selectedLawyer ? (
                      <ChatInterface recipient={selectedLawyer} userType="client" />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                          <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500">Select a lawyer to start messaging</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cases">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Dispute</CardTitle>
                    <CardDescription>vs. Property Developers Ltd.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Lawyer: <span className="font-medium">Adv. Zainab Ahmed</span>
                    </p>
                    <p className="text-sm mb-4">
                      Filed on: <span className="font-medium">12 May 2023</span>
                    </p>
                    <p className="text-sm mb-4">
                      Next hearing: <span className="font-medium">15 June 2023</span>
                    </p>
                    <p className="text-sm mb-4">
                      Status: <span className="font-medium text-amber-600">In Progress</span>
                    </p>
                    <Button className="w-full mt-2 bg-primary hover:bg-beige-600">View Case Details</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Violation</CardTitle>
                    <CardDescription>Speeding Ticket Appeal</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Lawyer: <span className="font-medium">Adv. Tariq Malik</span>
                    </p>
                    <p className="text-sm mb-4">
                      Filed on: <span className="font-medium">3 April 2023</span>
                    </p>
                    <p className="text-sm mb-4">
                      Next hearing: <span className="font-medium">N/A</span>
                    </p>
                    <p className="text-sm mb-4">
                      Status: <span className="font-medium text-green-600">Resolved</span>
                    </p>
                    <Button className="w-full mt-2 bg-primary hover:bg-beige-600">View Case Details</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="appointments">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold mb-6">Upcoming Appointments</h3>

                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="relative w-10 h-10 mr-3">
                          <Image src="/placeholder.svg?height=40&width=40" alt="Lawyer" fill className="rounded-full" />
                        </div>
                        <div>
                          <h4 className="font-medium">Adv. Zainab Ahmed</h4>
                          <p className="text-sm text-gray-600">Property Law Specialist</p>
                          <div className="mt-2 flex items-center">
                            <Calendar className="h-4 w-4 text-primary mr-2" />
                            <span className="text-sm">15 June 2023, 10:00 AM</span>
                          </div>
                          <p className="text-sm mt-2">
                            Discussion about property documents and next steps in the case.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4 space-x-3">
                      <Button variant="outline" className="border-gray-300">
                        Reschedule
                      </Button>
                      <Button className="bg-primary hover:bg-beige-600">Join Meeting</Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="relative w-10 h-10 mr-3">
                          <Image src="/placeholder.svg?height=40&width=40" alt="Lawyer" fill className="rounded-full" />
                        </div>
                        <div>
                          <h4 className="font-medium">Adv. Tariq Malik</h4>
                          <p className="text-sm text-gray-600">Criminal Law Specialist</p>
                          <div className="mt-2 flex items-center">
                            <Calendar className="h-4 w-4 text-primary mr-2" />
                            <span className="text-sm">22 June 2023, 2:00 PM</span>
                          </div>
                          <p className="text-sm mt-2">Initial consultation regarding your traffic violation case.</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4 space-x-3">
                      <Button variant="outline" className="border-gray-300">
                        Reschedule
                      </Button>
                      <Button className="bg-primary hover:bg-beige-600">Join Meeting</Button>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button className="w-full bg-primary hover:bg-beige-600">Schedule New Appointment</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
