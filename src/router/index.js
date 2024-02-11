import { createBrowserRouter } from "react-router-dom";
import AppRouter from "./appRouter";
import AuthRouter from "./authRouter";

export const router = createBrowserRouter({
  routes: [AppRouter, AuthRouter],
});
