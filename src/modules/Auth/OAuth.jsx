import { startOAuth } from "../../api/auth";
import { globalUrl } from "@/config/env.js";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

OAuth.propTypes = {
  Provider: PropTypes.string,
};
export default function OAuth({ Provider = "Facebook" }) {
  const { t } = useTranslation();
  const Login = () => {
    startOAuth({ provider: Provider.toLowerCase() }).then((res) => {
      window.location.href = res;
    });
  };
  return (
    <div className="social-button" onClick={Login}>
      <span className="wrapper">
        {Provider == "Google" && (
          <img src={`${globalUrl}logos/google_logo.png`} alt="Google Logo" />
        )}
        {Provider == "Facebook" && (
          <img src={`${globalUrl}logos/fb_logo.png`} alt="Facebook Logo" />
        )}
        {Provider == "GitHub" && (
          <img
            src={`${globalUrl}logos/github_logo.png`}
            style={{ background: "#fff", borderRadius: "50%" }}
            alt="GitHub Logo"
          />
        )}
      </span>
      <span className="margin-left-md">
        {t("components.Login.with", { ns: "account", 0: Provider })}
      </span>
    </div>
  );
}
