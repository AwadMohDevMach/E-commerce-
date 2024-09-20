import {
  createBrowserRouter as Router,
  RouterProvider,
} from "react-router-dom";
import { lazy, Suspense } from "react";

// we stopped Dynamic Segments 

// layouts
const MainLayout = lazy(() => import("../layouts/MainLayout/MainLayout"));
const ProfileLayout = lazy(
  () => import("../layouts/ProfileLayout/ProfileLayout")
);

// pages
const Home = lazy(() => import("../pages/Home"));
const Categories = lazy(() => import("../pages/Categories"));
const Products = lazy(() => import("../pages/Products"));
const Cart = lazy(() => import("../pages/Cart"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const AboutUS = lazy(() => import("../pages/AboutUs"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const Account = lazy(() => import("../pages/Account"));
const Orders = lazy(() => import("../pages/Orders"));

// Protected Router
import ProtectedRout from "@components/Auth/ProtectedRout";

const router = Router([
  {
    path: "/",
    element: (
      <Suspense fallback="loading please wait...">
        <MainLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback="loading please wait...">
            <Home />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense fallback="loading please wait...">
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRout>
            <Suspense fallback="loading please wait...">
              <Wishlist />
            </Suspense>
          </ProtectedRout>
        ),
      },
      {
        path: "home",
        element: (
          <Suspense fallback="loading please wait...">
            <Home />
          </Suspense>
        ),
      },
      {
        path: "categories",
        element: (
          <Suspense fallback="loading please wait...">
            <Categories />
          </Suspense>
        ),
      },
      {
        path: "categories/products/:prefix",
        element: (
          <Suspense fallback="loading please wait...">
            <Products />
          </Suspense>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("category not found", {
              status: 400,
              statusText: "bad request",
            });
          }
          return true;
        },
      },
      {
        path: "about-us",
        element: (
          <Suspense fallback="loading please wait...">
            <AboutUS />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback="loading please wait...">
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback="loading please wait...">
            <Register />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRout>
            <Suspense fallback="loading please wait...">
              <ProfileLayout />
            </Suspense>
          </ProtectedRout>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback="loading please wait...">
                <Account />
              </Suspense>
            ),
          },
          {
            path: "orders",
            element: (
              <Suspense fallback="loading please wait...">
                <Orders />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};


export default AppRouter;
