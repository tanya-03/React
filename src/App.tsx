import { getMoviesData } from './api/GetAPIData';
import LoginPage from './components/LoginPage';
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import { Movie } from './components/ProductPage';
import { AppLayout } from './components/AppLayout';
import { ProductPageDetails } from './components/ProductPageDetails';
import { getMovieDetails } from './api/GetMovieDetails';
import { Profile } from './components/Profile';
import { UserDetailsPage } from './components/UserDetailsPage';
import { ErrorPage } from './components/ErrorPage';
import { store } from './redux/store'; 

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/movie",
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Movie />,
          loader: getMoviesData, 
        },
        {
          path: ":movieID",
          element: <ProductPageDetails />,
          loader: getMovieDetails, 
        },
        {
          path: "profile",
          element: <Profile />,
          loader: () => { 
            const state = store.getState();
            if (!state.auth.isLoggedIn) {
              return redirect("/");
            }
          },
        },
      ],
    },
    {
      path: "/user-details/:userEmail",
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      loader: () => { 
        const state = store.getState();
        if (!state.auth.isLoggedIn) {
          return redirect("/");
        }
      },
      children: [
        {
          index: true,
          element: <UserDetailsPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;