"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Minus, Plus, Search, ShoppingCart, Trash2 } from "lucide-react"
import Image from "next/image"
import type { Customer, Product } from "@/types/types"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CustomerNewOrderProps {
  customer: Customer
  products: Product[]
  onOrderComplete: () => void
}

export default function CustomerNewOrder({ customer, products, onOrderComplete }: CustomerNewOrderProps) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [address, setAddress] = useState(customer.address || "")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id)

    if (existingItem) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ])
    }
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
    setAddress(customer.address || "")
    onOrderComplete()
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Ürün ara..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                {product.stock <= 0 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-medium px-2 py-1 bg-red-500 rounded-md text-xs">Stokta Yok</span>
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
          ))}
        </div>

        {cart.length > 0 ? (
          <div className="space-y-4 mt-6">
            <h3 className="font-medium flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Sepetiniz
            </h3>

            <div className="space-y-3">
              {cart.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 relative rounded overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          ₺{item.price.toLocaleString("tr-TR")} x {item.quantity}
                        </p>
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
