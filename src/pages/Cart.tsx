import useCart from "@hooks/useCart";
import { Heading } from "@components/index";
import { CartSubtotal, CartItemList } from "@components/ecommerce";
import { Loading } from "@components/feedback";
import LottieHandler from "@components/feedback/LottieHanler/LottieHanler";

const Cart = () => {
  const {
    error,
    loading,
    products,
    useAccessToken,
    placeOrderStatus,
    changeQuantityHandler,
    removeItemHandler,
  } = useCart();

  return (
    <>
      <Heading title="Your Cart"></Heading>
      <Loading loading={loading} error={error} type="cart">
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandle={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubtotal products={products} useAccessToken={useAccessToken} />
          </>
        ) : placeOrderStatus === "succeeded" ? (
          <LottieHandler
            message="your order has been placed successfully"
            type="success"
          />
        ) : (
          <LottieHandler message="your cart is empty" type="empty" />
        )}
      </Loading>
    </>
  );
};

export default Cart;
