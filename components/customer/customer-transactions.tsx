import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText } from "lucide-react"
import type { Customer } from "@/types/types"

interface CustomerTransactionsProps {
  customer: Customer
}

export default function CustomerTransactions({ customer }: CustomerTransactionsProps) {
  const transactions = customer.transactions || []

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-muted-foreground" />
        <span className="text-muted-foreground">Toplam {transactions.length} işlem</span>
      </div>

      {transactions.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>İşlem Türü</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Açıklama</TableHead>
                <TableHead className="text-right">Tutar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{transaction.type}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell
                    className={`text-right ${transaction.type === "Ödeme" ? "text-green-600" : "text-red-600"}`}
                  >
                    {transaction.type === "Ödeme" ? "+" : "-"}₺{transaction.amount.toLocaleString("tr-TR")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">İşlem Bulunamadı</h3>
          <p className="text-muted-foreground mt-2">Hesabınızda henüz işlem bulunmamaktadır.</p>
        </div>
      )}
    </div>
  )
}
