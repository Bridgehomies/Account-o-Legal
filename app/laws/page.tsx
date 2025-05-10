import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Download, FileText, ChevronRight } from "lucide-react"

export default function LawsPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="bg-beige-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Pakistani Laws & Regulations</h1>
            <p className="text-lg text-gray-700 mb-8">
              Access, read, and download comprehensive collection of Pakistani laws, rules, and regulations
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-grow relative">
                <Input
                  type="text"
                  placeholder="Search for laws, acts, or regulations..."
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-beige-100">
              <div className="bg-beige-50 p-6">
                <h2 className="text-2xl font-bold mb-2">Constitutional Laws</h2>
                <p className="text-gray-700">The fundamental laws that govern the structure and powers of the state</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li>
                    <Link href="/laws/constitution" className="flex justify-between items-center hover:text-primary">
                      <span className="font-medium">Constitution of Pakistan</span>
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/laws/amendments" className="flex justify-between items-center hover:text-primary">
                      <span className="font-medium">Constitutional Amendments</span>
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/laws/fundamental-rights"
                      className="flex justify-between items-center hover:text-primary"
                    >
                      <span className="font-medium">Fundamental Rights</span>
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    View All Constitutional Laws
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-beige-100">
              <div className="bg-beige-50 p-6">
                <h2 className="text-2xl font-bold mb-2">Criminal Laws</h2>
                <p className="text-gray-700">Laws related to crimes, punishments, and criminal procedures</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/laws/pakistan-penal-code"
                      className="flex justify-between items-center hover:text-primary"
                    >
                      <span className="font-medium">Pakistan Penal Code</span>
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/laws/criminal-procedure-code"
                      className="flex justify-between items-center hover:text-primary"
                    >
                      <span className="font-medium">Criminal Procedure Code</span>
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/laws/anti-terrorism-act"
                      className="flex justify-between items-center hover:text-primary"
                    >
                      <span className="font-medium">Anti-Terrorism Act</span>
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    View All Criminal Laws
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-beige-100">
              <div className="bg-beige-50 p-6">
                <h2 className="text-2xl font-bold mb-2">Civil Laws</h2>
                <p className="text-gray-700">Laws governing private rights and remedies</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/laws/civil-procedure-code"
                      className="flex justify-between items-center hover:text-primary"
                    >
                      <span className="font-medium">Civil Procedure Code</span>
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/laws/contract-act" className="flex justify-between items-center hover:text-primary">
                      <span className="font-medium">Contract Act</span>
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/laws/specific-relief-act"
                      className="flex justify-between items-center hover:text-primary"
                    >
                      <span className="font-medium">Specific Relief Act</span>
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    View All Civil Laws
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-beige-100">
              <div className="bg-beige-50 p-6">
                <h2 className="text-2xl font-bold mb-2">Family Laws</h2>
                <p className="text-gray-700">Laws related to marriage, divorce, custody, and inheritance</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/laws/muslim-family-laws-ordinance"
                      className="flex justify-between items-center hover:text-primary"
                    >
                      <span className="font-medium">Muslim Family Laws Ordinance</span>
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/laws/guardian-and-wards-act"
                      className="flex justify-between items-center hover:text-primary"
                    >
                      <span className="font-medium">Guardian and Wards Act</span>
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/laws/inheritance-laws"
                      className="flex justify-between items-center hover:text-primary"
                    >
                      <span className="font-medium">Inheritance Laws</span>
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    View All Family Laws
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-beige-100">
              <div className="bg-beige-50 p-6">
                <h2 className="text-2xl font-bold mb-2">Tax Laws</h2>
                <p className="text-gray-700">Laws related to taxation and revenue collection</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/laws/income-tax-ordinance"
                      className="flex justify-between items-center hover:text-primary"
                    >
                      <span className="font-medium">Income Tax Ordinance</span>
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/laws/sales-tax-act" className="flex justify-between items-center hover:text-primary">
                      <span className="font-medium">Sales Tax Act</span>
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/laws/customs-act" className="flex justify-between items-center hover:text-primary">
                      <span className="font-medium">Customs Act</span>
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    View All Tax Laws
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-beige-100">
              <div className="bg-beige-50 p-6">
                <h2 className="text-2xl font-bold mb-2">Corporate Laws</h2>
                <p className="text-gray-700">Laws governing businesses and corporations</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li>
                    <Link href="/laws/companies-act" className="flex justify-between items-center hover:text-primary">
                      <span className="font-medium">Companies Act</span>
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/laws/securities-act" className="flex justify-between items-center hover:text-primary">
                      <span className="font-medium">Securities Act</span>
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/laws/competition-act" className="flex justify-between items-center hover:text-primary">
                      <span className="font-medium">Competition Act</span>
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    View All Corporate Laws
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-beige-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Recently Updated Laws</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <ul className="divide-y divide-beige-100">
                {[1, 2, 3, 4, 5].map((item) => (
                  <li key={item} className="p-4 hover:bg-beige-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Companies (Amendment) Act, 2023</h3>
                        <p className="text-sm text-gray-600">Updated on January 15, 2023</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Download className="h-4 w-4 mr-1" /> Download
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center mt-8">
              <Button className="bg-primary hover:bg-beige-600 text-white">View All Updates</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
