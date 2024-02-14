import { Dropdown, Avatar, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Feedback from "@/forms/Feedback.jsx";
import { useSelector } from "react-redux";
import { useRef, forwardRef } from "react";
import { ACCESS_TOKEN, VERIFY_QUESTION } from "@/config/constants.js";

export default function UserMenu() {
  const current_account = useSelector((state) => state.account);
  const current_profile = useSelector((state) => state.profile);
  const { role } = current_account;
  const { nickname, avatar } = current_profile;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const ref = useRef(null);
  let currentTheme = localStorage.getItem("themeColor");
  const darkTheme = "dark";
  const lightTheme = "light";
  const changeTheme = (t) => {
    if (t == lightTheme) {
      document.body.classList.remove(darkTheme);
      document.body.classList.add(lightTheme);
      localStorage.setItem("themeColor", lightTheme);
      currentTheme = lightTheme;
    } else {
      document.body.classList.remove(lightTheme);
      document.body.classList.add(darkTheme);
      localStorage.setItem("themeColor", darkTheme);
      currentTheme = darkTheme;
    }
  };
  const ToLogin = () => {
    navigate("/index");
  };
  const ToConsole = () => {
    window.open("/console");
  };
  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(VERIFY_QUESTION);
    window.location.reload();
  };
  const items = [
    {
      key: "profile",
      onClick: () => navigate("/account/myinfo"),
      label: (
        <>
          <span className="material-icons">person</span>
          <span>{t("usermenu.personal_home", { ns: "component" })}</span>
        </>
      ),
    },
    {
      key: "setting",
      onClick: () => navigate("/account/settings"),
      label: (
        <>
          <span className="material-icons">settings</span>
          <span>{t("usermenu.myaccount", { ns: "component" })}</span>
        </>
      ),
    },
    {
      key: "order",
      onClick: () => navigate("/account/order"),
      label: (
        <>
          <span className="material-icons">fact_check</span>
          <span>{t("usermenu.myorder", { ns: "component" })}</span>
        </>
      ),
    },
    {
      key: "feedback",
      onClick: () => (ref.current.visible = true),
      label: (
        <>
          <span className="material-icons">feedback</span>
          <span>{t("usermenu.feedback", { ns: "component" })}</span>
        </>
      ),
    },
    {
      key: "admin",
      disabled: ["ADMIN", "OPERATE"].includes(role),
      onClick: ToConsole,
      label: (
        <>
          <span className="material-icons">open_in_new</span>
          <span>{t("usermenu.admin", { ns: "component" })}</span>
        </>
      ),
    },
    {
      type: "divider",
      disabled: role == "FREE",
    },
    {
      key: "upgrade",
      onClick: () => navigate("/account/transaction/upgrade"),
      label: (
        <>
          <span className="material-icons">upgrade</span>
          <span>{t("usermenu.upgrade", { ns: "component" })}</span>
        </>
      ),
      disabled: role == "FREE",
    },
    {
      key: "theme",
      label: (
        <>
          <span className="material-icons">
            {currentTheme == darkTheme ? "dark_mode" : "light_mode"}
          </span>
          <span> {t("usermenu.theme", { ns: "component" })} </span>
        </>
      ),
      children: [
        {
          key: lightTheme,
          onTitleClick: changeTheme(lightTheme),
          label: t("usermenu.light", { ns: "component" }),
          disabled: currentTheme == lightTheme,
        },
        {
          key: darkTheme,
          onTitleClick: changeTheme(darkTheme),
          label: t("usermenu.dark", { ns: "component" }),
          disabled: currentTheme == darkTheme,
        },
      ],
    },
    {
      key: "logout",
      onClick: handleLogout,
      label: (
        <>
          <span className="material-icons">logout</span>
          <span>{t("usermenu.logout", { ns: "component" })}</span>
        </>
      ),
    },
  ];
  const FeedbackRef = forwardRef((props, ref) => <Feedback ref={ref} />);
  FeedbackRef.displayName = "FeedBack";

  return (
    <div>
      {current_profile ? (
        <Dropdown menu={{ items }}>
          <span className="action">
            <Avatar className="avatar" size="small" src={avatar} />
            <span className="hidden-lg">{nickname}</span>
          </span>
        </Dropdown>
      ) : (
        <Button type="text" onClick={ToLogin}>
          {t("components.Login.loginTitle", { ns: "account" })}
        </Button>
      )}
      <FeedbackRef ref={ref} />
    </div>
  );
}
