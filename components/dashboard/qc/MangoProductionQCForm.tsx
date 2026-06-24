"use client"

import { Save } from "lucide-react"
import { useMemo, useState } from "react"

type RowData = {
  farmer: string
  ph: string
  brix: string
  result: string
  inspector: string
  reviewer: string
  note: string
}

const specMap = {
  มหาชนก: {
    ph: "3.9-4.3",
    brix: "≥ 13",
    defect: "< 10%",
  },
  น้ำดอกไม้: {
    ph: "4.0-4.4",
    brix: "≥ 13",
    defect: "< 10%",
  },
  แก้วขมิ้น: {
    ph: "4.4-4.8",
    brix: "≥ 13",
    defect: "< 10%",
  },
}

export default function MangoProductionQCForm() {

  /*
  ==========================================
  STATE
  ==========================================
  */

  const [mangoType, setMangoType] =
    useState("มหาชนก")

  const [rows, setRows] = useState<RowData[]>(
    Array.from({ length: 25 }, () => ({
      farmer: "",
      ph: "",
      brix: "",
      result: "P",
      inspector: "",
      reviewer: "",
      note: "",
    }))
  )

  /*
  ==========================================
  SPEC INFO
  ==========================================
  */

  const currentSpec = useMemo(() => {
    return specMap[
      mangoType as keyof typeof specMap
    ]
  }, [mangoType])

  /*
  ==========================================
  UPDATE TABLE
  ==========================================
  */

  const updateRow = (
    index: number,
    field: keyof RowData,
    value: string
  ) => {
    const updated = [...rows]

    updated[index][field] = value

    setRows(updated)
  }

  return (
    <div className="w-full h-full overflow-y-auto">

      <div className="max-w-[1600px] mx-auto p-6">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-4 border-b pb-4 mb-6">

          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              รายงานการตรวจสอบคุณภาพผลไม้หลังบ่ม
            </h2>

            <p className="text-sm text-gray-500 italic mt-2">
              WS-QC-112 | Revision 00 |
              Effective Date: 05/02/26
            </p>
          </div>

          <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow-sm transition">
            <Save className="w-5 h-5" />

            บันทึกข้อมูลทั้งหมด
          </button>

        </div>

        {/* FILTER */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200">

          {/* DATE */}
          <div>

            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
              วันที่ตรวจสอบ
            </label>

            <input
              type="date"
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          {/* MANGO TYPE */}
          <div>

            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
              สายพันธุ์
            </label>

            <select
              value={mangoType}
              onChange={(e) =>
                setMangoType(e.target.value)
              }
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="มหาชนก">
                มหาชนก
              </option>

              <option value="น้ำดอกไม้">
                น้ำดอกไม้
              </option>

              <option value="แก้วขมิ้น">
                แก้วขมิ้น
              </option>

            </select>

          </div>

          {/* SPEC */}
          <div className="lg:col-span-2">

            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
              เกณฑ์ควบคุม (Specification)
            </label>

            <div className="bg-blue-100 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl text-sm font-medium">

              {mangoType}: ค่า pH{" "}
              {currentSpec.ph} | ค่า Brix{" "}
              {currentSpec.brix} |
              ตำหนิรวม{" "}
              {currentSpec.defect}

            </div>

          </div>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">

          <table className="w-full border-collapse bg-white min-w-[1200px]">

            <thead>

              <tr className="bg-slate-800 text-white text-sm">

                <th className="p-3 border-r border-slate-700 text-center w-14">
                  ลำดับ
                </th>

                <th className="p-3 border-r border-slate-700 min-w-[220px]">
                  ชื่อ-รหัส เกษตรกร
                </th>

                <th className="p-3 border-r border-slate-700 w-28 text-center">
                  ค่า pH
                </th>

                <th className="p-3 border-r border-slate-700 w-28 text-center">
                  ค่า Brix
                </th>

                <th className="p-3 border-r border-slate-700 w-36 text-center">
                  ผลตรวจสอบ
                </th>

                <th className="p-3 border-r border-slate-700 w-52 text-center">
                  ผู้ตรวจสอบ/ทวนสอบ
                </th>

                <th className="p-3">
                  หมายเหตุ
                </th>

              </tr>

            </thead>

            <tbody className="text-sm">

              {rows.map((row, index) => (

                <tr
                  key={index}
                  className="border-b hover:bg-slate-50 transition"
                >

                  {/* INDEX */}
                  <td className="p-2 text-center text-gray-400 font-medium border-r">
                    {index + 1}
                  </td>

                  {/* FARMER */}
                  <td className="p-1 border-r">

                    <input
                      type="text"
                      value={row.farmer}
                      onChange={(e) =>
                        updateRow(
                          index,
                          "farmer",
                          e.target.value
                        )
                      }
                      className="w-full p-2 rounded-lg outline-none focus:bg-yellow-50"
                      placeholder="..."
                    />

                  </td>

                  {/* PH */}
                  <td className="p-1 border-r">

                    <input
                      type="number"
                      step="0.1"
                      value={row.ph}
                      onChange={(e) =>
                        updateRow(
                          index,
                          "ph",
                          e.target.value
                        )
                      }
                      className="w-full p-2 rounded-lg text-center outline-none focus:bg-yellow-50"
                      placeholder="0.0"
                    />

                  </td>

                  {/* BRIX */}
                  <td className="p-1 border-r">

                    <input
                      type="number"
                      step="0.1"
                      value={row.brix}
                      onChange={(e) =>
                        updateRow(
                          index,
                          "brix",
                          e.target.value
                        )
                      }
                      className="w-full p-2 rounded-lg text-center outline-none focus:bg-yellow-50"
                      placeholder="0.0"
                    />

                  </td>

                  {/* RESULT */}
                  <td className="p-1 border-r">

                    <select
                      value={row.result}
                      onChange={(e) =>
                        updateRow(
                          index,
                          "result",
                          e.target.value
                        )
                      }
                      className={`w-full p-2 rounded-lg text-center outline-none ${
                        row.result === "P"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >

                      <option value="P">
                        P (ผ่าน)
                      </option>

                      <option value="F">
                        ไม่ผ่าน
                      </option>

                    </select>

                  </td>

                  {/* INSPECTOR */}
                  <td className="p-1 border-r">

                    <div className="space-y-1">

                      <input
                        type="text"
                        value={row.inspector}
                        onChange={(e) =>
                          updateRow(
                            index,
                            "inspector",
                            e.target.value
                          )
                        }
                        className="w-full p-1 border-b outline-none"
                        placeholder="ผู้ตรวจ"
                      />

                      <input
                        type="text"
                        value={row.reviewer}
                        onChange={(e) =>
                          updateRow(
                            index,
                            "reviewer",
                            e.target.value
                          )
                        }
                        className="w-full p-1 outline-none"
                        placeholder="ผู้ทวน"
                      />

                    </div>

                  </td>

                  {/* NOTE */}
                  <td className="p-1">

                    <input
                      type="text"
                      value={row.note}
                      onChange={(e) =>
                        updateRow(
                          index,
                          "note",
                          e.target.value
                        )
                      }
                      className="w-full p-2 rounded-lg outline-none"
                      placeholder="-"
                    />

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}