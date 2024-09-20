import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { resetOrederState } from "@store/orders/orderSlice";
import {
  actGetProductWithItem,
  changeQuqntityHandler,
  cartRemoveItem,
  cleanUpCartProductsFullInsfo,

} from "@store/cart/cartSlice";

const useCart = () => {
  const dispatch = useAppDispatch();

  const placeOrderStatus = useAppSelector(state => state.orders.loading)

  const { item, productsFullInsfo, error, loading } = useAppSelector(
    (state) => state.cart
  );

  const useAccessToken = useAppSelector((state) => state.auth.accessToken);

  const products = productsFullInsfo.map((el) => {
    return { ...el, quantity: item[el.id || 0] };
  });

  useEffect(() => {
    const promis = dispatch(actGetProductWithItem());

    return () => {
      promis.abort();
      dispatch(cleanUpCartProductsFullInsfo());
      dispatch(resetOrederState());
    };
  }, [dispatch]);

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(changeQuqntityHandler({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartRemoveItem(id));
    },
    [dispatch]
  );
  return {
    error,
    useAccessToken,
    loading,
    products,
    placeOrderStatus,
    changeQuantityHandler,
    removeItemHandler,
  };
};

export default useCart;
