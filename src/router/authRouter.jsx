import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const AuthLayout = lazy(() => import("@/layouts/AuthLayout.jsx"));
const Login = lazy(() => import("@/modules/Auth/Signin.jsx"));
const Reset = lazy(() => import("@/modules/Auth/Signup.jsx"));

export default function AuthRouter() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Login />}></Route>
        <Route path="index" element={<Login />}></Route>
        <Route path="reset" element={<Reset />}></Route>
      </Route>
    </Routes>
  );
}
