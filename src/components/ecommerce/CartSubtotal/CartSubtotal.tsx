import { useState } from "react";
import { useAppDispatch } from "@store/hooks";
import actPlaceOreder from "@store/orders/act/actPlaceOreder";
import { clearCartAfterPlaceOlder } from "@store/cart/cartSlice";
import { TProducts } from "@customTypes/shared";
import styles from "./styles.module.css";
import { Button, Modal, Spinner } from "react-bootstrap";

type CartSubtotalProps = {
  products: TProducts[];
  useAccessToken: string | null;
};

const CartSubtotal = ({ products, useAccessToken }: CartSubtotalProps) => {
  const subtotal = products.reduce((acc, curr) => {
    const price = curr.price;
    const quntity = curr.quantity;
    return acc + (price as number) * quntity;
  }, 0);

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const modalHandler = () => {
    setShowModal(!showModal);
  };

  const PalceOredreHandler = () => {
    setLoading(true);
    dispatch(actPlaceOreder(subtotal))
      .unwrap()
      .then(() => {
        dispatch(clearCartAfterPlaceOlder());
        setShowModal(false);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <Modal show={showModal} onHide={modalHandler} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Placing Oreder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          are you sure want to place order with subtotal: {subtotal.toFixed()}
          {!loading && error && (
            <p style={{ color: "#dc3545", marginTop: "10px" }}>{error}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalHandler}>
            Close
          </Button>
          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={PalceOredreHandler}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm"></Spinner> Loading...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={styles.container}>
        <span>Subtotal:</span>
        <span>{subtotal.toFixed(2)}</span>
      </div>
      {useAccessToken && (
        <div className={styles.container}>
          <span></span>
          <Button
            variant="info"
            style={{ color: "#fff" }}
            onClick={modalHandler}
          >
            Place Order
          </Button>
        </div>
      )}
    </>
  );
};

export default CartSubtotal;
