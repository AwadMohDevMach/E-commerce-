import Container from 'react-bootstrap/Container';
import { Outlet } from 'react-router-dom';
import { Header , Footer } from '@components/index';

import styles from "./styles.module.css"
const {container,wrapper} =styles;

const MainLayout = () => {
  return (
    < Container className={container}>
      <Header/>
     <div className={wrapper}>
        <Outlet/> 
     </div>
    <Footer/>
    </Container>
  )
}

export default MainLayout
