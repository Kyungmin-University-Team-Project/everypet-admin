import React from 'react';
import ProtectedRoute from "./utils/route/ProtectedRoute";
import DashBoard from "./page/dashBoard/DashBoard";
import App from "./App";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import OrderManagement from "./page/orderManagement/OrderManagement";
import ProductManagement from "./page/productManagement/ProductManagement";
import CustomerInquiries from "./page/customerInquiries/CustomerInquiries";
import SalesAnalysis from "./page/salesAnalysis/SalesAnalysis";
import RestrictedRoute from "./utils/route/RestrictedRoute";
import Login from "./page/auth/Login";
import Agreement from "./page/auth/Agreement";
import Signup from "./page/auth/Signup";
import IdFind from "./page/auth/IdFind";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import store from "./redux/store/store";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute />, // App 자체를 ProtectedRoute로 감싸기
        children: [
            {
                path: "/",
                element: <App />, // App을 보호된 경로 하위에 배치
                children: [
                    {
                        path: "dashBoard",
                        element: <DashBoard />,
                    },
                    {
                        path: "order-management",
                        element: <OrderManagement />,
                    },
                    {
                        path: "product-management",
                        element: <ProductManagement />,
                    },
                    {
                        path: "customer-inquiries",
                        element: <CustomerInquiries />,
                    },
                    {
                        path: "sales-analysis",
                        element: <SalesAnalysis />,
                    },
                ],
            },
        ],
    },
    // 비로그인 유저만 접근 가능
    {
        path: "/",
        element: <RestrictedRoute/>,
        children: [
            {path: "login", element: <Login/>},
            {path: "agreement", element: <Agreement/>},
            {path: "signup", element: <Signup/>},
            {path: "idFind", element: <IdFind/>},
        ],
    },
]);

const root = createRoot(document.getElementById('root')!);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
);