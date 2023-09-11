import { ProductType } from '../context/ProductsProvider';

export async function fetchProducts(): Promise<ProductType[]> {
  const data = await fetch('http://localhost:3000/products')
    .then((res) => res.json())
    .catch((err) => {
      if (err instanceof Error) console.log(err.message);
    });
  return data;
}
