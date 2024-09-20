import {  Row, Col } from "react-bootstrap";
import LottieHandler from "@components/feedback/LottieHanler/LottieHanler";

type TGridListProps<T> = {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
};
type hasId = {id?:number}
const GridList =<T extends hasId> ({ records, renderItem }: TGridListProps<T>) => {
  const categoriesList =
    records.length > 0
      ? records.map((record) => {
          return (
            <Col
              xs={3}
              key={record.id}
              className="d-flex justify-content-center mb-5 mt-2"
            >
              {renderItem(record)}
            </Col>
          );
        })
      :<LottieHandler type="empty" message= "there are no wishlist"/> 

  return <Row>{categoriesList}</Row>;
};

export default GridList;
