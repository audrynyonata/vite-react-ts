import {
  ReactElement,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from 'react';
import { fetchProducts } from '../requests';

export type ProductType = {
  sku: string;
  name: string;
  price: number;
};

export type ProductsContextValueType = {
  products: ProductType[];
};

const defaultValue: ProductsContextValueType = { products: [] };

const ProductsContext = createContext<ProductsContextValueType>(defaultValue);

interface ProductsProviderProps {
  children?: ReactNode;
}

export const ProductsProvider = ({
  children,
}: ProductsProviderProps): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    fetchProducts().then((products) => setProducts(products));
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
