import { useEffect , useState } from "react";
import Logo from "@assets/svg/wishList.svg?react"
import { useNavigate } from "react-router-dom";
import styles from "./HeaderWishlist.module.css"
import { useAppSelector } from "@store/hooks";
const {totlaNum,container , popupAnimate , iconWrapper} = styles;

const HeaderWishlist = () => {

  const navigate = useNavigate();

  const [isAniamte , setIsAnimate] = useState(false)
  const totalQuntity  = useAppSelector(state => state.wishlist.itemsId)
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
    <div className={container} onClick={() => navigate("/wishlist")}>
      <div className={iconWrapper}>
      <Logo title="basket icon"></Logo>
      {
        totalQuntity.length > 0 &&(
          <div className={quantitySyles}>{totalQuntity.length}</div>
        )
      }
      </div>
      <h1>WishList</h1>
    </div>
  )
}

export default HeaderWishlist
