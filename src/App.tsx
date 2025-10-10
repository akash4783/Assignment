import { ProductList } from './components/ProductList.tsx'
import { Basket } from './components/Basket.tsx'
import { CartSummary } from './components/CartSummary.tsx'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ProductList />
          </div>
          <div className="lg:col-span-2">
            <Basket />
          </div>
          <div>
            <CartSummary/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
