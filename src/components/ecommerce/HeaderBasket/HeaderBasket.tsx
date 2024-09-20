import { useEffect , useState } from "react";
import Logo from "@assets/svg/cart.svg?react"
import { useAppSelector } from "@store/hooks";
import { getCartTotalQuantitySelector } from "@store/cart/cartSlice";
import { useNavigate } from "react-router-dom";

import styles from "./HeaderBasket.module.css"
const {totlaNum,container , popupAnimate , iconWrapper} = styles;

const HeaderBasket = () => {

  const navigate = useNavigate();

  const [isAniamte , setIsAnimate] = useState(false)
  const totalQuntity = useAppSelector(getCartTotalQuantitySelector)
  const quantitySyles = `${totlaNum} ${isAniamte ? popupAnimate : ""}`

  useEffect(()=>{
    if(!totalQuntity) return

    setIsAnimate(true)

    const debounc = setTimeout(() =>{
      setIsAnimate(false)
    },300)

    return () => clearTimeout(debounc);
  },[totalQuntity])



  return (
    <div className={container} onClick={() => navigate("/cart")}>
      <div className={iconWrapper}>
      <Logo title="basket icon"></Logo>
      {
        totalQuntity > 0 &&(
          <div className={quantitySyles}>{totalQuntity}</div>
        )
      }
      </div>
      <h1>Cart</h1>
    </div>
  )
}

export default HeaderBasket
