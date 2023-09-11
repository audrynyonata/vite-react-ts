import Product from './Product';
import useProducts from '../hooks/useProductList';
import useCart from '../hooks/useCart';
import { ReactNode } from 'react';

const ProductList = () => {
  const { products } = useProducts();
  const { cart } = useCart();

  let pageContent: ReactNode = <p>Loading...</p>;

  if (products?.length) {
    pageContent = products.map((product) => {
      const inCart: boolean = cart.some((item) => item.sku === product.sku);
      return <Product key={product.sku} product={product} inCart={inCart} />;
    });
  }
  const content = <main className="main main--products">{pageContent}</main>;
  return content;
};

export default ProductList;
