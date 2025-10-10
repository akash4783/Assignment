import { useDispatch, useSelector } from 'react-redux'
import { products } from '../data/products'
import { formatCents } from '../utils/currency'
import { addItem, setQuantity } from '../store/cartSlice'
import type { RootState } from '../store/store'

export function ProductList() {
  const dispatch = useDispatch()
  const quantities = useSelector((s: RootState) => s?.cart?.items)

  return (
    <div className="rounded border bg-white p-4">
      <h2 className="mb-4 text-2xl font-semibold">Products</h2>
      <div className="space-y-4">
      {products?.map(p => (
        <div key={p?.id} className="flex items-center justify-between rounded border bg-white p-4">
          <div>
            <div className="font-medium">{p?.name}</div>
            <div className="text-sm text-gray-600">{formatCents(p?.price)}</div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              value={quantities[p?.id] ?? 0}
              onChange={(e) => dispatch(setQuantity({ productId: p?.id, quantity: Number(e.target.value) }))}
              className="w-20 rounded border px-2 py-1"
            />
            <button
              onClick={() => dispatch(addItem({ product: p }))}
              className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
            >Add</button>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}
