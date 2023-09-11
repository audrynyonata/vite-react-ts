import { useContext } from 'react';
import ProductsContext, {
  ProductsContextValueType,
} from '../context/ProductsProvider';

export function useProducts(): ProductsContextValueType {
  return useContext(ProductsContext);
}

export default useProducts;
