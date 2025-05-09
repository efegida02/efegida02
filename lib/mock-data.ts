import type { Product, Customer } from "@/types/types"

// Mock Products
export const mockProducts: Product[] = [
  {
    id: "prod-1",
    name: "iPhone 15",
    description: "Apple'ın en yeni akıllı telefonu",
    price: 2499,
    category: "Telefon",
    stock: 15,
    image: "/placeholder.svg?height=200&width=200&text=iPhone+15",
  },
  {
    id: "prod-2",
    name: "Samsung Galaxy S23",
    description: "Samsung'un amiral gemisi telefonu",
    price: 1250,
    category: "Telefon",
    stock: 8,
    image: "/placeholder.svg?height=200&width=200&text=Galaxy+S23",
  },
  {
    id: "prod-3",
    name: "Xiaomi Redmi Note 12",
    description: "Uygun fiyatlı performans telefonu",
    price: 899,
    category: "Telefon",
    stock: 20,
    image: "/placeholder.svg?height=200&width=200&text=Redmi+Note+12",
  },
  {
    id: "prod-4",
    name: "iPad 10. Nesil",
    description: "Apple'ın giriş seviyesi tableti",
    price: 1850,
    category: "Tablet",
    stock: 12,
    image: "/placeholder.svg?height=200&width=200&text=iPad",
  },
  {
    id: "prod-5",
    name: "MacBook Air M2",
    description: "İnce ve hafif dizüstü bilgisayar",
    price: 3750,
    category: "Bilgisayar",
    stock: 5,
    image: "/placeholder.svg?height=200&width=200&text=MacBook+Air",
  },
  {
    id: "prod-6",
    name: "Apple Watch Series 9",
    description: "Apple'ın en yeni akıllı saati",
    price: 1200,
    category: "Aksesuar",
    stock: 10,
    image: "/placeholder.svg?height=200&width=200&text=Apple+Watch",
  },
  {
    id: "prod-7",
    name: "AirPods Pro",
    description: "Gürültü önleyici kablosuz kulaklık",
    price: 950,
    category: "Aksesuar",
    stock: 18,
    image: "/placeholder.svg?height=200&width=200&text=AirPods+Pro",
  },
  {
    id: "prod-8",
    name: "Samsung Galaxy Tab S9",
    description: "Samsung'un üst seviye tableti",
    price: 1650,
    category: "Tablet",
    stock: 7,
    image: "/placeholder.svg?height=200&width=200&text=Galaxy+Tab+S9",
  },
  {
    id: "prod-9",
    name: "Lenovo ThinkPad X1",
    description: "İş odaklı dizüstü bilgisayar",
    price: 2950,
    category: "Bilgisayar",
    stock: 3,
    image: "/placeholder.svg?height=200&width=200&text=ThinkPad+X1",
  },
  {
    id: "prod-10",
    name: "Logitech MX Master 3",
    description: "Profesyonel kablosuz mouse",
    price: 250,
    category: "Aksesuar",
    stock: 25,
    image: "/placeholder.svg?height=200&width=200&text=MX+Master+3",
  },
  {
    id: "prod-11",
    name: "Sony WH-1000XM5",
    description: "Premium gürültü önleyici kulaklık",
    price: 850,
    category: "Aksesuar",
    stock: 9,
    image: "/placeholder.svg?height=200&width=200&text=Sony+WH-1000XM5",
  },
  {
    id: "prod-12",
    name: "Dell XPS 15",
    description: "Yüksek performanslı dizüstü bilgisayar",
    price: 3250,
    category: "Bilgisayar",
    stock: 4,
    image: "/placeholder.svg?height=200&width=200&text=Dell+XPS+15",
  },
]

// Mock Customers
export const mockCustomers: Customer[] = [
  {
    id: "cust-1",
    name: "Ahmet Yılmaz",
    phone: "05551234567",
    email: "ahmet@example.com",
    address: "Atatürk Cad. No:123 Kadıköy/İstanbul",
    balance: 1250.75,
    status: "Aktif",
    orders: [
      {
        id: "SIP-1001",
        date: "15.04.2024",
        total: 2499,
        status: "Teslim Edildi",
        items: [
          {
            name: "iPhone 15",
            quantity: 1,
            price: 2499,
          },
        ],
      },
      {
        id: "SIP-1005",
        date: "02.03.2024",
        total: 1850,
        status: "Teslim Edildi",
        items: [
          {
            name: "iPad 10. Nesil",
            quantity: 1,
            price: 1850,
          },
        ],
      },
    ],
    transactions: [
      {
        type: "Ödeme",
        date: "10.04.2024",
        amount: 1000,
        description: "Nakit ödeme",
      },
      {
        type: "Satın Alma",
        date: "15.04.2024",
        amount: 2499,
        description: "iPhone 15 satın alımı",
      },
      {
        type: "Ödeme",
        date: "01.03.2024",
        amount: 2000,
        description: "Havale ile ödeme",
      },
      {
        type: "Satın Alma",
        date: "02.03.2024",
        amount: 1850,
        description: "iPad 10. Nesil satın alımı",
      },
    ],
  },
  {
    id: "cust-2",
    name: "Ayşe Demir",
    phone: "05559876543",
    email: "ayse@example.com",
    address: "Bağdat Cad. No:456 Maltepe/İstanbul",
    balance: 750.25,
    status: "Aktif",
    orders: [
      {
        id: "SIP-1002",
        date: "02.04.2024",
        total: 1250,
        status: "Kargoda",
        items: [
          {
            name: "Samsung Galaxy S23",
            quantity: 1,
            price: 1250,
          },
        ],
      },
    ],
    transactions: [
      {
        type: "Ödeme",
        date: "01.04.2024",
        amount: 500,
        description: "Kredi kartı ile ödeme",
      },
      {
        type: "Satın Alma",
        date: "02.04.2024",
        amount: 1250,
        description: "Samsung Galaxy S23 satın alımı",
      },
    ],
  },
  {
    id: "cust-3",
    name: "Mehmet Kaya",
    phone: "05553456789",
    email: "mehmet@example.com",
    address: "İstiklal Cad. No:789 Beyoğlu/İstanbul",
    balance: 0,
    status: "Pasif",
    orders: [
      {
        id: "SIP-1003",
        date: "25.03.2024",
        total: 3750,
        status: "Teslim Edildi",
        items: [
          {
            name: "MacBook Air M2",
            quantity: 1,
            price: 3750,
          },
        ],
      },
      {
        id: "SIP-1004",
        date: "10.03.2024",
        total: 899,
        status: "İptal Edildi",
        items: [
          {
            name: "Xiaomi Redmi Note 12",
            quantity: 1,
            price: 899,
          },
        ],
      },
    ],
    transactions: [
      {
        type: "Ödeme",
        date: "20.03.2024",
        amount: 3750,
        description: "Havale ile ödeme",
      },
      {
        type: "Satın Alma",
        date: "25.03.2024",
        amount: 3750,
        description: "MacBook Air M2 satın alımı",
      },
      {
        type: "Satın Alma",
        date: "10.03.2024",
        amount: 899,
        description: "Xiaomi Redmi Note 12 satın alımı (iptal edildi)",
      },
      {
        type: "İade",
        date: "12.03.2024",
        amount: 899,
        description: "Xiaomi Redmi Note 12 iadesi",
      },
    ],
  },
]
