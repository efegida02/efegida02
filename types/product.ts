export interface Product {
  id: string
  name: string
  description: string
  price: number
  discount: number
  image: string
  category: string
  color: string
  rating: number
  reviewCount: number
  featured: boolean
  createdAt: string
}

export interface FilterState {
  categories: string[]
  colors: string[]
  price: {
    min: number
    max: number
  }
  rating: number
}
