import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByCatPrefix } from "@store/act/actGetProductsByCatPrefix";
import { useParams } from "react-router-dom";
import { cleaUPproductsRecords } from "@store/products/productsSlice";

const useProduct = () => {
    const params = useParams();

    const productPrams = params.prefix
    
    const dispatch = useAppDispatch();
    
    const { loading, error, records } = useAppSelector((state) => state.products);
    
    const cartItem = useAppSelector((state) => state.cart.item);
  
    const wishlistItemsId = useAppSelector((state) => state.wishlist.itemsId);

    const useAccessToken = useAppSelector((state) => state.auth.accessToken)
  
    const productsFullInfo = records.map((el) => {
      return {
        ...el,
        quantity: cartItem[el.id || 0],
        isLiked: wishlistItemsId.includes(el.id),
        isAuthnticated : useAccessToken ? true : false
      };
    });
  
    useEffect(() => {
      const promis = dispatch(actGetProductsByCatPrefix(params.prefix as string));
      return () => {
        promis.abort()
        dispatch(cleaUPproductsRecords());
      };
    }, [dispatch, params]);
  return {loading , error , productsFullInfo , productPrams}
}

export default useProduct
