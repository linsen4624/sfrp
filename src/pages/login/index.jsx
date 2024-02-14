import Signin from "@/modules/Auth/Signin.jsx";
import Signup from "@/modules/Auth/Signup.jsx";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Radio } from "antd";

export default function Login() {
  const { t } = useTranslation();
  const [oType, setOType] = useState("login");
  const [isInResetPwd] = useState(false);
  const [tipTxt, setTipTxt] = useState("");

  const handleChange = (e) => {
    setOType(e.target.value);
    if (oType == "signup") {
      //initialSignup();
      //signup.needyouknow = true;
      //setTipTxt(t("components.Login.needyouknow", { ns: "account" }));
    } else {
      //initialLogin();
    }
  };

  const updateValue = (v) => {
    if (v.type == "type") {
      setOType(v.value);
    } else if (v.type == "tip") {
      setTipTxt(v.value);
    }
  };

  //   beforeRouteEnter(to, from, next) {
  //     let token = to.query.token
  //     next((vm) => {
  //       if (!!token) {
  //         localStorage.setItem(ACCESS_TOKEN, token)
  //         let redirect = to.query.redirect
  //         if (redirect) {
  //           vm.$router.push({ path: redirect })
  //         } else {
  //           vm.$router.push({ name: "Index" })
  //         }
  //       }
  //     })
  //   }

  return (
    <div className="mb-8">
      {tipTxt != "" ? (
        <div className="flex flex-col gap-3">
          <span>{tipTxt}</span>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            {isInResetPwd ? (
              <div className="title">
                {t("components.Login.findback", { ns: "account" })}
              </div>
            ) : (
              <Radio.Group
                onChange={handleChange}
                value={oType}
                button-style="solid"
              >
                <Radio.Button value="login">
                  {t("components.Login.loginTitle", { ns: "account" })}
                </Radio.Button>
                <Radio.Button value="signup">
                  {t("components.Login.signupTitle", { ns: "account" })}
                </Radio.Button>
              </Radio.Group>
            )}
          </div>

          {oType == "login" && (
            <div className="flex flex-col gap-2">
              <Signin onEmit={updateValue} />
            </div>
          )}

          {oType == "signup" && (
            <div className="flex flex-col gap-2">
              <Signup onEmit={updateValue} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
