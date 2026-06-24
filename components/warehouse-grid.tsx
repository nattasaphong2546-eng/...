"use client"

import { useState } from "react"
import { X, Package, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ShelfData {
  productName: string
  quantity: string
  lot: string
  expiryDate: string
}

interface CellData {
  [shelf: number]: ShelfData
}

interface WarehouseData {
  [cellId: string]: CellData
}

export default function WarehouseGrid() {
  const [selectedCell, setSelectedCell] = useState<string | null>(null)
  const [selectedShelf, setSelectedShelf] = useState<number | null>(null)
  const [warehouseData, setWarehouseData] = useState<WarehouseData>({})
  const [formData, setFormData] = useState<ShelfData>({
    productName: "",
    quantity: "",
    lot: "",
    expiryDate: "",
  })

  const shelves = [1, 2, 3, 4] // 4
  const handleCellClick = (cellId: string) => {
    setSelectedCell(cellId)

    const defaultShelf = 1
    setSelectedShelf(defaultShelf)

    const existingData = warehouseData[cellId]?.[defaultShelf]

    if (existingData) {
      setFormData(existingData)
    } else {
      setFormData({
        productName: "",
        quantity: "",
        lot: "",
        expiryDate: "",
      })
    }
  }

  const handleShelfSelect = (shelf: number) => {
    setSelectedShelf(shelf)
    const existingData = warehouseData[selectedCell!]?.[shelf]
    if (existingData) {
      setFormData(existingData)
    } else {
      setFormData({
        productName: "",
        quantity: "",
        lot: "",
        expiryDate: "",
      })
    }
  }

  const handleSave = () => {
    if (selectedCell && selectedShelf) {
      setWarehouseData((prev) => ({
        ...prev,
        [selectedCell]: {
          ...prev[selectedCell],
          [selectedShelf]: formData,
        },
      }))
      setSelectedCell(null)
      setSelectedShelf(null)
    }
  }

  const getCellStatus = (cellId: string) => {
    const cellData = warehouseData[cellId]
    if (!cellData) return "empty"
    const filledShelves = Object.keys(cellData).length
    if (filledShelves === 5) return "full"
    if (filledShelves > 0) return "partial"
    return "empty"
  }

  const getCellColor = (cellId: string) => {
    const status = getCellStatus(cellId)
    switch (status) {
      case "full":
        return "bg-green-100 border-green-400 hover:bg-green-200"
      case "partial":
        return "bg-amber-100 border-amber-400 hover:bg-amber-200"
      default:
        return "bg-white border-border hover:bg-muted"
    }
  }

  const renderGrid = (
    rows: number,
    cols: number,
    prefix: string,
    startRow = 0
  ) => {
    const cells = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cellId = `${prefix}-R${startRow + r + 1}C${c + 1}`
        cells.push(
          <button
            key={cellId}
            onClick={() => handleCellClick(cellId)}
            // เพิ่ม w-12 h-12 เพื่อขยายขนาดปุ่มให้กดง่ายขึ้น (สามารถเปลี่ยนเป็น w-14 h-14 หรือ w-16 h-16 ได้ถ้าต้องการให้ใหญ่กว่านี้)
            className={`w-12 h-12 sm:w-14 sm:h-14 aspect-square border-2 rounded-lg transition-all duration-200 flex items-center justify-center text-xs font-medium ${getCellColor(
              cellId
            )}`}
            title={cellId}
          >
            {getCellStatus(cellId) !== "empty" && (
              <Package className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        )
      }
    }
    return cells
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          แผนผังคลังสินค้า
        </h2>
        <p className="text-sm text-muted-foreground">
          คลิกที่ช่องเพื่อเลือกชั้นวางและกรอกข้อมูลสินค้า
        </p>

        {/* Legend */}
        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-border bg-white rounded"></div>
            <span className="text-xs text-muted-foreground">ว่าง</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-amber-400 bg-amber-100 rounded"></div>
            <span className="text-xs text-muted-foreground">มีบางส่วน</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-green-400 bg-green-100 rounded"></div>
            <span className="text-xs text-muted-foreground">เต็ม</span>
          </div>
        </div>
      </div>

      {/* Warehouse Layout */}
      <div className="bg-muted/30 rounded-xl p-6 border border-border">
        {/* Top Section */}
        <div className="flex gap-8 mb-8">
          {/* Left Top - Zone A (4x4) */}
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-2">
              โซน A
            </div>
            <div className="grid grid-cols-4 gap-2 w-fit">
              {renderGrid(4, 4, "A")}
            </div>
          </div>

          {/* Right Top - Zone B (5x4) */}
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-2">
              โซน B
            </div>
            <div className="grid grid-cols-5 gap-2 w-fit">
              {renderGrid(4, 5, "B")}
            </div>
          </div>
        </div>

        {/* Bottom Section - Zone C (9x2) */}
        <div>
          <div className="text-sm font-medium text-muted-foreground mb-2">
            โซน C
          </div>
          <div className="grid grid-cols-9 gap-2 w-fit">
            {renderGrid(2, 9, "C")}
          </div>
        </div>
      </div>

      {/* Modal for selecting shelf and entering data */}
      {selectedCell && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">
                ตำแหน่ง: {selectedCell}
              </CardTitle>
              <button
                onClick={() => {
                  setSelectedCell(null)
                  setSelectedShelf(null)
                }}
                className="p-1 hover:bg-muted rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent>
              {/* Shelf Selection */}
              {!selectedShelf ? (
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    เลือกชั้นที่ต้องการกรอกข้อมูล
                  </p>
                  <div className="flex flex-col gap-2">
                    {shelves.map((shelf) => {
                      const hasData = warehouseData[selectedCell]?.[shelf]
                      return (
                        <button
                          key={shelf}
                          onClick={() => handleShelfSelect(shelf)}
                          className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${hasData
                            ? "border-green-400 bg-green-50"
                            : "border-border hover:border-primary hover:bg-muted"
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <Layers className="w-5 h-5 text-muted-foreground" />
                            <span className="font-medium">ชั้นที่ {shelf}</span>
                          </div>
                          {hasData && (
                            <span className="text-xs text-green-600 font-medium">
                              มีข้อมูล
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => setSelectedShelf(null)}
                    className="text-sm text-primary hover:underline mb-4"
                  >
                    ← กลับไปเลือกชั้น
                  </button>

                  <div className="space-y-4">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <span className="text-sm font-medium">
                        กรอกข้อมูล: ชั้นที่ {selectedShelf}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          ชื่อสินค้า
                        </label>
                        <Input
                          placeholder="กรอกชื่อสินค้า"
                          value={formData.productName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              productName: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          จำนวน
                        </label>
                        <Input
                          placeholder="กรอกจำนวน"
                          value={formData.quantity}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              quantity: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          Lot Number
                        </label>
                        <Input
                          placeholder="กรอก Lot Number"
                          value={formData.lot}
                          onChange={(e) =>
                            setFormData({ ...formData, lot: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          วันหมดอายุ
                        </label>
                        <Input
                          type="date"
                          value={formData.expiryDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              expiryDate: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setSelectedCell(null)
                          setSelectedShelf(null)
                        }}
                      >
                        ยกเลิก
                      </Button>
                      <Button className="flex-1" onClick={handleSave}>
                        บันทึก
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
