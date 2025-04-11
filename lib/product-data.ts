import type { Product } from "@/types/product"

// Generate a random number between min and max
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

// Generate a random date within the last year
const randomDate = () => {
  const now = new Date()
  const pastDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
  const timestamp = random(pastDate.getTime(), now.getTime())
  return new Date(timestamp).toISOString()
}

// Generate a random product
const generateProduct = (id: number): Product => {
  const categories = ["Clothing", "Shoes", "Accessories", "Electronics", "Home", "Beauty"]
  const colors = ["black", "white", "gray", "red", "blue", "green"]
  const category = categories[random(0, categories.length - 1)]

  // Generate product names based on category
  let name = ""
  let description = ""

  switch (category) {
    case "Clothing":
      const clothingTypes = ["T-Shirt", "Sweater", "Jacket", "Dress", "Jeans", "Shorts"]
      const clothingStyle = ["Casual", "Elegant", "Vintage", "Modern", "Classic"]
      name = `${clothingStyle[random(0, clothingStyle.length - 1)]} ${clothingTypes[random(0, clothingTypes.length - 1)]}`
      description = `Comfortable ${name.toLowerCase()} for everyday wear`
      break
    case "Shoes":
      const shoeTypes = ["Sneakers", "Boots", "Sandals", "Loafers", "Heels", "Running Shoes"]
      const shoeStyle = ["Sporty", "Elegant", "Casual", "Outdoor", "Formal"]
      name = `${shoeStyle[random(0, shoeStyle.length - 1)]} ${shoeTypes[random(0, shoeTypes.length - 1)]}`
      description = `Stylish and comfortable ${name.toLowerCase()} for any occasion`
      break
    case "Accessories":
      const accessoryTypes = ["Watch", "Bag", "Wallet", "Sunglasses", "Hat", "Scarf"]
      const accessoryStyle = ["Luxury", "Casual", "Vintage", "Designer", "Handmade"]
      name = `${accessoryStyle[random(0, accessoryStyle.length - 1)]} ${accessoryTypes[random(0, accessoryTypes.length - 1)]}`
      description = `High-quality ${name.toLowerCase()} to complete your look`
      break
    case "Electronics":
      const electronicTypes = ["Headphones", "Smartwatch", "Speaker", "Tablet", "Camera", "Earbuds"]
      const electronicBrands = ["TechPro", "SoundMax", "PixelView", "SmartLife", "ElectraTech"]
      name = `${electronicBrands[random(0, electronicBrands.length - 1)]} ${electronicTypes[random(0, electronicTypes.length - 1)]}`
      description = `Advanced technology ${name.toLowerCase()} for your digital lifestyle`
      break
    case "Home":
      const homeTypes = ["Lamp", "Pillow", "Blanket", "Vase", "Frame", "Candle"]
      const homeStyle = ["Modern", "Rustic", "Minimalist", "Bohemian", "Scandinavian"]
      name = `${homeStyle[random(0, homeStyle.length - 1)]} ${homeTypes[random(0, homeTypes.length - 1)]}`
      description = `Beautiful ${name.toLowerCase()} to enhance your home decor`
      break
    case "Beauty":
      const beautyTypes = ["Moisturizer", "Serum", "Cleanser", "Mask", "Perfume", "Makeup Set"]
      const beautyBrands = ["NaturGlow", "PureSkin", "LuxeBeauty", "EssenceOf", "RadiantYou"]
      name = `${beautyBrands[random(0, beautyBrands.length - 1)]} ${beautyTypes[random(0, beautyTypes.length - 1)]}`
      description = `Premium quality ${name.toLowerCase()} for your beauty routine`
      break
  }

  const price = category === "Electronics" ? random(50, 500) : category === "Home" ? random(20, 200) : random(10, 100)

  const discount = random(0, 10) > 7 ? random(10, 30) : 0
  const rating = random(30, 50) / 10 // Rating between 3.0 and 5.0
  const reviewCount = random(5, 500)
  const featured = random(0, 10) > 8 // 20% chance of being featured

  return {
    id: `prod-${id}`,
    name,
    description,
    price,
    discount,
    image: `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(name)}`,
    category,
    color: colors[random(0, colors.length - 1)],
    rating,
    reviewCount,
    featured,
    createdAt: randomDate(),
  }
}

// Generate a list of products
export const getProducts = (): Product[] => {
  return Array.from({ length: 24 }, (_, i) => generateProduct(i + 1))
}
