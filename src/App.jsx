import { useRef, Suspense, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import AppRouter from "./router/appRouter";
import AuthRouter from "./router/authRouter";
import "./App.css";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const current_account = useSelector((state) => state.account);
  const { locale } = current_account;
  let defaultLocale = enUS;
  let antd_locale = useRef(defaultLocale);

  useEffect(() => {
    switch (locale) {
      case "zh-CN":
        antd_locale.current = zhCN;
        break;
      case "en-US":
        antd_locale.current = enUS;
        break;
    }
  }, [locale]);

  return (
    <BrowserRouter>
      <Suspense fallback="loading">
        <ConfigProvider locale={antd_locale.current}>
          {isLoggedIn ? <AppRouter /> : <AuthRouter />}
        </ConfigProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
