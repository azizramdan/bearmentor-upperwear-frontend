import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import { RootRoute } from "./routes/root";
import * as homeRoute from "./routes/home";
import * as collectionRoute from "./routes/collections";
import * as productDetailRoute from "./routes/products";
import * as cartRoute from './routes/cart'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    children: [
      {
        path: "/",
        element: <homeRoute.HomeRoute />,
        loader: homeRoute.loader,
      },
      {
        path: '/collections/:slug',
        element: <collectionRoute.CollectionRoute />,
        loader: collectionRoute.loader,
      },
      {
        path: '/products/:slug',
        element: <productDetailRoute.ProductDetailRoute />,
        loader: productDetailRoute.loader,
        action: productDetailRoute.action
      },
      {
        path: '/cart',
        element: <cartRoute.CartRoute />,
        loader: cartRoute.loader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
