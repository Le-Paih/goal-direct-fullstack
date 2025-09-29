import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/cartStore";
import GlobalStyles from "./styles/GlobalStyles";
import PageNotFound from "./pages/PageNotFound";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
import { DataProvider } from "./context/dataContext";
import { AuthProvider } from "./context/authContext";
import { Toaster } from "react-hot-toast";
import styled from "styled-components";

const Homepage = React.lazy(() => import("./pages/HomePage/Homepage"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const Signup = React.lazy(() => import("./pages/Login/Signup"));
const Success = React.lazy(() => import("./pages/Cart/Success"));
const Profile = React.lazy(() => import("./pages/Profile/Profile"));
const Cart = React.lazy(() => import("./pages/Cart/Cart"));
const NotLoggedIn = React.lazy(() => import("./pages/Profile/NotLoggedIn"));
const Boots = React.lazy(() => import("./pages/Boots/Boots"));
const BootItem = React.lazy(() => import("./pages/Boots/BootItem"));
const Kits = React.lazy(() => import("./pages/Kits/Kits"));
const KitItem = React.lazy(() => import("./pages/Kits/KitItem"));

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <Provider store={store}>
      <AuthProvider>
        <DataProvider>
          <GlobalStyles />
          <BrowserRouter>
            <ScrollToTop />
            <AppWrapper>
              <Navbar />
              <MainContent>
                <Suspense fallback={<div>Loading...</div>}>
                  <Toaster position="top-center" reverseOrder={false} />
                  <Routes>
                    <Route>
                      <Route path="/" element={<Homepage />} />
                      <Route path="login" element={<Login />} />
                      <Route path="signup" element={<Signup />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="success" element={<Success />} />
                      <Route path="notloggedin" element={<NotLoggedIn />} />
                      <Route path="signup" element={<Signup />} />
                      <Route path="boots" element={<Boots />} />
                      <Route path="boots/:bootId" element={<BootItem />} />
                      <Route path="kits" element={<Kits />} />
                      <Route path="kits/:kitId" element={<KitItem />} />
                    </Route>
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </Suspense>
              </MainContent>
              <Footer />
            </AppWrapper>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
