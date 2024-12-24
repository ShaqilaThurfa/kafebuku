import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  Outlet,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import NavBar from "./component/navbar";
import NavBarAdmin from "./component/navbarAdmin";
import PropTypes from 'prop-types';


const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);


const LazyLoader = ({ children }) => (
  <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
);

LazyLoader.propTypes = {
  children: PropTypes.node.isRequired, 
};


const RegisterPage = lazy(() => import("./page/registrasipage"));
const LoginPage = lazy(() => import("./page/loginpage"));
const HomePage = lazy(() => import("./page/Homepage"));
const MyList = lazy(() => import("./page/MyList"));
const AdminPage = lazy(() => import("./page/AdminPage"));
const Histories = lazy(() => import("./page/PageHistories"));
const AllHistories = lazy(() => import("./page/AllHistoriesPage"));

// Auth loaders
const checkAuthLoader = async () => {
  const isLoggedIn = localStorage.getItem("access_token");
  if (!isLoggedIn) {
    throw redirect("/login");
  }
  return null;
};

const checkisLogin = async () => {
  const isLoggedIn = localStorage.getItem("access_token");
  if (isLoggedIn) {
    throw redirect("/");
  }
  return null;
};

// Router setup
const router = createBrowserRouter([
  {
    path: "/register",
    element: (
      <LazyLoader>
        <RegisterPage />
      </LazyLoader>
    ),
  },
  {
    path: "/login",
    element: (
      <LazyLoader>
        <LoginPage />
      </LazyLoader>
    ),
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
        element: (
          <LazyLoader>
            <HomePage />
          </LazyLoader>
        ),
        loader: checkAuthLoader,
      },
      {
        path: "/mylist",
        element: (
          <LazyLoader>
            <MyList />
          </LazyLoader>
        ),
        loader: checkAuthLoader,
      },
      {
        path: "/all-users",
        element: (
          <LazyLoader>
            <>
              <NavBarAdmin />
              <AdminPage />
            </>
          </LazyLoader>
        ),
        loader: checkAuthLoader,
      },
      {
        path: "/all-histories",
        element: (
          <LazyLoader>
            <>
              <NavBarAdmin />
              <AllHistories />
            </>
          </LazyLoader>
        ),
        loader: checkAuthLoader,
      },
      {
        path: "/myhistories",
        element: (
          <LazyLoader>
            <Histories />
          </LazyLoader>
        ),
        loader: checkAuthLoader,
      },
    ],
  },
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
