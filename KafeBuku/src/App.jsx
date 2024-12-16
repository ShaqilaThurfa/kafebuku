import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  Outlet,
} from "react-router-dom";

import RegisterPage from "./page/registrasipage";
import LoginPage from "./page/loginpage";
import HomePage from "./page/Homepage";
import MyList from "./page/MyList";
import NavBar from "./component/navbar";
import AdminPage from "./page/AdminPage";
import Histories from "./page/PageHistories";
import NavBarAdmin from "./component/navbarAdmin";
import AllHistories from "./page/AllHistoriesPage";

const checkAuthLoader = async () => {
  const isLoggedIn = localStorage.getItem("access_token");
  if (!isLoggedIn) {
    throw redirect("/login"); 
  } else{
    return null
  }
};

const checkisLogin = async () => {
  const isLoggedIn = localStorage.getItem("access_token");
  if (isLoggedIn) {
    throw redirect("/"); 
  } else{
    return null
  }
}

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: checkisLogin,
  },
  {
   
    element: (
      <>
        <NavBar />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: checkAuthLoader, 
      },
      {
        path: "/mylist",
        element: <MyList />,
        loader: checkAuthLoader,
      },
      {
        path: "/all-users",
        element: 
        <>
        <NavBarAdmin />
        <AdminPage />
        </>,
        loader: checkAuthLoader,
      },
      {
        path: "/all-histories",
        element: 
        <>
        <NavBarAdmin />
        <AllHistories />
        </>,
        loader: checkAuthLoader,
      },
      {
        path: "/myhistories",
        element: <Histories />,
        loader: checkAuthLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
