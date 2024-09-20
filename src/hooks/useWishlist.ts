import { useEffect } from "react";
import {actGetWishlist , productsFullInfoCleanUp} from "@store/wishlist/wishlistSlice"
import { useAppDispatch  , useAppSelector} from "@store/hooks"

const useWishlist = () => {
    const dispatch = useAppDispatch()
    const { loading, error, productsFullInfo } = useAppSelector((state) => state.wishlist);
    const cartItem = useAppSelector((state) => state.cart.item);


    useEffect(()=>{
        const promis = dispatch(actGetWishlist("productsFullInfo"))

        return () => {
          promis.abort()
            dispatch(productsFullInfoCleanUp())
        }
    },[dispatch])

    const recoreds = productsFullInfo.map((el) => {
        return {
          ...el,
          quantity: cartItem[el.id || 0],
          isLiked: true,
          isAuthnticated :true 
        };
      });
  return {loading, error , recoreds}
}

export default useWishlist
