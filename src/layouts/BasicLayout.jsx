import { useSelector } from "react-redux";
import { Alert, Layout, Space, Divider, Flex } from "antd";
import { getAnnounces } from "@/api/notice";
import { Outlet } from "react-router-dom";
import { openLegalDoc } from "@/utils/util";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import BizMenu from "./header/BizMenu";
import UserMenu from "./header/UserMenu";
import Region from "@/locale/Region";
import SearchBox from "@/modules/Search";
import { globalUrl } from "@/config/env";
import { Link } from "react-router-dom";

export default function BasicLayout() {
  const { Header, Content, Footer } = Layout;
  const current_account = useSelector((state) => state.account);
  const { locale } = current_account;
  const { t } = useTranslation();
  const curYear = new Date().getFullYear();

  let announces = useRef([]);

  useEffect(() => {
    if (current_account) {
      let currentLocale = locale || localStorage.getItem("locale") || "en-US";
      getAnnounces({ locale: currentLocale }).then((res) => {
        announces.current = res.data;
      });
    }
  }, [current_account, locale]);

  return (
    <Layout style={{ width: "1200px" }}>
      <Header>
        <div>
          <Link to="/index">
            <img
              style={{ width: "64px", height: "64px", display: "inline-block" }}
              src={`${globalUrl}logos/logo.svg`}
              alt="logo"
            />
          </Link>
        </div>
        <SearchBox
          placeholder={t("placeholder.searchbox", { ns: "global" })}
        ></SearchBox>
        <Flex>
          <BizMenu />
          <UserMenu />
          <Region />
        </Flex>
      </Header>

      <Content>
        {announces.current.forEach((item) => {
          <Alert
            closable
            banner
            type={item.type}
            message={item.content}
            style={{ marginBottom: "48px" }}
          ></Alert>;
        })}

        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </Content>

      <Footer>
        <Divider />

        <Space direction="vertical">
          <Space size="large">
            <a onClick={() => openLegalDoc("help", locale)}>
              {t("docmenu.help", { ns: "component" })}
            </a>
            <a onClick={() => openLegalDoc("privacy", locale)}>
              {t("docmenu.privacy", { ns: "component" })}
            </a>
            <a onClick={() => openLegalDoc("term", locale)}>
              {t("docmenu.term", { ns: "component" })}
            </a>
            <a onClick={() => openLegalDoc("about", locale)}>
              {t("docmenu.about", { ns: "component" })}
            </a>
          </Space>

          <Space>
            <span className="material-icons-outlined">copyright</span>
            {curYear}
            <span>{t("unit.brand", { ns: "global" })}</span>
            <span>{t("footer.title", { ns: "component" })}</span>
          </Space>
        </Space>
      </Footer>
    </Layout>
  );
}
