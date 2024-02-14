import { getUnreadNoticeCount, getUnreadMessageCount } from "@/api/notice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Badge } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

export default function BizMenu() {
  const current_account = useSelector((state) => state.account);
  const location = useLocation();
  const { pathname } = location;
  const reminders = useSelector((state) => state.reminders);
  const messages = useSelector((state) => state.messages);
  const [nCount, setNCount] = useState(0);
  const [mCount, setMCount] = useState(0);
  const [selectedKeys, setSelectedKeys] = useState(pathname);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const items = [
    {
      key: "/index",
      onClick: () => navigate("/index"),
      icon: <span className="material-icons">home</span>,
      label: <span>{t("bizmenu.home", { ns: "component" })}</span>,
    },
    {
      key: "/place",
      onClick: () => navigate("/place"),
      icon: <span className="material-icons">place</span>,
      label: <span>{t("bizmenu.place", { ns: "component" })}</span>,
    },
    {
      key: "/explore",
      onClick: () => navigate("/explore"),
      icon: <span className="material-icons">connect_without_contact</span>,
      label: <span>{t("bizmenu.needs", { ns: "component" })}</span>,
    },
    {
      key: "/message",
      onClick: () => navigate("/message"),
      label: (
        <div>
          <Badge count={mCount} overflowCount={99} offset={[0, 18]}>
            <span className="material-icons">question_answer</span>
          </Badge>
          <span>{t("bizmenu.message", { ns: "component" })}</span>
        </div>
      ),
    },
    {
      key: "/notice",
      onClick: () => navigate("/notice"),
      label: (
        <div>
          <Badge count={nCount} overflowCount={99} offset={[0, 18]}>
            <span className="material-icons">notifications</span>
          </Badge>
          <span>{t("bizmenu.notice", { ns: "component" })}</span>
        </div>
      ),
    },
  ];
  useEffect(
    (val) => {
      setNCount(val);
    },
    [reminders]
  );
  useEffect(
    (val) => {
      setMCount(val);
    },
    [messages]
  );
  useEffect(() => {}, [pathname]);
  useEffect(() => {
    if (current_account) {
      getUnreadNoticeCount({ id: current_account._id }).then((res) => {
        setNCount(res);
        dispatch({ type: "reminder", payload: res });
      });
      getUnreadMessageCount({ id: current_account._id }).then((res) => {
        setMCount(res);
        dispatch({ type: "message", payload: res });
      });
    }
  }, []);

  return <Menu mode="horizontal" selectedKeys={selectedKeys} items={items} />;
}
