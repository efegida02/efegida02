import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ShieldCheck, Users } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">E-Ticaret Yönetim Sistemi</CardTitle>
          <CardDescription>Lütfen giriş yapmak için bir seçenek seçin</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Link href="/admin/login" className="w-full">
            <Button className="w-full flex items-center gap-2" variant="default">
              <ShieldCheck className="h-4 w-4" />
              Yönetici Girişi
            </Button>
          </Link>
          <Link href="/customer/login" className="w-full">
            <Button className="w-full flex items-center gap-2" variant="outline">
              <Users className="h-4 w-4" />
              Müşteri Girişi
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  )
}
