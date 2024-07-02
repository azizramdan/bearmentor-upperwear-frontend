import { Link, useLoaderData } from "react-router-dom";

import { Product } from "../types";

export async function loader() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
  const { data: products }: {
    data: Array<Product>;
  } = await response.json();

  return { products };
}

export function HomeRoute() {
  const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.slug}`}>
              <div>
                <img
                  src={product.images[0].url}
                  alt={product.title}
                  width={384}
                  height={480}
                />
                <h4>{product.title}</h4>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}