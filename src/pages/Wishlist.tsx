import useWishlist from "@hooks/useWishlist";
import { Products as Product } from "@components/ecommerce";
import { Loading } from "@components/feedback";
import GridList from "@components/GridList/GridList";
import { Heading } from "@components/index";

const Wishlist = () => {

  const {loading , error , recoreds} = useWishlist()

  return (
    <>
        <Heading title="Your Wishlist"/>
      <Loading loading={loading} error={error}>
        <GridList
          records={recoreds}
          renderItem={(record) => <Product {...record}/>}
        />
      </Loading>
    </>
  )
}

export default Wishlist
