"use client"

import { useState, useEffect } from "react"
import {
  ChevronRight,
  Menu,
  Clock,
  LogOut,
} from "lucide-react"

import Link from "next/link"

import WarehouseGrid from "@/components/dashboard/WarehouseGrid"
import RawMaterialQCForm from "@/components/dashboard/qc/RawMaterialQCForm"
import MangoProductionQCForm from "@/components/dashboard/qc/MangoProductionQCForm"
import MangoSizeQCForm from "@/components/dashboard/qc/MangoSizeQCForm"

interface Department {
  name: string
  sections: string[]
}

const departments: Department[] = [
  {
    name: "ฝ่ายผลิต",
    sections: [
      "ลงและบ่มมะม่วง",
      "คัดมะม่วง",
      "เตรียผลิตมะม่วง",
      "หันและตัดแต่ง",
    ],
  },
  {
    name: "ฝ่าย QC",
    sections: [
      "ตรวจสอบคุณภาพวัตถุดิบ",
      "ตรวจสอบคุณภาพระหว่างการผลิตมะม่วง",
      "ตรวจสอบขนาดมะม่วง",
    ],
  },
  {
    name: "ฝ่ายคลัง",
    sections: ["คลังสินค้า"],
  },
]

type ContentProps = {
  selectedDept: string
  selectedSection: string
}

function EmptyState({
  selectedDept,
  selectedSection,
}: ContentProps) {
  return (
    <div className="text-muted-foreground text-center py-20 p-6">
      <h2 className="text-xl font-semibold text-foreground mb-2">
        {selectedDept} - {selectedSection}
      </h2>

      <p>เลือกแผนกจากเมนูด้านซ้ายเพื่อดูข้อมูล</p>
    </div>
  )
}

export default function DashboardPage() {
  const [expandedDepts, setExpandedDepts] = useState<string[]>([
    "ฝ่ายผลิต",
    "ฝ่าย QC",
    "ฝ่ายคลัง",
  ])

  const [selectedSection, setSelectedSection] =
    useState<string>("ตรวจสอบคุณภาพวัตถุดิบ")

  const [selectedDept, setSelectedDept] =
    useState<string>("ฝ่าย QC")

  const [currentTime, setCurrentTime] =
    useState<string>("")

  const [userEmail] = useState(
  "test@company.com"
)

  const [sidebarOpen, setSidebarOpen] =
    useState(true)

  const username =
  userEmail.split("@")[0]

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()

      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      )
    }

    updateTime()

    const interval = setInterval(updateTime, 60000)

    return () => clearInterval(interval)
  }, [])

  const toggleDept = (deptName: string) => {
    setExpandedDepts((prev) =>
      prev.includes(deptName)
        ? prev.filter((d) => d !== deptName)
        : [...prev, deptName]
    )
  }

  const handleSectionClick = (
    deptName: string,
    sectionName: string
  ) => {
    setSelectedDept(deptName)
    setSelectedSection(sectionName)
  }

  /*
    ==========================================
    SECTION COMPONENT MAP (PRO VERSION)
    ==========================================
  */

  const sectionComponents: Record<
  string,
  React.ReactNode
> = {

  คลังสินค้า: <WarehouseGrid />,

  ตรวจสอบคุณภาพวัตถุดิบ: (
    <RawMaterialQCForm />
  ),

  ตรวจสอบคุณภาพระหว่างการผลิตมะม่วง: (
    <MangoProductionQCForm />
  ),

  ตรวจสอบขนาดมะม่วง: (
    <MangoSizeQCForm />
  ),


}

  return (
    <div className="flex h-screen overflow-hidden bg-muted/50">
      {/* ==========================================
          SIDEBAR
      ========================================== */}

      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-0"
        } transition-all duration-300 overflow-hidden`}
      >
        <div className="w-72 h-screen bg-slate-900 text-white flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
            <button
              onClick={() =>
                setSidebarOpen(!sidebarOpen)
              }
              className="p-1 hover:bg-white/10 rounded transition"
            >
              <Menu className="w-5 h-5" />
            </button>

            <span className="font-semibold">
              Swift Co Thailand
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-2 overflow-y-auto">
            {departments.map((dept) => (
              <div key={dept.name}>
                {/* Department */}
                <button
                  onClick={() =>
                    toggleDept(dept.name)
                  }
                  className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-white/10 transition"
                >
                  <ChevronRight
                    className={`w-4 h-4 transition ${
                      expandedDepts.includes(dept.name)
                        ? "rotate-90"
                        : ""
                    }`}
                  />

                  <span className="text-sm font-medium">
                    {dept.name}
                  </span>
                </button>

                {/* Sections */}
                {expandedDepts.includes(dept.name) && (
                  <div className="ml-4">
                    {dept.sections.map((section) => {
                      const isSelected =
                        selectedDept === dept.name &&
                        selectedSection === section

                      return (
                        <button
                          key={`${dept.name}-${section}`}
                          onClick={() =>
                            handleSectionClick(
                              dept.name,
                              section
                            )
                          }
                          className={`w-full text-left px-4 py-2 text-sm transition ${
                            isSelected
                              ? "bg-blue-600"
                              : "hover:bg-white/10"
                          }`}
                        >
                          {section}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Logout */}
          <div className="border-t border-white/10 p-4">
            <Link
              href="/"
              className="flex items-center gap-2 hover:text-red-400 transition"
            >
              <LogOut className="w-4 h-4" />

              <span className="text-sm">
                ออกจากระบบ
              </span>
            </Link>
          </div>
        </div>
      </aside>

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-6 py-4">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-muted rounded-lg transition"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div className="flex-1" />

          <div className="flex items-center gap-6">
            {/* Auto Save */}
            <div className="flex items-center gap-2 text-accent">
              <Clock className="w-5 h-5" />

              <span className="text-sm font-medium">
                Last Auto-Save: {currentTime}
              </span>
            </div>

            {/* User */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center">
                <span className="text-foreground font-bold uppercase">
                  {username.charAt(0)}
              </span>
              </div>

              <span className="font-medium text-foreground">
                {username}
              </span>

            </div>
          </div>
        </header>

        {/* ==========================================
            CONTENT AREA
        ========================================== */}

        <div className="flex-1 px-6 pb-6 overflow-hidden">
          <div className="bg-card rounded-2xl h-full shadow-sm overflow-y-auto overflow-x-hidden">
            {sectionComponents[selectedSection] ?? (
              <EmptyState
                selectedDept={selectedDept}
                selectedSection={selectedSection}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}