import { ChangeEvent, ReactElement, memo } from 'react';
import { CartItemType } from '../context/CartProvider';
import { formatPrice, getImage } from '../utils';
import useCart from '../hooks/useCart';

interface CartLineItemProps {
  item: CartItemType;
}

const CartLineItem = ({ item }: CartLineItemProps) => {
  const { sku, name, qty, price } = item;
  const { dispatch, REDUCER_ACTIONS } = useCart();
  const img: string = getImage(`../images/${sku}.jpg`);

  const lineTotal: number = qty * price;

  const highestQty: number = 20 > item.qty ? 20 : item.qty;

  const optionValues: number[] = [...Array(highestQty).keys()].map(
    (i) => i + 1
  );

  const options: ReactElement[] = optionValues.map((val) => (
    <option key={`opt${val}`} value={val}>
      {val}
    </option>
  ));

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    const qty: number = Number(e.target.value);
    dispatch({ type: REDUCER_ACTIONS.QUANTITY, payload: { ...item, qty } });
  };

  const onRemoveFromCart = () => {
    dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: item });
  };

  const content = (
    <li className="cart__item">
      <img src={img} alt={name} className="cart__img" />
      <div>{name}</div>
      <div>{formatPrice(price)}</div>
      <label htmlFor="itemQty" className="offscreen">
        Item Quantity
      </label>
      <select
        name="itemQty"
        id="itemQty"
        className="cart__select"
        value={item.qty}
        onChange={onChangeQty}
      >
        {options}
      </select>
      <div className="cart__item-subtotal">{formatPrice(lineTotal)}</div>

      <button className="cart__button" onClick={onRemoveFromCart}>
        ❌
      </button>
    </li>
  );

  return content;
};

function areItemsEqual(
  prevProps: CartLineItemProps,
  nextProps: CartLineItemProps
) {
  const { item: prevItem } = prevProps;
  const { item: nextItem } = nextProps;
  return Object.keys(prevItem).every((key) => {
    return (
      prevItem[key as keyof CartItemType] ===
      nextItem[key as keyof CartItemType]
    );
  });
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(
  CartLineItem,
  areItemsEqual
);

export default MemoizedCartLineItem;
