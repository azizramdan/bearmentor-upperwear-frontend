import api from "@/utils/api";
import { toRupiah } from "@/utils/format";
import { useLoaderData } from "react-router-dom";

type Item = {
  id: string
  quantity: number
  variant: {
    id: string
    title: string
    stock: number
    price: number
    product: {
      images: Array<{
        url: string
      }>
    }
    optionValue1: {
      value: string
    }
    optionValue2: {
      value: string
    } | null
    optionValue3: {
      value: string
    } | null
  }
}

export async function loader() {
  const response = await api<{
    data: Array<Item>
  }>('/cart');

  return { items: response.data }
}

export function CartRoute() {
  const { items } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <>
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <img
            src={item.variant.product.images[0].url}
            alt={item.variant.title}
            width={120}
            height={150}
          />
          <h4 className="text-lg text-gray-600">{item.variant.title}</h4>
          <h4 className="text-lg text-gray-500">{item.variant.optionValue1.value}</h4>
          <h4 className="text-lg text-gray-500">{item.variant.optionValue2?.value}</h4>
          <h4 className="text-lg text-gray-500">{item.variant.optionValue3?.value}</h4>
          <h4 className="text-lg text-gray-500">{toRupiah(item.variant.price)}</h4>
          <input type="number" min={1} id="quantity" name="quantity" value={item.quantity} />
        </li>
      ))}
    </ul>
    </>
  );
}