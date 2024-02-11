import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const UserLayout = lazy(() => import("@/layouts/UserLayout.jsx"));
const Login = lazy(() => import(""));
const Reset = lazy(() => import(""));

export default function AuthRouter() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Login />}></Route>
        <Route path="index" element={<Login />}></Route>
        <Route path="reset" element={<Reset />}></Route>
      </Route>
    </Routes>
  );
}
