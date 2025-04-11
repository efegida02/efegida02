"use client"

import { useState, useEffect } from "react"
import { SearchFilters } from "./search-filters"
import { ProductGrid } from "./product-grid"
import { SearchHeader } from "./search-header"
import type { Product, FilterState } from "@/types/product"
import { getProducts } from "@/lib/product-data"

export default function ProductSearch() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("featured")
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    colors: [],
    price: { min: 0, max: 1000 },
    rating: 0,
  })
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  // Load products on component mount
  useEffect(() => {
    const allProducts = getProducts()
    setProducts(allProducts)
    setFilteredProducts(allProducts)
  }, [])

  // Apply filters and search
  useEffect(() => {
    let result = [...products]

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query),
      )
    }

    // Apply category filters
    if (filters.categories.length > 0) {
      result = result.filter((product) => filters.categories.includes(product.category))
    }

    // Apply color filters
    if (filters.colors.length > 0) {
      result = result.filter((product) => filters.colors.includes(product.color))
    }

    // Apply price filter
    result = result.filter((product) => product.price >= filters.price.min && product.price <= filters.price.max)

    // Apply rating filter
    if (filters.rating > 0) {
      result = result.filter((product) => product.rating >= filters.rating)
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      default: // featured
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    setFilteredProducts(result)
  }, [products, searchQuery, filters, sortOption])

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
        productCount={filteredProducts.length}
        setIsMobileFiltersOpen={setIsMobileFiltersOpen}
      />

      <div className="mt-6 lg:grid lg:grid-cols-4 lg:gap-x-8">
        <SearchFilters
          filters={filters}
          setFilters={setFilters}
          isMobileOpen={isMobileFiltersOpen}
          setIsMobileOpen={setIsMobileFiltersOpen}
        />

        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  )
}
