import { Star, StarHalf } from "lucide-react"

interface StarRatingProps {
  rating: number
  size?: number
}

export function StarRating({ rating, size = 16 }: StarRatingProps) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="fill-amber-400 text-amber-400" size={size} />
      ))}

      {hasHalfStar && <StarHalf className="fill-amber-400 text-amber-400" size={size} />}

      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="text-muted-foreground/30" size={size} />
      ))}
    </div>
  )
}
