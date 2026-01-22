import { useState } from "react"
import ProductGrid from "../components/ProductGrid"
import productsData from "../data/products.json"

export default function Products() {
  const [products] = useState(productsData)

  return (
    <div className="min-h-screen py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="font-serif text-5xl mb-4 text-brand-black">
            Our Collection
          </h1>
          <p className="text-gray-600">Explore our luxury oud fragrances</p>
        </div>

        <ProductGrid products={products} />
      </div>
    </div>
  )
}
