import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  redirect,
  Outlet,
} from "react-router-dom";

import RegisterPage from "./page/registrasipage";
import LoginPage from "./page/loginpage";
import HomePage from "./page/Homepage"
import MyList from "./page/MyList"



const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    // loader: async () => {
    //   const isloggedin = localStorage.getItem("access_token");
    //   if (isloggedin) {
    //     throw redirect("/");
    //   } else {
    //     return null;
    //   }
    // },
  },
  {
    path: "/",
    element: <HomePage />,
    // loader: async () => {
    //   const isloggedin = localStorage.getItem("access_token");
    //   if (isloggedin) {
    //     throw redirect("/");
    //   } else {
    //     return null;
    //   }
    // },
  },
  {
    path: "/Mylist",
    element: <MyList />,
    // loader: async () => {
    //   const isloggedin = localStorage.getItem("access_token");
    //   if (isloggedin) {
    //     throw redirect("/");
    //   } else {
    //     return null;
    //   }
    // },
  },
  
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

