"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!supabase) {
      alert("ระบบยังไม่พร้อมใช้งาน กรุณาติดต่อผู้ดูแลระบบ")
      setIsLoading(false)
      return
    }

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    })

    if (error) {
      alert(error.message)
      setIsLoading(false)
      return
    }

    alert("สมัครสำเร็จ! กรุณาเช็คอีเมลเพื่อยืนยันบัญชี")
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-xl font-bold">Swift Co Thailand</span>
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              ไปหน้า Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              สมัครสมาชิก
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">

              <div>
                <Label>อีเมล</Label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>รหัสผ่าน</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
              </Button>
            </form>

            <p className="text-center text-sm mt-4">
              มีบัญชีแล้ว?{" "}
              <Link href="/login" className="text-blue-500">
                เข้าสู่ระบบ
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
