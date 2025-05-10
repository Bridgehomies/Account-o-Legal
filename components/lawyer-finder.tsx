"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ArrowLeft, Check, Gavel, Home, Briefcase, FileText, Users, Shield } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type LegalCategory = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  subcategories?: {
    id: string
    title: string
    lawyerType: string
    description: string
  }[]
}

export default function LawyerFinder() {
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)

  const legalCategories: LegalCategory[] = [
    {
      id: "family",
      title: "Family Matters",
      description: "Divorce, custody, inheritance, and other family-related legal issues",
      icon: <Users className="h-8 w-8 text-primary" />,
      subcategories: [
        {
          id: "divorce",
          title: "Divorce or Separation",
          lawyerType: "Family Law Specialist",
          description: "Legal assistance with divorce proceedings, separation agreements, and related matters",
        },
        {
          id: "custody",
          title: "Child Custody",
          lawyerType: "Family Law Specialist",
          description: "Legal help with child custody disputes, visitation rights, and child support",
        },
        {
          id: "inheritance",
          title: "Inheritance & Succession",
          lawyerType: "Family Law Specialist",
          description: "Assistance with inheritance disputes, succession certificates, and estate distribution",
        },
      ],
    },
    {
      id: "property",
      title: "Property & Real Estate",
      description: "Property disputes, land registration, tenant issues, and real estate transactions",
      icon: <Home className="h-8 w-8 text-primary" />,
      subcategories: [
        {
          id: "dispute",
          title: "Property Dispute",
          lawyerType: "Property Law Specialist",
          description: "Legal assistance with property ownership disputes, boundary issues, and encroachment matters",
        },
        {
          id: "transaction",
          title: "Property Transaction",
          lawyerType: "Property Law Specialist",
          description:
            "Help with buying, selling, or transferring property, including documentation and legal verification",
        },
        {
          id: "tenant",
          title: "Tenant/Landlord Issues",
          lawyerType: "Property Law Specialist",
          description: "Legal assistance with rental agreements, evictions, and tenant-landlord disputes",
        },
      ],
    },
    {
      id: "criminal",
      title: "Criminal Matters",
      description: "Criminal charges, police cases, bail applications, and criminal defense",
      icon: <Gavel className="h-8 w-8 text-primary" />,
      subcategories: [
        {
          id: "defense",
          title: "Criminal Defense",
          lawyerType: "Criminal Law Specialist",
          description:
            "Legal representation for those accused of crimes, including defense strategy and court representation",
        },
        {
          id: "bail",
          title: "Bail Application",
          lawyerType: "Criminal Law Specialist",
          description: "Assistance with bail applications and related legal procedures",
        },
        {
          id: "fir",
          title: "FIR Registration/Cancellation",
          lawyerType: "Criminal Law Specialist",
          description: "Help with filing or challenging First Information Reports (FIRs)",
        },
      ],
    },
    {
      id: "corporate",
      title: "Business & Corporate",
      description: "Business formation, contracts, employment issues, and corporate compliance",
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      subcategories: [
        {
          id: "formation",
          title: "Business Formation",
          lawyerType: "Corporate Law Specialist",
          description: "Legal assistance with establishing companies, partnerships, or other business entities",
        },
        {
          id: "contracts",
          title: "Contracts & Agreements",
          lawyerType: "Corporate Law Specialist",
          description: "Help with drafting, reviewing, or disputing business contracts and agreements",
        },
        {
          id: "employment",
          title: "Employment Issues",
          lawyerType: "Corporate Law Specialist",
          description: "Assistance with employment contracts, disputes, terminations, and workplace issues",
        },
      ],
    },
    {
      id: "tax",
      title: "Tax & Financial",
      description: "Tax disputes, financial compliance, and tax planning",
      icon: <FileText className="h-8 w-8 text-primary" />,
      subcategories: [
        {
          id: "dispute",
          title: "Tax Dispute",
          lawyerType: "Tax Law Specialist",
          description: "Legal assistance with tax audits, appeals, and disputes with tax authorities",
        },
        {
          id: "planning",
          title: "Tax Planning",
          lawyerType: "Tax Law Specialist",
          description: "Professional advice on tax optimization, compliance, and financial planning",
        },
        {
          id: "compliance",
          title: "Financial Compliance",
          lawyerType: "Tax Law Specialist",
          description: "Help with regulatory compliance, financial reporting, and related legal matters",
        },
      ],
    },
    {
      id: "other",
      title: "Other Legal Issues",
      description: "Constitutional matters, public interest litigation, and other legal concerns",
      icon: <Shield className="h-8 w-8 text-primary" />,
      subcategories: [
        {
          id: "constitutional",
          title: "Constitutional Matter",
          lawyerType: "Constitutional Law Specialist",
          description: "Legal assistance with fundamental rights, constitutional petitions, and related issues",
        },
        {
          id: "pil",
          title: "Public Interest Litigation",
          lawyerType: "Public Interest Law Specialist",
          description: "Help with filing or participating in public interest cases and social justice matters",
        },
        {
          id: "other",
          title: "Other Legal Concern",
          lawyerType: "General Practice Lawyer",
          description: "Assistance with other legal matters not covered in the categories above",
        },
      ],
    },
  ]

  const selectedCategoryData = legalCategories.find((cat) => cat.id === selectedCategory)
  const selectedSubcategoryData = selectedCategoryData?.subcategories?.find((sub) => sub.id === selectedSubcategory)

  const handleNextStep = () => {
    if (step === 1 && selectedCategory) {
      setStep(2)
    } else if (step === 2 && selectedSubcategory) {
      setStep(3)
    }
  }

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1)
    } else if (step === 3) {
      setStep(2)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className={`flex items-center ${step >= 1 ? "text-primary" : "text-gray-400"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-white" : "bg-gray-200"}`}
            >
              1
            </div>
            <span className="ml-2 text-sm font-medium">Select Category</span>
          </div>
          <div className={`w-12 h-1 mx-2 ${step >= 2 ? "bg-primary" : "bg-gray-200"}`}></div>
          <div className={`flex items-center ${step >= 2 ? "text-primary" : "text-gray-400"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-white" : "bg-gray-200"}`}
            >
              2
            </div>
            <span className="ml-2 text-sm font-medium">Specify Issue</span>
          </div>
          <div className={`w-12 h-1 mx-2 ${step >= 3 ? "bg-primary" : "bg-gray-200"}`}></div>
          <div className={`flex items-center ${step >= 3 ? "text-primary" : "text-gray-400"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-white" : "bg-gray-200"}`}
            >
              3
            </div>
            <span className="ml-2 text-sm font-medium">Results</span>
          </div>
        </div>

        {/* Step 1: Select Category */}
        {step === 1 && (
          <div>
            <h3 className="text-xl font-bold mb-4 text-center">What type of legal issue are you facing?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {legalCategories.map((category) => (
                <div key={category.id} className="relative">
                  <button
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      "flex items-start w-full p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-beige-50 text-left",
                      selectedCategory === category.id
                        ? "border-primary border-[2.5px] bg-primary/5 shadow-sm font-medium"
                        : "border-gray-200",
                    )}
                  >
                    <div className="mr-4 mt-1">{category.icon}</div>
                    <div>
                      <div className={cn("font-bold", selectedCategory === category.id ? "text-primary" : "")}>
                        {category.title}
                      </div>
                      <div className="text-sm text-gray-600">{category.description}</div>
                    </div>
                    {selectedCategory === category.id && (
                      <div className="absolute top-4 right-4">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                    )}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <Button
                onClick={handleNextStep}
                disabled={!selectedCategory}
                className="bg-primary hover:bg-beige-600 text-white"
              >
                Next Step <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Select Subcategory */}
        {step === 2 && selectedCategoryData && (
          <div>
            <h3 className="text-xl font-bold mb-4 text-center">What specific issue do you need help with?</h3>
            <div className="space-y-3">
              {selectedCategoryData.subcategories?.map((subcategory) => (
                <div key={subcategory.id} className="relative">
                  <button
                    onClick={() => setSelectedSubcategory(subcategory.id)}
                    className={cn(
                      "flex flex-col w-full p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-beige-50 text-left",
                      selectedSubcategory === subcategory.id
                        ? "border-primary border-[2.5px] bg-primary/5 shadow-sm font-medium"
                        : "border-gray-200",
                    )}
                  >
                    <div className={cn("font-bold", selectedSubcategory === subcategory.id ? "text-primary" : "")}>
                      {subcategory.title}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{subcategory.description}</div>
                    {selectedSubcategory === subcategory.id && (
                      <div className="absolute top-4 right-4">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                    )}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                onClick={handleNextStep}
                disabled={!selectedSubcategory}
                className="bg-primary hover:bg-beige-600 text-white"
              >
                Next Step <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && selectedCategoryData && selectedSubcategoryData && (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">We've Found Your Match!</h3>
              <p className="text-gray-600 mt-2">Based on your issue, we recommend consulting with a:</p>
            </div>

            <Card className="border-primary/20 bg-primary/5 mb-6">
              <CardContent className="p-6">
                <h4 className="text-2xl font-bold text-primary text-center mb-2">
                  {selectedSubcategoryData.lawyerType}
                </h4>
                <p className="text-center text-gray-700">
                  These lawyers specialize in {selectedCategoryData.title.toLowerCase()} with expertise in handling{" "}
                  {selectedSubcategoryData.title.toLowerCase()} cases.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Button className="w-full bg-primary hover:bg-beige-600 text-white" asChild>
                <Link href={`/lawyers?specialization=${encodeURIComponent(selectedSubcategoryData.lawyerType)}`}>
                  Find {selectedSubcategoryData.lawyerType}s <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={handlePrevStep}
                className="w-full border-primary text-primary hover:bg-primary hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Change Your Selection
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
