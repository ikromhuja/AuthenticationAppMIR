import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Create from "./pages/Create";
import SingleRecept from "./components/SingleRecept";
import ProtectedRotes from "./components/ProtectedRotes";
import { useContext, useEffect } from "react";
import { GlobalContext } from "./context/useGlobalContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { action as signupAction } from "./pages/Signup";
import { action as signinAction } from "./pages/Signin";
function App() {
  const { user, dispatch, authChange } = useContext(GlobalContext);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRotes user={user}>
          <MainLayout />
        </ProtectedRotes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/create",
          element: <Create />,
        },
        {
          path: "/singleRecept/:id",
          element: <SingleRecept />,
        },
      ],
    },
    {
      path: "/signin",
      element: user ? <Navigate to="/" /> : <Signin />,
      action: signinAction,
    },
    {
      path: "/signup",
      element: user ? <Navigate to="/" /> : <Signup />,
      action: signupAction,
    },
  ]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({ type: "SIGN_IN", payload: user });
      dispatch({ type: "AUTH_CHANGE" });
    });
  }, []);
  return <>{authChange && <RouterProvider router={routes} />}</>;
}

export default App;
