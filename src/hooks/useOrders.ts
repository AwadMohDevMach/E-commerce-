import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetOrders from "@store/orders/act/actGetOrders";
import { TProducts } from "@customTypes/shared";
import { resetOrederState } from "@store/orders/orderSlice";

const useOrders = () => {
  const dispatch = useAppDispatch();
  const { loading, error, orderList } = useAppSelector((state) => state.orders);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProducts[]>([]);

  useEffect(() => {
    const promis = dispatch(actGetOrders());
    return () => {
      promis.abort();
      dispatch(resetOrederState());
    };
  }, [dispatch]);

  const viewOrdersHandler = (id: number) => {
    const productDetail = orderList.find((order) => order.id === id);
    // const newItmes = productDetail?.items ?? [];

    setShowModal(true);
    setSelectedProduct((prev) => [...prev, ...(productDetail?.items ?? [])]);
  };

  const closeHanler = () => {
    setShowModal(false);
    setSelectedProduct([]);
  };

  return {
    error,
    loading,
    showModal,
    orderList,
    selectedProduct,
    closeHanler,
    viewOrdersHandler,
  };
};

export default useOrders;
