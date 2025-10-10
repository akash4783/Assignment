import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { buildBill } from '../utils/offers'
import { formatCents } from '../utils/currency'

export function CartSummary() {
  const items = useSelector((s: RootState) => s.cart.items)
  const bill = buildBill(items)

  return (
    <div className="rounded border bg-white p-4">
      <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
      <div className="mb-2 flex justify-between"><span>Subtotal</span><span>{formatCents(bill.subtotal)}</span></div>
      <div className="mb-2"><span className="font-medium">Special offers</span>
        <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
          {bill.savings.length === 0 && <li>No offers applied</li>}
          {bill.savings.map(s => (
            <li key={s.id} className="flex justify-between">
              <span>{s.description}</span>
              <span>{formatCents(s.amount)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex justify-between border-t pt-2 text-lg font-bold">
        <span>Total</span><span>{formatCents(bill.total)}</span>
      </div>
    </div>
  )
}
