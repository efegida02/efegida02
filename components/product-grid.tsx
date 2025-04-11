import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/types/product"
import { StarRating } from "./star-rating"
import { Badge } from "@/components/ui/badge"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="col-span-3 flex flex-col items-center justify-center py-12">
        <h3 className="text-xl font-medium text-muted-foreground">No products found</h3>
        <p className="mt-2 text-center text-muted-foreground">Try adjusting your search or filter criteria</p>
      </div>
    )
  }

  return (
    <div className="col-span-3">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
              {product.featured && (
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="bg-white/90 hover:bg-white/90">
                    Featured
                  </Badge>
                </div>
              )}
              {product.discount > 0 && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-rose-500 hover:bg-rose-600">-{product.discount}%</Badge>
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  <Link href={`/products/${product.id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <StarRating rating={product.rating} />
                  <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                </div>
              </div>
              <div>
                {product.discount > 0 ? (
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      ${((product.price * (100 - product.discount)) / 100).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground line-through">${product.price.toFixed(2)}</p>
                  </div>
                ) : (
                  <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
