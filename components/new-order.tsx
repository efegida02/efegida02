"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import Image from "next/image"

// Mock data for products
const products = [
  {
    id: "1",
    name: "iPhone 15",
    price: 2499,
    image: "/placeholder.svg?height=100&width=100&text=iPhone+15",
  },
  {
    id: "2",
    name: "Samsung Galaxy S23",
    price: 1250,
    image: "/placeholder.svg?height=100&width=100&text=Galaxy+S23",
  },
  {
    id: "3",
    name: "Xiaomi Redmi Note 12",
    price: 899,
    image: "/placeholder.svg?height=100&width=100&text=Redmi+Note+12",
  },
  {
    id: "4",
    name: "iPad 10. Nesil",
    price: 1850,
    image: "/placeholder.svg?height=100&width=100&text=iPad",
  },
  {
    id: "5",
    name: "MacBook Air M2",
    price: 3750,
    image: "/placeholder.svg?height=100&width=100&text=MacBook+Air",
  },
  {
    id: "6",
    name: "Apple Watch Series 9",
    price: 1200,
    image: "/placeholder.svg?height=100&width=100&text=Apple+Watch",
  },
]

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface NewOrderProps {
  onOrderComplete: () => void
}

export default function NewOrder({ onOrderComplete }: NewOrderProps) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [address, setAddress] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addToCart = () => {
    if (!selectedProduct) return

    const product = products.find((p) => p.id === selectedProduct)
    if (!product) return

    const existingItem = cart.find((item) => item.id === product.id)

    if (existingItem) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }

    setSelectedProduct("")
  }

  const updateQuantity = (id: string, change: number) => {
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change)
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  const removeItem = (id: string) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleSubmitOrder = () => {
    if (cart.length === 0 || !address) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowConfirmation(true)
    }, 1500)
  }

  const handleConfirmOrder = () => {
    setShowConfirmation(false)
    setCart([])
    setAddress("")
    onOrderComplete()
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
            <SelectTrigger className="w-full sm:w-[300px]">
              <SelectValue placeholder="Ürün seçin" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name} - ₺{product.price.toLocaleString("tr-TR")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={addToCart} disabled={!selectedProduct} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Sepete Ekle
          </Button>
        </div>

        {cart.length > 0 ? (
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Sepetiniz
            </h3>

            <div className="space-y-3">
              {cart.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">₺{item.price.toLocaleString("tr-TR")}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right min-w-[80px]">
                        ₺{(item.price * item.quantity).toLocaleString("tr-TR")}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-6">
                <span className="font-medium">Toplam Tutar</span>
                <span className="text-xl font-bold">₺{calculateTotal().toLocaleString("tr-TR")}</span>
              </div>

              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="address">Teslimat Adresi</Label>
                  <Input
                    id="address"
                    placeholder="Adresinizi girin"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleSubmitOrder}
                  disabled={cart.length === 0 || !address || isSubmitting}
                >
                  {isSubmitting ? "Sipariş Oluşturuluyor..." : "Siparişi Tamamla"}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Sepetiniz Boş</h3>
            <p className="text-muted-foreground mt-2">Sipariş oluşturmak için ürün ekleyin</p>
          </div>
        )}
      </div>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Siparişiniz Alındı</AlertDialogTitle>
            <AlertDialogDescription>
              Siparişiniz başarıyla oluşturuldu. Sipariş numaranız: SIP-{Math.floor(1000 + Math.random() * 9000)}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleConfirmOrder}>Tamam</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
