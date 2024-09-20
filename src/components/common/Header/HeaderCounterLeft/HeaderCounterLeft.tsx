import { useAppSelector } from "@store/hooks";
import { getCartTotalQuantitySelector } from "@store/cart/cartSlice";
import HeaderCounter from "../HeaderCounter/HeaderCounter";
import CartIcon from "@assets/svg/cart.svg?react";
import WichlistIcon from "@assets/svg/wishList.svg?react";

import styles from "./styles.module.css";
const { headerLeftBar } = styles;

const HeaderCounterLeft = () => {
  const carttotalQuntity = useAppSelector(getCartTotalQuantitySelector);
  const wishLisTotalQuantity = useAppSelector((state) => state.wishlist.itemsId.length);

  return (
    <div className={headerLeftBar}>
      <HeaderCounter
        totalQuntity={wishLisTotalQuantity}
        to="wishlist"
        title="Wishlist"
        HederIcon={<WichlistIcon />}
      />
      <HeaderCounter
        totalQuntity={carttotalQuntity}
        to="cart"
        title="Cart"
        HederIcon={<CartIcon />}
      />
    </div>
  );
};

export default HeaderCounterLeft;
