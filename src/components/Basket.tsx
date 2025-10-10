import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { addItem, removeItem, setQuantity } from '../store/cartSlice'
import { products } from '../data/products'
import { buildBill } from '../utils/offers'
import { formatCents } from '../utils/currency'

export function Basket() {
  const dispatch = useDispatch()
  const items = useSelector((s: RootState) => s?.cart?.items)
  const bill = buildBill(items)

  return (
    <div className="rounded border bg-white p-4">
      <h2 className="mb-4 text-2xl font-semibold">Basket</h2>

      <div className="space-y-6">
        {Object.entries(items)?.map(([productId, qty]) => {
          const p = products?.find(pp => pp?.id === productId)!
          const itemCost = p?.price * qty
          const itemSavings = bill?.savings?.filter(s => s?.productId === p?.id)
          const totalItemSavings = itemSavings?.reduce((sum, s) => sum + s?.amount, 0)
          return (
            <div key={productId} className="border-t pt-4 first:border-t-0 first:pt-0">
              <div className="flex items-center justify-between">
                <div className="font-medium">{p?.name}</div>
                <div className="text-gray-800">{formatCents(p?.price)}</div>
              </div>

              <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                <div>Item price</div>
                <div>
                  {formatCents(p?.price)} * {qty} = {formatCents(itemCost)}
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <button
                  aria-label="decrease"
                  className="rounded border px-2 py-1"
                  onClick={() => dispatch(setQuantity({ productId: p?.id, quantity: Math.max(0, qty - 1) }))}
                >-</button>
                <input
                  type="number"
                  min={0}
                  value={qty}
                  onChange={(e) => dispatch(setQuantity({ productId: p?.id, quantity: Number(e.target.value) }))}
                  className="w-16 rounded border px-2 py-1"
                />
                <button
                  aria-label="increase"
                  className="rounded border px-2 py-1"
                  onClick={() => dispatch(addItem({ product: p }))}
                >+</button>
                <button
                  aria-label="remove"
                  className="ml-2 rounded border px-2 py-1"
                  onClick={() => dispatch(removeItem({ productId: p?.id }))}
                >Remove</button>
              </div>

              <div className="mt-3 text-right text-sm text-gray-700">
                <div>Item cost {formatCents(itemCost + totalItemSavings)}</div>
              </div>

              {itemSavings?.length > 0 && (
                <div className="mt-2 space-y-1 text-right text-sm text-red-600">
                  {itemSavings.map(s => (
                    <div key={s?.id}>Savings {formatCents(s?.amount)}</div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 border-t pt-4 space-y-2">
        <div className="flex justify-between"><span>Sub Total:</span><span>{formatCents(bill.subtotal)}</span></div>
        <div className="flex justify-between text-red-600"><span>Savings:</span><span>{formatCents(bill.savings.reduce((s, a) => s + a.amount, 0))}</span></div>
        <div className="flex justify-between font-semibold"><span>Total Amount:</span><span>{formatCents(bill.total)}</span></div>
      </div>
    </div>
  )
}


