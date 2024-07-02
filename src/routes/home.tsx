import { Link, useLoaderData } from "react-router-dom";
import { Product } from "../types";
import { toRupiah } from "@/utils/format";

export async function loader() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
  const { data: products }: {
    data: Array<Product>;
  } = await response.json();

  return { products };
}

export function HomeRoute() {
  const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  const getPriceRange = (priceRange: Array<number>) => {
    const low = priceRange[0]
    const high = priceRange[priceRange.length - 1]

    return low === high ? toRupiah(low) : `${toRupiah(low)} - ${toRupiah(high)}`
  }

  return (
    <>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.slug}`}>
              <div>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  width={384}
                  height={480}
                />
                <h4 className="text-lg">{product.title}</h4>
                <h4>{getPriceRange(product.priceRange)}</h4>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}