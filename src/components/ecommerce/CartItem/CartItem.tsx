import { memo } from "react";
import { Form, Button } from "react-bootstrap";
import { TProducts } from "@customTypes/shared";
import React from "react";
import ProductInfo from "../ProductInfo/ProductInfo";

import styles from "./styles.module.css";
const { cartItemSelection,cartItem } =
  styles;

type CartItemProps = TProducts & {
  changeQuantityHandle: (id: number, quantiity: number) => void;
  removeItemHandler: (id: number) => void;
};

const CartItem = memo(
  ({
    id,
    title,
    img,
    price,
    max,
    quantity,
    changeQuantityHandle,
    removeItemHandler,
  }: CartItemProps) => {
    const renderOptions = Array(max)
      .fill(0)
      .map((_, idx) => {
        const quantiity = ++idx;
        return (
          <option value={quantiity} key={quantiity}>
            {quantiity}
          </option>
        );
      });

      console.log(quantity)
    const changeQuntity = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const quantity = +event.target.value;
      changeQuantityHandle(id, quantity);
    };
    const removeItem =() => {
      removeItemHandler(id)
    }
    return (
      <div className={cartItem}>
        <ProductInfo title={title} price={price} img={img} direction="column">
            <Button
              variant="secondary"
              style={{ color: "white" }}
              className="mt-auto"
              onClick={removeItem}
            >
              Remove
            </Button>
          </ProductInfo>
        <div className={cartItemSelection}>
          <span className="d-block mb-2">Quanitiy</span>
          <Form.Select value={quantity} onChange={changeQuntity}>
            {renderOptions}
          </Form.Select>
        </div>
      </div>
    );
  }
);

export default CartItem;
