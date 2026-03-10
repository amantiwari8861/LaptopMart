import { Outlet, useLocation } from "react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import ChatBot from "./components/ChatBot";

function Layout() {
    const location = useLocation();
    return <>
        <ToastContainer />
        <ChatBot/>
        <Navbar />
        <Outlet />
        {
            location.pathname !== "/login" && <Footer />
        }
    </>;
};
export default Layout;