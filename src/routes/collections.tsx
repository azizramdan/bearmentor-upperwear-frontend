import type { Params } from 'react-router-dom'
import { Link, useLoaderData } from 'react-router-dom'
import type { Product } from '@/types'
import api from '@/utils/api'
import { toRupiah } from '@/utils/format'

export async function loader({ params }: { params: Params<'slug'> }) {
  const response = await api<{
    data: Array<Product>
  }>(`/collections/${params.slug}`)

  return { products: response.data }
}

export function CollectionRoute() {
  const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>

  const getPriceRange = (priceRange: Array<number>) => {
    const low = priceRange[0]
    const high = priceRange[priceRange.length - 1]

    return low === high ? toRupiah(low) : `${toRupiah(low)} - ${toRupiah(high)}`
  }

  return (
    <>
      <ul className="grid grid-cols-4 gap-10">
        {products.map(product => (
          <li key={product.id} className="flex justify-center">
            <div className="w-fit">
              <Link to={`/products/${product.slug}`} className="block">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  width={384}
                  height={480}
                />
              </Link>
              <Link to={`/products/${product.slug}`} className="block mt-5">
                <h4 className="text-lg text-center text-gray-600">{product.title}</h4>
              </Link>
              <h4 className="text-center mt-2 text-gray-500">{getPriceRange(product.priceRange)}</h4>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
