"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone } from "lucide-react"
import CustomerDashboard from "./customer-dashboard"

export default function CustomerLogin() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate phone number (simple validation for Turkish numbers)
    if (!phoneNumber.match(/^(05)[0-9][0-9][0-9]{7}$/)) {
      setError("Lütfen geçerli bir telefon numarası giriniz (05XX XXX XX XX)")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsLoggedIn(true)
    }, 1000)
  }

  if (isLoggedIn) {
    return <CustomerDashboard phoneNumber={phoneNumber} />
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Müşteri Girişi</CardTitle>
          <CardDescription className="text-center">
            Siparişlerinizi görüntülemek için cep telefonu numaranız ile giriş yapın
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Cep Telefonu Numarası</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="05XX XXX XX XX"
                    className="pl-10"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-sm text-muted-foreground text-center mt-2">
            Telefon numaranızı girerek müşteri hesabınıza erişebilir, geçmiş siparişlerinizi görüntüleyebilir ve yeni
            sipariş oluşturabilirsiniz.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
