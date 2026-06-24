"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Building2, ArrowLeft, Car, CheckCircle2, Users, Clock, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Mock queue data - replace with actual data from database
const MOCK_TOTAL_QUEUES = 12
const MOCK_CURRENT_QUEUE = 5

export default function BookingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    licensePlate: "",
    name: "",
    phone: ""
  })

  // Queue state
  const [queueInfo, setQueueInfo] = useState({
    currentQueue: MOCK_CURRENT_QUEUE,
    totalQueues: MOCK_TOTAL_QUEUES,
    myQueueNumber: 0
  })

  // Simulate queue updates
  useEffect(() => {
    if (isSuccess && queueInfo.myQueueNumber > 0) {
      const interval = setInterval(() => {
        setQueueInfo(prev => {
          if (prev.currentQueue < prev.myQueueNumber) {
            return { ...prev, currentQueue: prev.currentQueue + 1 }
          }
          return prev
        })
      }, 5000) // Update every 5 seconds for demo
      return () => clearInterval(interval)
    }
  }, [isSuccess, queueInfo.myQueueNumber])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate booking - replace with actual booking logic
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Assign queue number
    const newQueueNumber = queueInfo.totalQueues + 1
    setQueueInfo(prev => ({
      ...prev,
      totalQueues: newQueueNumber,
      myQueueNumber: newQueueNumber
    }))

    setIsLoading(false)
    setIsSuccess(true)
  }

  const handleNewBooking = () => {
    setIsSuccess(false)
    setFormData({ licensePlate: "", name: "", phone: "" })
    setQueueInfo(prev => ({ ...prev, myQueueNumber: 0 }))
  }

  const queuesAhead = queueInfo.myQueueNumber - queueInfo.currentQueue
  const isMyTurn = queueInfo.myQueueNumber > 0 && queueInfo.currentQueue >= queueInfo.myQueueNumber

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <img
                src="/logo.png"
                alt="logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-bold text-foreground">Swift Co Thailand</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              กลับหน้าหลัก
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md space-y-4">
          {/* Queue Status Card */}
          <Card className="shadow-md border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">คิวปัจจุบัน</p>
                    <p className="text-3xl font-bold text-primary">{queueInfo.currentQueue}</p>
                  </div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">คิวทั้งหมด</p>
                  <p className="text-3xl font-bold text-foreground">{queueInfo.totalQueues}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>รอคิวประมาณ {(queueInfo.totalQueues - queueInfo.currentQueue) * 5} นาที</span>
              </div>
            </CardContent>
          </Card>

          {/* Booking Form / Success Card */}
          <Card className="shadow-lg">
            {!isSuccess ? (
              <>
                <CardHeader className="text-center space-y-2">
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Car className="w-7 h-7 text-accent" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">จองคิวรถ</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    กรุณากรอกข้อมูลเพื่อจองคิวนำรถเข้า
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="licensePlate">ทะเบียนรถ <span className="text-destructive">*</span></Label>
                      <Input
                        id="licensePlate"
                        type="text"
                        placeholder="เช่น กข 1234 กรุงเทพฯ"
                        value={formData.licensePlate}
                        onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
                        required
                        className="h-11"
                      />
                      <p className="text-xs text-muted-foreground">กรุณาระบุทะเบียนรถพร้อมจังหวัด</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">ชื่อ-นามสกุล <span className="text-destructive">*</span></Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="ชื่อและนามสกุลของคุณ"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">เบอร์โทรศัพท์ <span className="text-destructive">*</span></Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="0xx-xxx-xxxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="h-11"
                        pattern="[0-9]{9,10}"
                        title="กรุณากรอกเบอร์โทรศัพท์ 9-10 หลัก"
                      />
                      <p className="text-xs text-muted-foreground">สำหรับติดต่อกลับเมื่อถึงคิวของท่าน</p>
                    </div>

                    <Button type="submit" className="w-full h-11 bg-accent hover:bg-accent/90 text-accent-foreground mt-2" disabled={isLoading}>
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                          กำลังจองคิว...
                        </span>
                      ) : (
                        "จองคิว"
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 pt-6 border-t">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium text-sm text-foreground mb-2">หมายเหตุ:</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>- กรุณานำรถมาก่อนเวลานัดหมายอย่างน้อย 10 นาที</li>
                        <li>- นำบัตรประชาชนมาแสดงในวันนัดหมาย</li>
                        <li>- หากไม่สามารถมาได้ กรุณาแจ้งล่วงหน้า</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <>
                <CardHeader className="text-center space-y-2">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-10 h-10 text-accent" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">จองคิวสำเร็จ!</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    ระบบได้บันทึกข้อมูลการจองของท่านเรียบร้อยแล้ว
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* My Queue Number */}
                  <div className={`rounded-xl p-6 mb-4 text-center ${isMyTurn ? 'bg-accent/20 border-2 border-accent' : 'bg-primary/10'}`}>
                    <p className="text-sm text-muted-foreground mb-1">หมายเลขคิวของท่าน</p>
                    <p className={`text-5xl font-bold ${isMyTurn ? 'text-accent' : 'text-primary'}`}>
                      {queueInfo.myQueueNumber}
                    </p>
                    {isMyTurn ? (
                      <div className="mt-3 flex items-center justify-center gap-2 text-accent">
                        <Bell className="w-5 h-5 animate-bounce" />
                        <span className="font-semibold">ถึงคิวของท่านแล้ว!</span>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground mt-2">
                        รอคิวอีก <span className="font-bold text-foreground">{queuesAhead}</span> คิว
                      </p>
                    )}
                  </div>

                  {/* Queue Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">ความคืบหน้า</span>
                      <span className="font-medium text-foreground">
                        คิวที่ {queueInfo.currentQueue} / {queueInfo.myQueueNumber}
                      </span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${isMyTurn ? 'bg-accent' : 'bg-primary'}`}
                        style={{ width: `${Math.min((queueInfo.currentQueue / queueInfo.myQueueNumber) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="bg-muted/50 rounded-lg p-4 mb-6">
                    <h4 className="font-medium text-sm text-foreground mb-3">ข้อมูลการจอง</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ทะเบียนรถ:</span>
                        <span className="font-medium text-foreground">{formData.licensePlate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ชื่อ:</span>
                        <span className="font-medium text-foreground">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">เบอร์โทร:</span>
                        <span className="font-medium text-foreground">{formData.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button onClick={handleNewBooking} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      จองคิวใหม่
                    </Button>
                    <Link href="/" className="block">
                      <Button variant="outline" className="w-full">
                        กลับหน้าหลัก
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 Swift Co Thailand. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
