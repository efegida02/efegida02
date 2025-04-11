"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, Package, ShoppingCart } from "lucide-react"
import PastOrders from "./past-orders"
import NewOrder from "./new-order"

interface CustomerDashboardProps {
  phoneNumber: string
}

export default function CustomerDashboard({ phoneNumber }: CustomerDashboardProps) {
  const [activeTab, setActiveTab] = useState("past-orders")

  const handleLogout = () => {
    // In a real app, you would clear auth tokens, etc.
    window.location.reload()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Hoş Geldiniz</h1>
          <p className="text-muted-foreground">{phoneNumber}</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Çıkış Yap
        </Button>
      </div>

      <Tabs defaultValue="past-orders" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="past-orders" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Geçmiş Siparişler
          </TabsTrigger>
          <TabsTrigger value="new-order" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Yeni Sipariş
          </TabsTrigger>
        </TabsList>

        <TabsContent value="past-orders">
          <Card>
            <CardHeader>
              <CardTitle>Geçmiş Siparişleriniz</CardTitle>
              <CardDescription>Önceki siparişlerinizi görüntüleyin ve takip edin</CardDescription>
            </CardHeader>
            <CardContent>
              <PastOrders />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new-order">
          <Card>
            <CardHeader>
              <CardTitle>Yeni Sipariş Oluştur</CardTitle>
              <CardDescription>Ürünlerimizden seçim yaparak yeni bir sipariş oluşturun</CardDescription>
            </CardHeader>
            <CardContent>
              <NewOrder onOrderComplete={() => setActiveTab("past-orders")} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
