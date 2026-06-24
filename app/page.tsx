import Link from "next/link"
import { Building2, Users, Car, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-bold text-foreground">Swift Co Thailand</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a
              href="https://www.thaifreshproduce.com/en/home-2/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              เกี่ยวกับเรา
            </a>
            <a
              href="https://www.thaifreshproduce.com/en/contact/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ติดต่อ
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              ยินดีต้อนรับสู่ระบบบริการ
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              กรุณาเลือกประเภทผู้ใช้งานเพื่อเข้าสู่ระบบที่เหมาะสมกับคุณ
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Internal Staff Card */}
            <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer">
              <Link href="/login" className="block">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground">บุคคลภายใน</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    สำหรับพนักงานและบุคลากรของบริษัท
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button className="w-full group-hover:bg-primary/90" size="lg">
                    เข้าสู่ระบบ
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    ต้องใช้บัญชีผู้ใช้งานในการเข้าสู่ระบบ
                  </p>
                </CardContent>
              </Link>
            </Card>

            {/* Public Visitor Card */}
            <Card className="group hover:shadow-lg transition-all duration-300 hover:border-accent/50 cursor-pointer">
              <Link href="/booking" className="block">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                    <Car className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl text-foreground">บุคคลทั่วไป</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    สำหรับผู้มาติดต่อและผู้เยี่ยมชม
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground" size="lg">
                    จองคิวรถ
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    ไม่ต้องลงทะเบียน สามารถจองคิวได้ทันที
                  </p>
                </CardContent>
              </Link>
            </Card>
          </div>
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
