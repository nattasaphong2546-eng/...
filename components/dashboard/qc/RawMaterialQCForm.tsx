"use client"

import { useState } from "react"

import {
  CheckCircle2,
  FilePlus2,
  Save,
  XCircle,
} from "lucide-react"

export default function RawMaterialQCForm() {

  /*
  ==========================================
  STATE
  ==========================================
  */

  const [baseWeight, setBaseWeight] =
    useState("")

  const [goodWeight, setGoodWeight] =
    useState("")

  const [defects, setDefects] = useState({
    blackSpot: "",
    bruise: "",
    crack: "",
    ripe: "",
    insect: "",
    rotten: "",
  })

  /*
  ==========================================
  CALCULATE %
  ==========================================
  */

  const calculatePercent = (weight: string) => {
    const base = parseFloat(baseWeight)
    const value = parseFloat(weight)

    if (!base || !value) return ""

    return ((value / base) * 100).toFixed(2)
  }

  return (
  <div className="w-full h-full p-6 overflow-y-auto">

    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 max-w-[1450px] mx-auto p-10">
    
      {/* HEADER */}
      <div className="border-b border-gray-200 pb-4 mb-8 flex justify-between items-end">

        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            รายงานการตรวจสอบคุณภาพวัตถุดิบ
          </h2>

          <p className="text-gray-500 text-lg mt-2">
            WS-QC-035 | Revision 00
          </p>
        </div>

        <button className="bg-blue-50 hover:bg-blue-100 transition text-blue-700 px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
          <FilePlus2 className="w-5 h-5" />
          สร้างเอกสารใหม่
        </button>

      </div>

      <form className="space-y-10 pb-10">

        {/* SECTION 1 */}
        <fieldset>

          <legend className="text-2xl font-semibold text-slate-800 mb-6 flex items-center border-b pb-4 w-full">

            <span className="bg-slate-100 w-10 h-10 rounded-lg flex items-center justify-center text-blue-600 mr-4 text-lg">
              1
            </span>

            ข้อมูลการรับเข้าและผู้จัดส่ง

          </legend>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                วัน/เดือน/ปี
              </label>

              <input
                type="date"
                className="w-full border border-gray-300 rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                เวลา
              </label>

              <input
                type="time"
                className="w-full border border-gray-300 rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                ทะเบียนรถ
              </label>

              <input
                type="text"
                placeholder="ระบุทะเบียนรถ"
                className="w-full border border-gray-300 rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                คันที่
              </label>

              <input
                type="number"
                className="w-full border border-gray-300 rounded-xl p-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 mb-2">
                วัตถุดิบ
              </label>

              <input
                type="text"
                placeholder="ระบุชื่อวัตถุดิบ"
                className="w-full border border-gray-300 rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                หัวหน้ากลุ่ม
              </label>

              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                ชื่อผู้ปลูก
              </label>

              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                รหัส
              </label>

              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                อุณหภูมิรับเข้า (°C)
              </label>

              <input
                type="number"
                className="w-full border border-gray-300 rounded-xl p-3"
              />
            </div>

          </div>

        </fieldset>

        {/* SECTION 2 */}
        <fieldset>

          <legend className="text-2xl font-semibold text-slate-800 mb-6 flex items-center border-b pb-4 w-full">

            <span className="bg-slate-100 w-10 h-10 rounded-lg flex items-center justify-center text-blue-600 mr-4 text-lg">
              2
            </span>

            การตรวจสภาพเบื้องต้น

          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                ลักษณะปรากฏ
              </label>

              <select className="w-full border border-gray-300 rounded-xl p-3">
                <option>ปกติ</option>
                <option>ผิดปกติ</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                สภาพรถขนส่ง
              </label>

              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                สภาพการบรรจุ
              </label>

              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                สิ่งแปลกปลอม
              </label>

              <input
                type="text"
                placeholder="ระบุหากพบ"
                className="w-full border border-gray-300 rounded-xl p-3"
              />
            </div>

          </div>

        </fieldset>

        {/* SECTION 3 */}
        <fieldset className="bg-blue-50/50 p-8 rounded-2xl border border-blue-100">

          <legend className="text-2xl font-semibold text-slate-800 mb-6 px-2 flex items-center">

            <span className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center text-blue-700 mr-4 text-lg">
              3
            </span>

            น้ำหนักและการสุ่มตัวอย่าง

          </legend>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                จำนวนตะกร้า
              </label>

              <input
                type="number"
                className="w-full border border-gray-300 rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                น้ำหนักรับเข้า (kg)
              </label>

              <input
                type="number"
                className="w-full border border-gray-300 rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                ผลการสุ่มตัวอย่าง
              </label>

              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-2">
                น้ำหนักสุ่ม (kg) *ฐานคำนวณ
              </label>

              <input
                type="number"
                placeholder="ระบุน้ำหนัก"
                value={baseWeight}
                onChange={(e) =>
                  setBaseWeight(e.target.value)
                }
                className="w-full border-2 border-blue-400 rounded-xl p-3 bg-white"
              />
            </div>

          </div>

        </fieldset>

        {/* SECTION 4 */}
        <fieldset>

          <legend className="text-2xl font-semibold text-slate-800 mb-6 flex items-center border-b pb-4 w-full">

            <span className="bg-slate-100 w-10 h-10 rounded-lg flex items-center justify-center text-blue-600 mr-4 text-lg">
              4
            </span>

            การประเมินคุณภาพ (QC)

          </legend>

          {/* GOOD */}
          <div className="mb-8 p-6 border border-emerald-200 bg-emerald-50/30 rounded-2xl">

            <h3 className="text-emerald-800 font-semibold mb-5 flex items-center gap-2 text-xl">
              <CheckCircle2 className="w-6 h-6" />

              ส่วนที่คาดว่าจะใช้ได้ตรงสเปก (ของดี)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">

              {/* GOOD KG */}
              <div>

                <label className="block text-sm text-emerald-700 mb-2">
                  น้ำหนัก (kg)
                </label>

                <input
                  type="number"
                  value={goodWeight}
                  onChange={(e) =>
                    setGoodWeight(e.target.value)
                  }
                  className="w-full border border-emerald-300 rounded-xl p-3"
                />

              </div>

              {/* GOOD % */}
              <div>

                <label className="block text-sm text-emerald-700 mb-2">
                  % (คำนวณอัตโนมัติ)
                </label>

                <input
                  type="text"
                  readOnly
                  value={`${calculatePercent(goodWeight)} %`}
                  className="w-full border border-emerald-200 rounded-xl p-3 bg-emerald-100/50"
                />

              </div>

            </div>

          </div>

          {/* DEFECT */}
          <div className="p-6 border border-rose-200 bg-rose-50/30 rounded-2xl">

            <h3 className="text-rose-700 font-semibold mb-6 flex items-center gap-2 text-xl">
              <XCircle className="w-6 h-6" />

              ตำหนิ / ส่วนที่ตกสเปค
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {[
                {
                  key: "blackSpot",
                  label: "จุดดำ/โรค",
                },
                {
                  key: "bruise",
                  label: "รอยช้ำ",
                },
                {
                  key: "crack",
                  label: "รอยแตก",
                },
                {
                  key: "ripe",
                  label: "สุก",
                },
                {
                  key: "insect",
                  label: "เพลี้ย",
                },
                {
                  key: "rotten",
                  label: "เน่า",
                },
              ].map((item, index) => (

                <div
                  key={item.key}
                  className="flex items-center gap-3"
                >

                  <label className="w-32 text-sm text-gray-700">
                    {index + 1}) {item.label}
                  </label>

                  {/* KG */}
                  <input
                    type="number"
                    placeholder="kg"
                    value={
                      defects[
                      item.key as keyof typeof defects
                      ]
                    }
                    onChange={(e) =>
                      setDefects({
                        ...defects,
                        [item.key]: e.target.value,
                      })
                    }
                    className="flex-1 border border-gray-300 rounded-xl p-2"
                  />

                  {/* % */}
                  <input
                    type="text"
                    readOnly
                    value={`${calculatePercent(
                      defects[
                      item.key as keyof typeof defects
                      ]
                    )} %`}
                    className="w-20 border border-gray-200 rounded-xl p-2 bg-white text-center"
                  />

                </div>
              ))}

            </div>

          </div>

        </fieldset>

        {/* SECTION 5 + 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* RESULT */}
          <fieldset className="p-6 border border-gray-200 rounded-2xl bg-slate-50">

            <legend className="text-2xl font-semibold text-slate-800 mb-6 px-2 flex items-center">

              <span className="bg-white border w-10 h-10 rounded-lg flex items-center justify-center text-blue-600 mr-4 text-lg shadow-sm">
                5
              </span>

              ผลการตรวจสอบ

            </legend>

            <div className="space-y-5">

              <label className="flex items-center gap-3">
                <input type="radio" name="result" />

                <span className="font-medium">
                  ยอมรับ (Accept)
                </span>
              </label>

              <div>

                <label className="flex items-center gap-3 mb-3">
                  <input type="radio" name="result" />

                  <span className="font-medium">
                    ยอมรับแบบมีเงื่อนไข
                  </span>
                </label>

                <div className="ml-7 space-y-3">

                  <input
                    type="text"
                    placeholder="เนื่องจาก..."
                    className="w-full border border-gray-300 rounded-xl p-3"
                  />

                  <input
                    type="text"
                    placeholder="การดำเนินการแก้ไข..."
                    className="w-full border border-gray-300 rounded-xl p-3"
                  />

                </div>

              </div>

              <div>

                <label className="flex items-center gap-3 mb-3">
                  <input type="radio" name="result" />

                  <span className="text-rose-600 font-medium">
                    ไม่ยอมรับ (Reject)
                  </span>
                </label>

                <div className="ml-7">

                  <input
                    type="text"
                    placeholder="เนื่องจาก..."
                    className="w-full border border-gray-300 rounded-xl p-3"
                  />

                </div>

              </div>

            </div>

          </fieldset>

          {/* SIGNATURE */}
          <fieldset className="p-6 border border-gray-200 rounded-2xl">

            <legend className="text-2xl font-semibold text-slate-800 mb-6 px-2 flex items-center">

              <span className="bg-slate-100 w-10 h-10 rounded-lg flex items-center justify-center text-blue-600 mr-4 text-lg">
                6
              </span>

              ลงนาม

            </legend>

            <div className="space-y-6">

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    ฝ่ายผลิต
                  </label>

                  <select className="w-full border border-gray-300 rounded-xl p-3">
                    <option>เลือกรายชื่อ...</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    ฝ่ายเกษตร
                  </label>

                  <select className="w-full border border-gray-300 rounded-xl p-3">
                    <option>เลือกรายชื่อ...</option>
                  </select>
                </div>

              </div>

            </div>

          </fieldset>

        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">

          <button
            type="reset"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            ล้างข้อมูล
          </button>

          <button
            type="button"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition flex items-center gap-2 shadow-md"
          >
            <Save className="w-5 h-5" />
            บันทึกข้อมูล
          </button>

        </div>

      </form>

    </div>
    </div>
  )
}