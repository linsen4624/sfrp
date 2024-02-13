import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Region from "@/locale/Region.jsx";
import { globalUrl } from "@/api/env";
import { openLegalDoc } from "@/utils/util";
import { Outlet } from "react-router-dom";
import { Layout, Space, Typography, Flex } from "antd";

export default function AuthLayout() {
  const { Content, Footer } = Layout;
  const { Title, Text } = Typography;
  const { t } = useTranslation();
  const current_account = useSelector((state) => state.account);
  const { locale } = current_account;
  const background = { backgroundImage: `'url(${globalUrl}background.jpg)'` };

  return (
    <Layout>
      <Content style={background}>
        <Title>ZGSCC</Title>
        <Text italic>Lets start your BDSM career</Text>

        <Outlet />
      </Content>
      <Footer>
        <Flex gap="middle" justify="center" align="center">
          <Flex align="center">
            <span className="material-icons-outlined"> copyright </span>
            {new Date().getFullYear()} {t("unit.brand", { ns: "global" })}
          </Flex>
          <Region />
        </Flex>

        <Space>
          <small onClick={() => openLegalDoc("help", locale)}>
            {t("docmenu.help", { ns: "component" })} ●{" "}
          </small>
          <small onClick={() => openLegalDoc("term", locale)}>
            {t("docmenu.term", { ns: "component" })} ●{" "}
          </small>
          <small onClick={() => openLegalDoc("privacy", locale)}>
            {t("docmenu.privacy", { ns: "component" })} ●{" "}
          </small>
          <small onClick={() => openLegalDoc("about", locale)}>
            {t("docmenu.about", { ns: "component" })}
          </small>
        </Space>
      </Footer>
    </Layout>
  );
}
