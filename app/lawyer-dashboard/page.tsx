"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Calendar, MessageSquare, User, Users, FileText, Settings, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ChatInterface from "@/components/chat-interface"

export default function LawyerDashboard() {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)

  // Mock data for clients
  const clients = [
    {
      id: "1",
      name: "Ahmed Khan",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I need help with my property dispute case.",
      time: "10:30 AM",
      unread: 2,
      caseType: "Property Dispute",
    },
    {
      id: "2",
      name: "Fatima Ali",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "When can we schedule a meeting to discuss my divorce case?",
      time: "Yesterday",
      unread: 0,
      caseType: "Family Law",
    },
    {
      id: "3",
      name: "Muhammad Hassan",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Thank you for the advice regarding my tax issue.",
      time: "2 days ago",
      unread: 0,
      caseType: "Tax Law",
    },
  ]

  // Find the selected client
  const selectedClient = clients.find((client) => client.id === selectedClientId)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center mb-6">
              <div className="relative w-16 h-16 mr-4">
                <Image src="/placeholder.svg?height=64&width=64" alt="Lawyer profile" className="rounded-full" fill />
              </div>
              <div>
                <h2 className="font-bold text-lg">Adv. Zainab Ahmed</h2>
                <p className="text-sm text-gray-600">Family Law Specialist</p>
              </div>
            </div>

            <nav className="space-y-1">
              <Link href="/lawyer-dashboard" className="flex items-center p-3 text-primary bg-primary/5 rounded-md">
                <MessageSquare className="h-5 w-5 mr-3" />
                <span>Messages</span>
              </Link>
              <Link
                href="/lawyer-dashboard/appointments"
                className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Calendar className="h-5 w-5 mr-3" />
                <span>Appointments</span>
              </Link>
              <Link
                href="/lawyer-dashboard/clients"
                className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Users className="h-5 w-5 mr-3" />
                <span>Clients</span>
              </Link>
              <Link
                href="/lawyer-dashboard/cases"
                className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <FileText className="h-5 w-5 mr-3" />
                <span>Cases</span>
              </Link>
              <Link
                href="/lawyer-dashboard/profile"
                className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <User className="h-5 w-5 mr-3" />
                <span>Profile</span>
              </Link>
              <Link
                href="/lawyer-dashboard/settings"
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
                <p className="text-sm">New message from Ahmed Khan</p>
                <p className="text-xs text-gray-500">10 minutes ago</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm">Appointment scheduled with Fatima Ali</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm">Case update: Khan vs. Property Developers</p>
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
              <TabsTrigger value="active">Active Cases</TabsTrigger>
              <TabsTrigger value="pending">Pending Requests</TabsTrigger>
            </TabsList>

            <TabsContent value="messages" className="mt-0">
              <div className="bg-white rounded-lg shadow-md">
                <div className="grid md:grid-cols-3 h-[700px]">
                  {/* Client List */}
                  <div className="border-r">
                    <div className="p-4 border-b">
                      <h3 className="font-bold mb-2">Client Messages</h3>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search clients..."
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
                      {clients.map((client) => (
                        <div
                          key={client.id}
                          className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                            selectedClientId === client.id ? "bg-primary/5" : ""
                          }`}
                          onClick={() => setSelectedClientId(client.id)}
                        >
                          <div className="flex items-start">
                            <div className="relative w-10 h-10 mr-3">
                              <Image
                                src={client.avatar || "/placeholder.svg"}
                                alt={client.name}
                                fill
                                className="rounded-full"
                              />
                            </div>
                            <div className="flex-grow min-w-0">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium truncate">{client.name}</h4>
                                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{client.time}</span>
                              </div>
                              <p className="text-sm text-gray-600 truncate">{client.lastMessage}</p>
                              <span className="text-xs text-gray-500">{client.caseType}</span>
                            </div>
                            {client.unread > 0 && (
                              <div className="ml-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {client.unread}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="col-span-2">
                    {selectedClient ? (
                      <ChatInterface recipient={selectedClient} userType="lawyer" />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                          <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500">Select a conversation to start messaging</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="active">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Khan vs. Property Developers</CardTitle>
                    <CardDescription>Property Dispute</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Case filed on: <span className="font-medium">12 May 2023</span>
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
                    <CardTitle>Ali Family Inheritance</CardTitle>
                    <CardDescription>Family Law</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Case filed on: <span className="font-medium">3 April 2023</span>
                    </p>
                    <p className="text-sm mb-4">
                      Next hearing: <span className="font-medium">22 June 2023</span>
                    </p>
                    <p className="text-sm mb-4">
                      Status: <span className="font-medium text-amber-600">In Progress</span>
                    </p>
                    <Button className="w-full mt-2 bg-primary hover:bg-beige-600">View Case Details</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Hassan Tax Appeal</CardTitle>
                    <CardDescription>Tax Law</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Case filed on: <span className="font-medium">17 March 2023</span>
                    </p>
                    <p className="text-sm mb-4">
                      Next hearing: <span className="font-medium">5 July 2023</span>
                    </p>
                    <p className="text-sm mb-4">
                      Status: <span className="font-medium text-green-600">Documentation Complete</span>
                    </p>
                    <Button className="w-full mt-2 bg-primary hover:bg-beige-600">View Case Details</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="pending">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold mb-4">Pending Client Requests</h3>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="relative w-10 h-10 mr-3">
                          <Image src="/placeholder.svg?height=40&width=40" alt="Client" fill className="rounded-full" />
                        </div>
                        <div>
                          <h4 className="font-medium">Imran Malik</h4>
                          <p className="text-sm text-gray-600">Corporate Law</p>
                          <p className="text-sm mt-2">
                            I need legal assistance with setting up a new business entity and drafting partnership
                            agreements.
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                    <div className="flex justify-end mt-4 space-x-3">
                      <Button variant="outline" className="border-gray-300">
                        Decline
                      </Button>
                      <Button className="bg-primary hover:bg-beige-600">Accept</Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="relative w-10 h-10 mr-3">
                          <Image src="/placeholder.svg?height=40&width=40" alt="Client" fill className="rounded-full" />
                        </div>
                        <div>
                          <h4 className="font-medium">Ayesha Khan</h4>
                          <p className="text-sm text-gray-600">Family Law</p>
                          <p className="text-sm mt-2">
                            Looking for legal advice regarding child custody after divorce. Need to understand my
                            rights.
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                    <div className="flex justify-end mt-4 space-x-3">
                      <Button variant="outline" className="border-gray-300">
                        Decline
                      </Button>
                      <Button className="bg-primary hover:bg-beige-600">Accept</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
