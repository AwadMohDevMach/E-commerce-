import useProduct from "@hooks/useProduct";
import { Container } from "react-bootstrap";
import { Products as Product } from "@components/ecommerce";
import { Loading } from "@components/feedback";
import GridList from "@components/GridList/GridList";
import { Heading } from "@components/index";

const Products = () => {
  const {loading , error , productsFullInfo , productPrams} = useProduct()

  return (
    <Container>
      <Heading title={`${productPrams?.toLocaleUpperCase()} Products`}>
      </Heading>
      <Loading loading={loading} error={error} type="product">
        <GridList
          records={productsFullInfo}
          renderItem={(record) => <Product {...record}/>}
        />
      </Loading>
    </Container>
  );
};

export default Products;
