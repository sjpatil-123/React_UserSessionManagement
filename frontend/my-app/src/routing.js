import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./components/Register";
import Users from "./components/Users";
import Login from "./components/Login";

const customRouter = createBrowserRouter([
    {
        path: "",
        element: <App/>,
        children: [

            {
                path: "/",
                element:<Login/>
            },
            {
                path: "/register",
                element: <Register/>
            },
            {
                path:"/users",
                element: <Users/>
            }
        ],
    }
]);
export default customRouter;