"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, Package, ShoppingCart, Wallet, FileText } from "lucide-react"
import { mockCustomers, mockProducts } from "@/lib/mock-data"
import type { Customer } from "@/types/types"
import CustomerOrders from "./customer-orders"
import CustomerNewOrder from "./customer-new-order"
import CustomerTransactions from "./customer-transactions"

export default function CustomerDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [activeTab, setActiveTab] = useState("orders")

  useEffect(() => {
    // Check if customer is logged in
    const customerLoggedIn = localStorage.getItem("customerLoggedIn")
    const customerId = localStorage.getItem("customerId")

    if (!customerLoggedIn || !customerId) {
      router.push("/customer/login")
    } else {
      // Find customer data
      const customerData = mockCustomers.find((c) => c.id === customerId)
      if (customerData) {
        setCustomer(customerData)
      } else {
        router.push("/customer/login")
      }
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("customerLoggedIn")
    localStorage.removeItem("customerId")
    router.push("/customer/login")
  }

  if (isLoading || !customer) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Hoş Geldiniz, {customer.name}</h1>
          <p className="text-muted-foreground">{customer.phone}</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Çıkış Yap
        </Button>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Bakiye</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{customer.balance.toLocaleString("tr-TR")}</div>
            <p className="text-xs text-muted-foreground">Güncel bakiyeniz</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Toplam Sipariş</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customer.orders?.length || 0}</div>
            <p className="text-xs text-muted-foreground">Tüm zamanlar</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Son İşlem</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customer.transactions && customer.transactions.length > 0 ? customer.transactions[0].date : "Yok"}
            </div>
            <p className="text-xs text-muted-foreground">Son işlem tarihi</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Siparişlerim
          </TabsTrigger>
          <TabsTrigger value="new-order" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Yeni Sipariş
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            İşlem Geçmişi
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Siparişlerim</CardTitle>
              <CardDescription>Önceki siparişlerinizi görüntüleyin ve takip edin</CardDescription>
            </CardHeader>
            <CardContent>
              <CustomerOrders customer={customer} />
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
              <CustomerNewOrder
                customer={customer}
                products={mockProducts}
                onOrderComplete={() => setActiveTab("orders")}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>İşlem Geçmişi</CardTitle>
              <CardDescription>Hesabınızdaki tüm işlemleri görüntüleyin</CardDescription>
            </CardHeader>
            <CardContent>
              <CustomerTransactions customer={customer} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
