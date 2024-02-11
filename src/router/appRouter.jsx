import { lazy } from "react";
import { useRoutes } from "react-router-dom";

const BasicLayout = lazy(() => import("@/layouts/BasicLayout.jsx"));

export default function AppRouter() {
  return useRoutes([
    {
      path: "/",
      element: <BasicLayout />,
      children: [
        {
          path: "account",
          element: <BasicLayout />,
        },
      ],
    },
  ]);
}
