export type Product = { id: string; name: string; price: number } // cents
export type CartItems = Record<string, number>
export type CartState = { items: CartItems }
export type OfferSaving = { id: string; description: string; amount: number; productId?: string } // negative cents
export type Bill = { subtotal: number; savings: OfferSaving[]; total: number }
