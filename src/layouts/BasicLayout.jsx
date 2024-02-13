import { useSelector } from "react-redux";
import { Alert } from "antd";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import { getAnnounces } from "@/api/notice";
import { Outlet } from "react-router-dom";
//import { SocketContextProvider } from "../contexts/SocketContext";
import { useEffect, useRef } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function BasicLayout() {
  const curUser = useSelector((state) => state.curUser);
  const locale = useSelector((state) => state.locale);
  let announces = useRef([]);

  useEffect(() => {
    if (curUser) {
      let currentLocale = locale || localStorage.getItem("locale") || "en-US";
      getAnnounces({ locale: currentLocale }).then((res) => {
        announces.current = res.data;
      });
    }
  }, [curUser, locale]);

  return (
    <section
      className="flex flex-auto flex-col min-h-screen bg-zinc-100"
      style={{ width: "1200px" }}
    >
      {/* <SocketContextProvider> */}
      <GlobalHeader />

      <main className="flex-auto min-h-0 mt-6">
        {announces.current.forEach((item) => {
          <Alert
            closable
            banner
            type={item.type}
            message={item.content}
            className="mb-6"
          ></Alert>;
        })}

        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>

      <footer className="flex-auto text-stone-500 text-sm bg-zinc-100 px-10 py-5">
        <GlobalFooter />
      </footer>
      {/* </SocketContextProvider> */}
    </section>
  );
}
