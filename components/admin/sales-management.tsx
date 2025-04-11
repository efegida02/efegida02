"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Minus, Plus, Printer, Receipt, Search, ShoppingCart, X } from "lucide-react"
import Image from "next/image"
import { mockProducts, mockCustomers } from "@/lib/mock-data"
import type { Product, Customer, CartItem } from "@/types/types"

export default function SalesManagement() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<string>("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [isReceiptDialogOpen, setIsReceiptDialogOpen] = useState(false)
  const [receiptData, setReceiptData] = useState<any>(null)

  useEffect(() => {
    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem("adminLoggedIn")
    if (!adminLoggedIn) {
      router.push("/admin/login")
    } else {
      // Load products and customers
      setProducts(mockProducts)
      setCustomers(mockCustomers)
      setIsLoading(false)
    }
  }, [router])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id)

    if (existingItem) {
      setCart(cart.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { product, quantity: 1 }])
    }
  }

  const updateQuantity = (productId: string, change: number) => {
    setCart(
      cart.map((item) => {
        if (item.product.id === productId) {
          const newQuantity = Math.max(1, item.quantity + change)
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product.id !== productId))
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  const handleCompleteSale = () => {
    if (cart.length === 0) return

    const customer = selectedCustomer
      ? customers.find((c) => c.id === selectedCustomer)
      : { name: "Misafir Müşteri", phone: "-" }

    const receiptId = `MKB-${Date.now().toString().slice(-6)}`
    const date = new Date().toLocaleDateString("tr-TR")
    const time = new Date().toLocaleTimeString("tr-TR")

    const receiptInfo = {
      id: receiptId,
      date,
      time,
      customer,
      items: cart,
      total: calculateTotal(),
    }

    setReceiptData(receiptInfo)
    setIsReceiptDialogOpen(true)
  }

  const handleConfirmSale = () => {
    // In a real app, you would save the sale to the database
    // and update customer balance if needed

    // Reset cart and close dialog
    setCart([])
    setSelectedCustomer("")
    setIsReceiptDialogOpen(false)
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Satış Yönetimi</h1>
            <p className="text-muted-foreground">Yeni satış oluşturun ve makbuz düzenleyin</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Product Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Ürün ara..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                <SelectTrigger className="w-full sm:w-[250px]">
                  <SelectValue placeholder="Müşteri seçin (opsiyonel)" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name} - {customer.phone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="aspect-video relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      {product.stock <= 0 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <Badge variant="destructive">Stokta Yok</Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <h3 className="font-medium truncate">{product.name}</h3>
                          <span className="font-bold">₺{product.price.toLocaleString("tr-TR")}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs">Stok: {product.stock}</span>
                          <Button
                            size="sm"
                            disabled={product.stock <= 0}
                            onClick={() => addToCart(product)}
                            className="flex items-center gap-1"
                          >
                            <Plus className="h-3 w-3" />
                            Ekle
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Ürün Bulunamadı</h3>
                  <p className="text-muted-foreground mt-2">Başka bir arama terimi deneyin</p>
                </div>
              )}
            </div>
          </div>

          {/* Cart */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Sepet
                    </h3>
                    {cart.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCart([])}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        Temizle
                      </Button>
                    )}
                  </div>

                  {cart.length > 0 ? (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        {cart.map((item) => (
                          <div key={item.product.id} className="flex items-center gap-3">
                            <div className="w-12 h-12 relative rounded overflow-hidden flex-shrink-0">
                              <Image
                                src={item.product.image || "/placeholder.svg"}
                                alt={item.product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                              <p className="text-xs text-muted-foreground">
                                ₺{item.product.price.toLocaleString("tr-TR")} x {item.quantity}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => updateQuantity(item.product.id, -1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-6 text-center text-sm">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => updateQuantity(item.product.id, 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => removeFromCart(item.product.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-muted-foreground">Ara Toplam</span>
                          <span>₺{calculateTotal().toLocaleString("tr-TR")}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                          <span>Toplam</span>
                          <span>₺{calculateTotal().toLocaleString("tr-TR")}</span>
                        </div>
                      </div>

                      <Button className="w-full" size="lg" onClick={handleCompleteSale}>
                        Satışı Tamamla
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <ShoppingCart className="h-10 w-10 text-muted-foreground mb-3" />
                      <h3 className="text-base font-medium">Sepet Boş</h3>
                      <p className="text-sm text-muted-foreground mt-1">Satış yapmak için ürün ekleyin</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Receipt Dialog */}
      <Dialog open={isReceiptDialogOpen} onOpenChange={setIsReceiptDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Satış Makbuzu
            </DialogTitle>
            <DialogDescription>Satış işlemi başarıyla tamamlandı.</DialogDescription>
          </DialogHeader>

          {receiptData && (
            <div className="space-y-6 py-4">
              <div className="border-b pb-4 text-center">
                <h2 className="font-bold text-xl">Satış Makbuzu</h2>
                <p className="text-muted-foreground">Makbuz No: {receiptData.id}</p>
                <p className="text-sm text-muted-foreground">
                  {receiptData.date} - {receiptData.time}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Müşteri Bilgileri</h3>
                <p>{receiptData.customer.name}</p>
                <p className="text-sm text-muted-foreground">{receiptData.customer.phone}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Ürünler</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ürün</TableHead>
                        <TableHead className="text-right">Adet</TableHead>
                        <TableHead className="text-right">Fiyat</TableHead>
                        <TableHead className="text-right">Toplam</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {receiptData.items.map((item: CartItem) => (
                        <TableRow key={item.product.id}>
                          <TableCell>{item.product.name}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">₺{item.product.price.toLocaleString("tr-TR")}</TableCell>
                          <TableCell className="text-right">
                            ₺{(item.product.price * item.quantity).toLocaleString("tr-TR")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Toplam Tutar</span>
                  <span>₺{receiptData.total.toLocaleString("tr-TR")}</span>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setIsReceiptDialogOpen(false)}>
                  Kapat
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2" onClick={() => window.print()}>
                    <Printer className="h-4 w-4" />
                    Yazdır
                  </Button>
                  <Button onClick={handleConfirmSale} className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Tamamla
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
