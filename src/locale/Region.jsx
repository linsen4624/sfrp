import { Dropdown } from "antd";
//import { updateAccount } from "@/api/user";
import { SUPPORT_LOCALES } from "@/locale";
import { useSelector, useDispatch } from "react-redux";

export default function Region() {
  const current_account = useSelector((state) => state.account);
  const { locale } = current_account;
  const dispatch = useDispatch();
  const switchLang = (lang) => {
    dispatch({ type: "locale", payload: lang });
    // uus.switchLocale(lang);
    if (current_account) {
      //   updateAccount({ _id: curUser._id, locale: lang }).then((res) => {
      //     if (res.n === 1) {
      //       // us.setCountries(lang);
      //       dispatch({ type: "country", payload: lang });
      //     }
      //   });
    }
  };

  const menus = SUPPORT_LOCALES.map((item, index) => {
    return {
      key: index,
      value: item.value,
      disabled: item.value == locale,
      label: <span onClick={switchLang(item.value)}>{item.label}</span>,
    };
  });

  return (
    <Dropdown placement="bottomRight" menu={{ items: menus }}>
      <span style={{ marginLeft: "24px", cursor: "pointer" }}>
        <span className="material-icons" style={{ margin: 0 }}>
          translate
        </span>
      </span>
    </Dropdown>
  );
}
