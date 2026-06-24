"use client"

import { useMemo, useState } from "react"

import {
  AlertTriangle,
  CheckCircle2,
  Save,
} from "lucide-react"

export default function MangoSizeQCForm() {

  /*
  ==========================================
  STATE
  ==========================================
  */

  const [formData, setFormData] =
    useState({

      date: "",

      room: "",

      productType: "mahachanok",

      supplier: "",

      time: "",

      weight: "500",

      ph: "",

      brix: "",

      sensory: "",

      note: "",

      defects: {
        rotten: "",
        blackSpot: "",
        fiber: "",
        hardFiber: "",
        skin: "",
        stuck: "",
        others: "",
      },
    })

  /*
  ==========================================
  TOTAL DEFECT %
  ==========================================
  */

  const totalDefect = useMemo(() => {

    return Object.values(
      formData.defects
    ).reduce(
      (sum, value) =>
        sum + Number(value || 0),
      0
    )

  }, [formData.defects])

  /*
  ==========================================
  UPDATE DEFECT
  ==========================================
  */

  const updateDefect = (
    key: keyof typeof formData.defects,
    value: string
  ) => {

    setFormData({
      ...formData,

      defects: {
        ...formData.defects,
        [key]: value,
      },
    })
  }

  return (

    <div className="w-full p-6">

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm max-w-[1500px] mx-auto p-10">

        {/* HEADER */}
        <div className="flex flex-col xl:flex-row justify-between gap-5 border-b pb-6 mb-8">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              รายงานการตรวจสอบคุณภาพระหว่างการผลิตมะม่วง
            </h1>

            <p className="text-gray-500 mt-2">
              WS-QC-017 | Revision 03
            </p>

          </div>

          <div className="text-right text-sm text-gray-500">

            <p className="font-semibold text-slate-700">
              Swift Co Thailand
            </p>

            <p>
              Effective Date: 01/06/25
            </p>

          </div>

        </div>

        {/* SECTION 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          {/* DATE */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              ว/ด/ป
            </label>

            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  date: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-xl p-3"
            />

          </div>

          {/* ROOM */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              ห้อง
            </label>

            <select
              value={formData.room}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  room: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-xl p-3"
            >

              <option value="">
                เลือกห้อง
              </option>

              <option value="cutting">
                ห้องตัดแต่ง
              </option>

              <option value="packing">
                ห้องบรรจุลงถุง
              </option>

            </select>

          </div>

          {/* PRODUCT */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              พันธุ์มะม่วง
            </label>

            <select
              value={formData.productType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  productType: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-xl p-3"
            >

              <option value="mahachanok">
                มหาชนก
              </option>

              <option value="namdokmai">
                น้ำดอกไม้
              </option>

              <option value="kaewkamin">
                แก้วขมิ้น
              </option>

              <option value="sauce">
                ซอสมะม่วง
              </option>

            </select>

          </div>

          {/* SUPPLIER */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              ผู้ส่ง / Supplier
            </label>

            <input
              type="text"
              value={formData.supplier}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  supplier: e.target.value,
                })
              }
              placeholder="ระบุชื่อผู้ส่ง"
              className="w-full border border-gray-300 rounded-xl p-3"
            />

          </div>

        </div>

        {/* SECTION 2 */}
        <div className="mb-8">

          <h2 className="text-lg font-bold text-slate-700 border-l-4 border-blue-600 pl-3 mb-5">
            ข้อมูลผลการตรวจ
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 bg-slate-100 p-5 rounded-2xl">

            {/* TIME */}
            <div>

              <label className="block text-sm text-gray-700 mb-2">
                เวลา
              </label>

              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    time: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-xl p-3"
              />

            </div>

            {/* WEIGHT */}
            <div>

              <label className="block text-sm text-gray-700 mb-2">
                น้ำหนัก (g)
              </label>

              <input
                type="number"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    weight: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-xl p-3"
              />

            </div>

            {/* PH */}
            <div>

              <label className="block text-sm text-gray-700 mb-2">
                pH
              </label>

              <input
                type="number"
                step="0.1"
                value={formData.ph}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ph: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-xl p-3"
              />

            </div>

            {/* BRIX */}
            <div>

              <label className="block text-sm text-gray-700 mb-2">
                Brix (°)
              </label>

              <input
                type="number"
                step="0.1"
                value={formData.brix}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    brix: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-xl p-3"
              />

            </div>

            {/* SENSORY */}
            <div className="col-span-2">

              <label className="block text-sm text-gray-700 mb-2">
                Sensory Test
              </label>

              <select
                value={formData.sensory}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sensory: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-xl p-3"
              >

                <option value="">
                  ผลการประเมิน
                </option>

                <option value="+++">
                  +++ (Very Good)
                </option>

                <option value="++">
                  ++ (Good)
                </option>

                <option value="+">
                  + (Fair)
                </option>

                <option value="R">
                  R (Reject)
                </option>

              </select>

            </div>

          </div>

        </div>

        {/* SECTION 3 */}
        <div className="mb-8">

          <h2 className="text-lg font-bold text-slate-700 border-b pb-3 mb-5">
            Defect (%)
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-4">

            {[
              {
                key: "rotten",
                label: "เน่า (%)",
              },
              {
                key: "blackSpot",
                label: "จุดสีดำ (%)",
              },
              {
                key: "fiber",
                label: "เป็นเสี้ยน (%)",
              },
              {
                key: "hardFiber",
                label: "เส้นใยแข็ง (%)",
              },
              {
                key: "skin",
                label: "เปลือกติด (%)",
              },
              {
                key: "stuck",
                label: "ชิ้นติดกัน (%)",
              },
              {
                key: "others",
                label: "อื่นๆ (%)",
              },
            ].map((item) => (

              <div key={item.key}>

                <label className="block text-xs text-gray-600 mb-2">
                  {item.label}
                </label>

                <input
                  type="number"
                  value={
                    formData.defects[
                    item.key as keyof typeof formData.defects
                    ]
                  }
                  onChange={(e) =>
                    updateDefect(
                      item.key as keyof typeof formData.defects,
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-300 rounded-lg p-2"
                />

              </div>
            ))}

          </div>

          {/* TOTAL DEFECT */}
          <div
            className={`mt-5 rounded-2xl p-4 flex items-center gap-3 font-semibold ${
              totalDefect >= 10
                ? "bg-red-50 border border-red-200 text-red-700"
                : "bg-emerald-50 border border-emerald-200 text-emerald-700"
            }`}
          >

            {totalDefect >= 10 ? (
              <AlertTriangle className="w-5 h-5" />
            ) : (
              <CheckCircle2 className="w-5 h-5" />
            )}

            Defect รวม: {totalDefect}%{" "}

            {totalDefect >= 10
              ? "(เกินเกณฑ์)"
              : "(ผ่านเกณฑ์)"}

          </div>

        </div>

        {/* NOTE */}
        <div className="mb-8">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            หมายเหตุ
          </label>

          <textarea
            rows={4}
            value={formData.note}
            onChange={(e) =>
              setFormData({
                ...formData,
                note: e.target.value,
              })
            }
            placeholder="ระบุรายละเอียดเพิ่มเติม..."
            className="w-full border border-gray-300 rounded-2xl p-4 resize-none"
          />

        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center border-t pt-6">

          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-blue-700">

            <strong>ข้อกำหนด:</strong>{" "}
            ห้องตัดแต่งตรวจทุก 30 นาที /
            ห้องบรรจุตรวจทุก 1 ชม.
            (ครั้งละ 500g)

          </div>

          <div className="flex gap-3">

            <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition">

              Clear

            </button>

            <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-sm">

              <Save className="w-5 h-5" />

              Save Record

            </button>

          </div>

        </div>

      </div>

    </div>
  )
}