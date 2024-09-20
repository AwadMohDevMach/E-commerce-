import { TCategory } from "@customTypes/shared";
import { Link } from "react-router-dom";

import styles from "./styles.module.css"
const {categoey,categoryImg,CategoryTitle,link} = styles;


const Category = ({title , img , prefix} : TCategory) => {
  return (
    <div className={categoey}>
      <Link className={link} to={`products/${prefix}`}>
      <div className={categoryImg}>
        <img src={img} alt={title} />
      </div>
      <h1 className={CategoryTitle}>{title}</h1>
      </Link>
    </div>
  )
}

export default Category
