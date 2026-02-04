import Client from "shopify-buy"

// Initialize Shopify client
const client = Client.buildClient({
  domain: import.meta.env.VITE_SHOPIFY_DOMAIN,
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN,
})

// Fetch all products from Shopify
export async function fetchProducts() {
  try {
    const products = await client.product.fetchAll()

    return products.map(product => {
      // Extract numeric ID from Shopify GID (gid://shopify/Product/123 -> 123)
      const numericId = product.id.toString().split('/').pop()

      return {
        id: numericId, // Clean numeric ID for URLs
        shopifyId: product.id,
        name: product.title,
        price: parseFloat(product.variants[0].price.amount),
        description: product.description,
        category: product.productType || 'blends',
        gender: product.vendor || 'Unisex',
        image: product.images[0]?.src || '/images/placeholder.jpg',
        images: product.images.map(img => img.src),
        variants: product.variants.map(variant => ({
          id: variant.id.toString(),
          shopifyId: variant.id,
          size: variant.title,
          price: parseFloat(variant.price.amount),
          available: variant.available,
        })),
        inStock: product.availableForSale,
        featured: product.tags?.includes('featured') || false,
        // Note: Metafields require GraphQL API - these would come from there
        top: null,
        heart: null,
        base: null,
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// Fetch single product by ID
export async function fetchProduct(productId) {
  try {
    const product = await client.product.fetch(productId)

    if (!product) return null

    return {
      id: product.id.toString(),
      shopifyId: product.id,
      name: product.title,
      price: parseFloat(product.variants[0].price.amount),
      description: product.description,
      category: product.productType || 'blends',
      gender: product.vendor || 'Unisex',
      image: product.images[0]?.src || '/images/placeholder.jpg',
      images: product.images.map(img => img.src),
      variants: product.variants.map(variant => ({
        id: variant.id.toString().split('/').pop(), // Clean numeric ID
        shopifyId: variant.id,
        size: variant.title,
        price: parseFloat(variant.price.amount),
        available: variant.available,
      })),
      inStock: product.availableForSale,
      featured: product.tags?.includes('featured') || false,
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

// Create checkout and redirect to Shopify payment
export async function createCheckout(cartItems) {
  try {
    // Create checkout
    const checkout = await client.checkout.create()

    // Add line items to checkout
    const lineItems = cartItems.map(item => ({
      variantId: item.selectedVariant?.shopifyId || item.variants?.[0]?.shopifyId,
      quantity: item.quantity,
    }))

    const checkoutWithItems = await client.checkout.addLineItems(checkout.id, lineItems)

    // Return checkout URL to redirect user to Shopify payment page
    return checkoutWithItems.webUrl
  } catch (error) {
    console.error('Error creating checkout:', error)
    throw error
  }
}

// Add item to existing checkout
export async function addToCheckout(checkoutId, variantId, quantity) {
  try {
    const lineItemsToAdd = [{
      variantId,
      quantity,
    }]

    const checkout = await client.checkout.addLineItems(checkoutId, lineItemsToAdd)
    return checkout
  } catch (error) {
    console.error('Error adding to checkout:', error)
    throw error
  }
}

export default client

