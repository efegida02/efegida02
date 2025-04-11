"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Eye, FileText, Truck } from "lucide-react"

// Mock data for past orders
const mockOrders = [
  {
    id: "SIP-1001",
    date: "15.04.2024",
    total: "₺1,250.00",
    status: "Teslim Edildi",
    items: [{ name: "Samsung Galaxy S23", quantity: 1, price: "₺1,250.00" }],
  },
  {
    id: "SIP-1002",
    date: "02.04.2024",
    total: "₺2,499.00",
    status: "Kargoda",
    items: [{ name: "iPhone 15", quantity: 1, price: "₺2,499.00" }],
  },
  {
    id: "SIP-1003",
    date: "25.03.2024",
    total: "₺3,750.00",
    status: "Teslim Edildi",
    items: [{ name: "MacBook Air M2", quantity: 1, price: "₺3,750.00" }],
  },
  {
    id: "SIP-1004",
    date: "10.03.2024",
    total: "₺899.00",
    status: "İptal Edildi",
    items: [{ name: "Xiaomi Redmi Note 12", quantity: 1, price: "₺899.00" }],
  },
  {
    id: "SIP-1005",
    date: "01.03.2024",
    total: "₺1,850.00",
    status: "Teslim Edildi",
    items: [{ name: "iPad 10. Nesil", quantity: 1, price: "₺1,850.00" }],
  },
]

export default function PastOrders() {
  const [filter, setFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<(typeof mockOrders)[0] | null>(null)

  const filteredOrders =
    filter === "all"
      ? mockOrders
      : mockOrders.filter((order) => {
          if (filter === "delivered") return order.status === "Teslim Edildi"
          if (filter === "shipping") return order.status === "Kargoda"
          if (filter === "cancelled") return order.status === "İptal Edildi"
          return true
        })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Teslim Edildi":
        return <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>
      case "Kargoda":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{status}</Badge>
      case "İptal Edildi":
        return <Badge className="bg-red-500 hover:bg-red-600">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground">Toplam {mockOrders.length} sipariş</span>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrele" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Siparişler</SelectItem>
            <SelectItem value="delivered">Teslim Edilenler</SelectItem>
            <SelectItem value="shipping">Kargoda Olanlar</SelectItem>
            <SelectItem value="cancelled">İptal Edilenler</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sipariş No</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Tutar</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                      className="flex items-center gap-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only md:inline-block">Detaylar</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Sipariş Bulunamadı</h3>
          <p className="text-muted-foreground mt-2">Seçilen filtreye uygun sipariş bulunmamaktadır.</p>
        </div>
      )}

      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sipariş Detayları</DialogTitle>
            <DialogDescription>Sipariş No: {selectedOrder?.id}</DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Sipariş Tarihi</p>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Durum</p>
                  <p>{getStatusBadge(selectedOrder.status)}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Ürünler</p>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ürün</TableHead>
                        <TableHead className="text-right">Adet</TableHead>
                        <TableHead className="text-right">Fiyat</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">{item.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <p className="text-sm text-muted-foreground">Toplam Tutar</p>
                <p className="text-lg font-bold">{selectedOrder.total}</p>
              </div>

              {selectedOrder.status === "Kargoda" && (
                <div className="flex items-center justify-center gap-2 p-3 bg-blue-50 rounded-md">
                  <Truck className="h-5 w-5 text-blue-500" />
                  <p className="text-sm text-blue-700">Siparişiniz yolda! Tahmini teslimat: 2 gün içinde</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
