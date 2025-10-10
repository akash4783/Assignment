import type { Bill, CartItems, OfferSaving } from '../types'
import { products } from '../data/products'

const productById = new Map(products.map(p => [p.id, p]))

export function calculateSubtotal(items: CartItems): number {
  let cents = 0
  for (const [productId, qty] of Object.entries(items)) {
    const product = productById.get(productId)
    if (!product || qty <= 0) continue
    cents += product.price * qty
  }
  return cents
}

export function applyOffers(items: CartItems, subtotal: number): OfferSaving[] {
  const savings: OfferSaving[] = []

  // Offer 1: When you buy a Cheese, you get a second Cheese free
  const qtyCheese = items['cheese'] ?? 0
  if (qtyCheese >= 2) {
    const cheese = productById.get('cheese')!
    const freeUnits = Math.floor(qtyCheese / 2)
    const amount = -freeUnits * cheese.price
    if (amount) savings.push({ id: 'offer-bogof-cheese', description: 'Second Cheese free', amount, productId: 'cheese' })
  }

  // Offer 2: When you buy a Soup, you get a half price Bread (one bread per soup)
  const qtySoup = items['soup'] ?? 0
  const qtyBread = items['bread'] ?? 0
  if (qtySoup > 0 && qtyBread > 0) {
    const bread = productById.get('bread')!
    const eligible = Math.min(qtySoup, qtyBread)
    const amount = -Math.floor((bread.price / 2) * eligible)
    if (amount) savings.push({ id: 'offer-half-bread-with-soup', description: 'Half price Bread with Soup', amount, productId: 'bread' })
  }

  // Offer 3: Get a third off Butter
  const qtyButter = items['butter'] ?? 0
  if (qtyButter > 0) {
    const butter = productById.get('butter')!
    const amount = -Math.floor((butter.price / 3) * qtyButter)
    if (amount) savings.push({ id: 'offer-third-off-butter', description: 'Third off Butter', amount, productId: 'butter' })
  }

  return savings
}

export function buildBill(items: CartItems): Bill {
  const subtotal = calculateSubtotal(items)
  const savings = applyOffers(items, subtotal)
  const total = subtotal + savings.reduce((sum, s) => sum + s.amount, 0)
  return { subtotal, savings, total }
}
