import { useAppDispatch, useAppSelector } from "@store/hooks";
import { NavLink } from "react-router-dom";
import { Badge, Nav, Navbar, Container, Dropdown } from "react-bootstrap";
import HeaderCounterLeft from "./HeaderCounterLeft/HeaderCounterLeft";
import { authLogout } from "@store/auth/authSlice";
import actGetWishlist from "@store/wishlist/actGetWishlist";

import styles from "./styles.module.css";
import { useEffect } from "react";
const { headerLogo, headerContainer } = styles;

const Header = () => {
  const dispatch = useAppDispatch();

  const { accessToken, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) {
      dispatch(actGetWishlist("productsId"));
    }
  }, [dispatch, accessToken]);

  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>Our</span> <Badge bg="info">E-com</Badge>
        </h1>
        <HeaderCounterLeft />
      </div>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="home">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="categories">
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to="About-us">
                About
              </Nav.Link>
            </Nav>
            <Nav>
              {!accessToken ? (
                <>
                  {" "}
                  <Nav.Link as={NavLink} to="login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="register">
                    Register
                  </Nav.Link>
                </>
              ) : (
                <Dropdown>
                  <Dropdown.Toggle
                    style={{ color: "#fff" }}
                    variant="info"
                    id="dropdown-basic"
                  >
                    Welcome : {user?.firstName}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={NavLink} to="profile" end>
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={NavLink} to="profile/orders">
                      Orders
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      as={NavLink}
                      to="/"
                      onClick={() => dispatch(authLogout())}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
