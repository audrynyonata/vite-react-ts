import { memo } from 'react';
import { ProductType } from '../context/ProductsProvider';
import { useCart } from '../hooks/useCart';
import { formatPrice, getImage } from '../utils';

interface ProductProps {
  product: ProductType;
  inCart: boolean;
}

const Product = ({ product, inCart }: ProductProps) => {
  const { dispatch, REDUCER_ACTIONS } = useCart();
  const { sku, name, price } = product;

  const img: string = getImage(`../images/${sku}.jpg`);

  const onAddToCart = () => {
    dispatch({
      type: REDUCER_ACTIONS.ADD,
      payload: { ...product, qty: 1 },
    });
  };

  const itemInCart = inCart ? 'Item in Cart: ✔️' : null;

  const content = (
    <article className="product">
      <h3>{name}</h3>
      <img src={img} alt={name} className="product__img" />
      <p>
        {formatPrice(price)}
        {itemInCart}
      </p>
      <button onClick={onAddToCart}>Add to Cart</button>
    </article>
  );

  return content;
};

function areProductsEqual(prevProps: ProductProps, nextProps: ProductProps) {
  const { product: prevProduct, inCart: prevInCart } = prevProps;
  const { product: nextProduct, inCart: nextInCart } = nextProps;
  return (
    Object.keys(prevProduct).every((key) => {
      return (
        prevProduct[key as keyof ProductType] ===
        nextProduct[key as keyof ProductType]
      );
    }) && prevInCart === nextInCart
  );
}

const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default MemoizedProduct;
