import useCategory from "@hooks/useCategory";
import { Container } from "react-bootstrap"
import {Category} from "@components/ecommerce"
import { Loading } from "@components/feedback"
import GridList from "@components/GridList/GridList";
import { Heading } from "@components/index";




const Categories = () => {

  const {loading , error, records} = useCategory()

  return (
    <Container>
      <Heading title="Category"/>
      <Loading loading={loading} error={error} type="category">
        <GridList 
        records = {records}
        renderItem={(record) => <Category {...record}/> }/>
      </Loading>
    </Container>
  )
}

export default Categories
