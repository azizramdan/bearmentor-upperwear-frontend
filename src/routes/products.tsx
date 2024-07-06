import { Button } from "@/components/ui/button";
import api from "@/utils/api";
import { toRupiah } from "@/utils/format";
import { useState } from "react";
import { ActionFunctionArgs, Form, Params, useLoaderData } from "react-router-dom";

type ProductDetail = {
  id: string
  title: string
  descriptionHtml: string
  images: Array<{
    id: string
    url: string
  }>
  options: Array<{
    id: string
    name: string
    index: number
    values: Array<{
      id: string
      value: string
    }>
  }>
  variants: Array<{
    id: string
    title: string
    stock: number
    price: number
    imageId: string
    optionValueId1: string
    optionValueId2: string
    optionValueId3: string
  }>
}

export async function loader({ params }: { params: Params<'slug'> }) {
  const response = await api<{
    data: ProductDetail
  }>(`/products/${params.slug}`);

  return { product: response.data }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()

  await api('/carts', {
    method: 'post',
    body: {
      productId: formData.get('productId'),
      productVariantId: formData.get('productVariantId'),
      quantity: formData.get('quantity'),
    }
  })

  alert('Success')
  
  return false
}

export function ProductDetailRoute() {
  const { product } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  const [selectedVariant] = useState(product.variants[0]);

  return (
    <>
      <img
        src={product.images[0].url}
        alt={product.title}
        width={384}
        height={480}
      />
      <h4 className="text-lg text-gray-600">{product.title}</h4>
      <h4 className="mt-2 text-gray-500">{toRupiah(selectedVariant.price)}</h4>
      
      <div className="mt-6">
        {product.options.map(option => (
          <div key={option.id}>
            <div>{option.name}:</div>
            <ul className="flex gap-3">
              {option.values.map(value => (
                <li key={value.id}>
                  <button className="border w-10 h-10">{value.value}</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Form method="post">
          <div>
            <input type="hidden" name="productId" value={product.id} />
            <input type="hidden" name="productVariantId" value={selectedVariant.id} />

            <div>
              <label htmlFor="quantity"></label>
              <input type="number" min={1} id="quantity" name="quantity" required />
            </div>
          </div>
          <Button type="submit" className="mt-4">Tambah ke Keranjang</Button>
        </Form>
      </div>

      <div className="mt-6">
        <h3>Deskripsi Barang</h3>
        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></div>
      </div>
    </>
  );
}