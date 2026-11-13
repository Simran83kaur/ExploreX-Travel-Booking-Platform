import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

function Layout() {

  return (
    <>

      <Navbar />

      <Outlet />

      <Footer />

      <ScrollToTop />

    </>
  );

}

export default Layout;