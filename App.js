import "./App.css";
import MealView, { loader as mealLoader } from "./components/menu/MealView";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import Root from "./pages/Root";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { sendCartData, fetchCartData } from "./store/cart-action";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/AuthPage";
import RequireAuth from "./components/RequireAuth";
import About from "./components/about/About";
import ErrorPage from "./pages/ErrorPage";

// adding routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: ":mealId",
        id: "mealId",
        element: <MealView />,
        loader: mealLoader,
      },
      {
        path: "cart",
        element: (
          <RequireAuth>
            <CartPage />
          </RequireAuth>
        ),
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "profile",
        element: (
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        ),
      },
      { path: "login", element: <LoginPage /> },
    ],
  },
]);

let isInitial = true;

// App component
function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  // setting a useeffect to fetch cart data when user is logged in
  useEffect(() => {
    if (auth.isLoggedIn) {
      dispatch(fetchCartData(auth.userId)); // to pass in the userId for fetching cartdata
    }
  }, [dispatch, auth.userId, auth.isLoggedIn]);

  // setting a useeffect to fetch crart data when the state of the cart is changed
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart, auth.userId));
    }
  }, [cart, dispatch, auth.userId]);

  return <RouterProvider router={router} />;
}

export default App;
