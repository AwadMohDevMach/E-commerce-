import CartItem from "../CartItem/CartItem";
import { TProducts } from "@customTypes/shared";

type TCartItemListProps = {
  products: TProducts[];
  changeQuantityHandle: (id: number, quantiity: number) => void;
  removeItemHandler: (id: number) => void;
};

const CartItemList = ({
  products,
  changeQuantityHandle,
  removeItemHandler,
}: TCartItemListProps) => {
  const renderList = products.map((el) => (
    <CartItem
      key={el.id}
      {...el}
      changeQuantityHandle={changeQuantityHandle}
      removeItemHandler={removeItemHandler}
    />
  ));
  return <div>{renderList}</div>;
};

export default CartItemList;
