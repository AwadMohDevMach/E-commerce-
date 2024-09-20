import { ProductInfo } from "@components/ecommerce";
import { Heading } from "@components/index";
import { Modal, Table, Button } from "react-bootstrap";
import { Loading } from "@components/feedback";
import useOrders from "@hooks/useOrders";



const Orders = () => {

  const {
    loading,
    error,
    showModal,
    selectedProduct,
    orderList,
    closeHanler,
    viewOrdersHandler,
  } = useOrders();
  return (
    <>
      <Modal show={showModal} onHide={closeHanler}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct.map((el) => (
            <ProductInfo
              key={el.id}
              title={el.title}
              price={el.price}
              img={el.img}
              direction="column"
              quantity={el.quantity}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeHanler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Heading title="My Order" />
      <Loading loading={loading} error={error}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>items Number</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((el) => (
              <tr key={el.id}>
                <td>#{el.id}</td>
                <td>
                  {el.items.length} item(s) {"/"}{" "}
                  <span
                    onClick={() => viewOrdersHandler(el.id)}
                    style={{ textDecoration: "underLine", cursor: "pointer" }}
                  >
                    Product Details
                  </span>
                </td>
                <td>{el.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Loading>
    </>
  );
};

export default Orders;
