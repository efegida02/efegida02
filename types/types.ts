export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
  image: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  date: string
  total: number
  status: string
  items: {
    name: string
    quantity: number
    price: number
  }[]
}

export interface Transaction {
  type: string
  date: string
  amount: number
  description: string
}

export interface Customer {
  id: string
  name: string
  phone: string
  email: string
  address: string
  balance: number
  status: string
  orders?: Order[]
  transactions?: Transaction[]
}
