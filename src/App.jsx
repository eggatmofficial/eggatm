


// import { BrowserRouter } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import AppRoutes from "./routes/AppRoutes";
// import { getCartAPI } from "./api/cart.api";
// import { setCartFromBackend } from "./store/cart.store";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMyProfile, restoreAuth } from "./store/auth.store";
// import {jwtDecode} from "jwt-decode";
// import ScrollToTop from "./components/common/ScrollToTop";

// function App() {
//     const dispatch = useDispatch();

// useEffect(() => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     dispatch(restoreAuth({ token }));
//     dispatch(fetchMyProfile());
//   }
// }, []);

//   const { isAuthenticated } = useSelector(state => state.auth);
//     useEffect(() => {
//     if (isAuthenticated) {
//       getCartAPI()
//         .then(res => {
//           dispatch(setCartFromBackend(res.data.data));
//         })
//         .catch(() => {
//           dispatch(setCartFromBackend({ items: [] }));
//         });
//     }
//   }, [isAuthenticated]);


//   return (
//     <BrowserRouter>
//     <ScrollToTop />
//       <Toaster position="top-center" />
//       <AppRoutes />
//     </BrowserRouter>
//   );
// }

// export default App;





import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import { getCartAPI } from "./api/cart.api";
import { setCartFromBackend } from "./store/cart.store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProfile, restoreAuth } from "./store/auth.store";
import {jwtDecode} from "jwt-decode";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
    const dispatch = useDispatch();

useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    dispatch(restoreAuth({ token }));
    dispatch(fetchMyProfile());
  }
}, []);

  const { isAuthenticated } = useSelector(state => state.auth);
    useEffect(() => {
    if (isAuthenticated) {
      getCartAPI()
        .then(res => {
          dispatch(setCartFromBackend(res.data.data));
        })
        .catch(() => {
          dispatch(setCartFromBackend({ items: [] }));
        });
    }
  }, [isAuthenticated]);


  return (
    <BrowserRouter>
    <ScrollToTop />
      <Toaster position="top-center" />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
