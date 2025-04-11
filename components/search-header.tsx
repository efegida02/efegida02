"use client"

import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchHeaderProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  sortOption: string
  setSortOption: (option: string) => void
  productCount: number
  setIsMobileFiltersOpen: (open: boolean) => void
}

export function SearchHeader({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  productCount,
  setIsMobileFiltersOpen,
}: SearchHeaderProps) {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div className="flex-1 md:max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 md:hidden"
          onClick={() => setIsMobileFiltersOpen(true)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden md:inline">{productCount} products</span>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
