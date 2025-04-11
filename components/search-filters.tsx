"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { FilterState } from "@/types/product"
import { StarRating } from "./star-rating"

interface SearchFiltersProps {
  filters: FilterState
  setFilters: (filters: FilterState) => void
  isMobileOpen: boolean
  setIsMobileOpen: (open: boolean) => void
}

export function SearchFilters({ filters, setFilters, isMobileOpen, setIsMobileOpen }: SearchFiltersProps) {
  const categories = ["Clothing", "Shoes", "Accessories", "Electronics", "Home", "Beauty"]

  const colors = [
    { name: "Black", value: "black" },
    { name: "White", value: "white" },
    { name: "Gray", value: "gray" },
    { name: "Red", value: "red" },
    { name: "Blue", value: "blue" },
    { name: "Green", value: "green" },
  ]

  const toggleCategory = (category: string) => {
    setFilters({
      ...filters,
      categories: filters.categories.includes(category)
        ? filters.categories.filter((c) => c !== category)
        : [...filters.categories, category],
    })
  }

  const toggleColor = (color: string) => {
    setFilters({
      ...filters,
      colors: filters.colors.includes(color) ? filters.colors.filter((c) => c !== color) : [...filters.colors, color],
    })
  }

  const updatePriceRange = (value: number[]) => {
    setFilters({
      ...filters,
      price: { min: value[0], max: value[1] },
    })
  }

  const setRating = (rating: number) => {
    setFilters({
      ...filters,
      rating,
    })
  }

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      colors: [],
      price: { min: 0, max: 1000 },
      rating: 0,
    })
  }

  const filterContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="h-8 text-sm text-muted-foreground hover:text-foreground"
        >
          Clear all
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "price", "colors", "rating"]}>
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  />
                  <Label htmlFor={`category-${category}`} className="text-sm font-normal cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-1">
              <Slider
                defaultValue={[filters.price.min, filters.price.max]}
                max={1000}
                step={10}
                onValueChange={updatePriceRange}
                className="py-4"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">${filters.price.min}</span>
                <span className="text-sm">${filters.price.max}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="colors">
          <AccordionTrigger>Colors</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-3 pt-1">
              {colors.map((color) => (
                <div key={color.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color.value}`}
                    checked={filters.colors.includes(color.value)}
                    onCheckedChange={() => toggleColor(color.value)}
                  />
                  <div className="flex items-center gap-1.5">
                    <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: color.value }} />
                    <Label htmlFor={`color-${color.value}`} className="text-sm font-normal cursor-pointer">
                      {color.name}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              {[4, 3, 2, 1].map((rating) => (
                <div
                  key={rating}
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => setRating(rating)}
                >
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={filters.rating === rating}
                    onCheckedChange={() => setRating(filters.rating === rating ? 0 : rating)}
                  />
                  <Label
                    htmlFor={`rating-${rating}`}
                    className="flex items-center gap-1 text-sm font-normal cursor-pointer"
                  >
                    <StarRating rating={rating} /> & Up
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )

  return (
    <>
      {/* Desktop filters */}
      <div className="hidden lg:block">
        <div className="sticky top-8 divide-y">{filterContent}</div>
      </div>

      {/* Mobile filters */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="w-full max-w-xs sm:max-w-sm">
          <SheetHeader className="mb-5">
            <SheetTitle>Filters</SheetTitle>
            <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </SheetHeader>
          {filterContent}
        </SheetContent>
      </Sheet>
    </>
  )
}
