import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useAppDispatch } from "@store/hooks";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
import { addToCart } from "@store/cart/cartSlice";
import { TProducts } from "@customTypes/shared";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import ProductInfo from "../ProductInfo/ProductInfo";

import styles from "./styles.module.css";
const {maximumNotice, wishlistBtn } = styles;

const Products = ({
  id,
  title,
  img,
  price,
  max,
  quantity,
  isLiked,
  isAuthnticated,
}: TProducts & { isLiked: boolean }) => {
  
  const dispatch = useAppDispatch();

  const [modalShow, setModalShow] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  
  const [isDisabled, setIsDisabled] = useState(false);
  
  const currentRemainingQuantity = max - (quantity ?? 0);
  
  const quntityReachedToMax = currentRemainingQuantity <= 0 ? true : false;


  useEffect(() => {
    if (!isDisabled) {
      return;
    }

    const debouce = setTimeout(() => {
      setIsDisabled(false);
    }, 300);

    return () => clearTimeout(debouce);
  }, [isDisabled]);

  const addCartHanlder = () => {
    dispatch(addToCart(id));
    setIsDisabled(true);
  };

  const actLikeToggleHndler = () => {
    if(isAuthnticated){
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      dispatch(actLikeToggle(id))
        .unwrap()
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    }else{
      setModalShow(true)
    }
    }

  return (
    <>
    <Modal show={modalShow} onHide={()=> setModalShow(false)}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>You need to login first to add this.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
      </Modal>

      <ProductInfo title={title} price={price} img={img} direction="row">
        <div className={wishlistBtn} onClick={actLikeToggleHndler}>
          {isLoading ? (
            <Spinner animation="border" size="sm" variant="primary" />
          ) : isLiked ? (
            <LikeFill />
          ) : (
            <Like />
          )}
        </div>
        <p className={maximumNotice}>
          {quntityReachedToMax
            ? "you reached to the limit"
            : `you can add ${currentRemainingQuantity} item(s)`}
        </p>
        <Button
          variant="info"
          style={{ color: "#fff" , width: "100%"}}
          onClick={addCartHanlder}
          disabled={isDisabled || quntityReachedToMax}
        >
          {isDisabled ? (
            <>
              <Spinner animation="border" size="sm" />
              ...loading
            </>
          ) : (
            "Add To Cart"
          )}
        </Button>
      </ProductInfo>
    </>
  );
};

export default Products;
