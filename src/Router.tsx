import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import LaptopServices from "./pages/laptop/LaptopServices";
import LaptopSpares from "./pages/laptop/LaptopSpares";
import LaptopSales from "./pages/laptop/LaptopSales";
import Counter from "./components/Counter";
import UseEffectDemo from './components/UseEffectDemo'
import WrappingChild from "./components/WrappingChild";
import Cart from "./pages/Cart";
import UseRefDemo from "./components/UseRefDemo";
// import UseMemoDemo from "./components/UseMemo";
import ProductDetails from "./components/ProductDetails";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import GenerateImage from "./pages/GenerateImage";
import AdminDashboard from "./pages/AdminDashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                index: true,
                element: <LandingPage />
            },
            {
                path: "laptop-services",
                element: <LaptopServices />
            },
            {
                path: "laptop-spares",
                element: <LaptopSpares />
            },
            {
                path: "laptop-sales",
                element: <LaptopSales />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "counter",
                element: <Counter />
            },
            {
                path: "useeffect",
                element: <UseEffectDemo />
            },
            {
                path: "wrapping",
                element: <WrappingChild />
            },
            {
                path: "cart",
                element: <Cart />
            },
            {
                path: "learnuseref",
                element: <UseRefDemo />
            },
            // {
            //     path: "learnmemo",
            //     element: <UseMemoDemo />
            // },
            {
                path: "products/:id",
                element: <ProductDetails />
            },
            {
                path: "dashboard",
                element: <ProtectedRoutes>
                    <Dashboard />
                </ProtectedRoutes>
            },
            {
                path: "generate-image",
                element: <GenerateImage />

            },
            {
                path: "dashboard/admin",
                element: <ProtectedRoutes>
                    <AdminDashboard />
                </ProtectedRoutes>,
            },
            {
                path: "*",
                element: <NotFound />
            },
        ]
    }
]);

export default router;