import ContentLoader from "react-content-loader";
import { Col, Row } from "react-bootstrap";

const SkeletonCategories = () => {
  const renderSkeletons = Array(4)
    .fill(0)
    .map((_, idx) => {
      return (
        <Col key={idx}>
          <ContentLoader
            speed={2}
            width={180}
            height={180}
            viewBox="0 0 180 180"
            backgroundColor="#dfdddd"
            foregroundColor="#ecebeb"
          >
            <rect x="46" y="166" rx="4" ry="4" width="94" height="9" />
            <circle cx="86" cy="75" r="76" />
          </ContentLoader>
        </Col>
      );
    });

  return <Row>{renderSkeletons}</Row>;
};

export default SkeletonCategories;
