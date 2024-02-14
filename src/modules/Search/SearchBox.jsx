import { useEffect, useState } from "react";
import { getHistories, saveHistory, removeHistory } from "./index";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AutoComplete, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";

SearchBox.propTypes = {
  searchWay: PropTypes.string,
  fixedWidth: PropTypes.bool,
  placeholder: PropTypes.string,
  suffix: PropTypes.bool,
  type: PropTypes.string,
};
export default function SearchBox({
  searchWay = "fulltext",
  fixedWidth = true,
  placeholder,
  suffix = true,
  type = "box",
}) {
  const [histories, setHistories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showBox, setShowBox] = useState(true);
  const location = useLocation();
  const { pathname, query } = location;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const onSelect = (value) => {
    setSearchValue(value);
    doSearch();
  };

  const doSearch = () => {
    if (searchWay == "fulltext") {
      if (searchValue != "") {
        saveItem(searchValue);
        navigate({ to: "/search", query: { q: searchValue } });
      }
    } else {
      this.$emit("doSearch", searchValue);
    }
  };

  // const empty =()=> {
  //   deleteHistories("search_history")
  //   setHistories([])
  // }

  const getItems = () => {
    setHistories(getHistories("search_history"));
  };

  const saveItem = (value) => {
    saveHistory("search_history", value);
  };

  const removeItem = (value, idx) => {
    histories.splice(idx, 1);
    removeHistory("search_history", value);
    if (searchValue == value) setSearchValue("");
  };

  useEffect(() => {
    let key = query?.q;
    if (key) setSearchValue(key);
    if (type == "icon") setShowBox(false);
  }, []);

  useEffect(
    (val) => {
      if (val != "/search") setSearchValue("");
    },
    [pathname]
  );

  return (
    <div className={type == "largebtn" ? "largebtn" : "flex items-center"}>
      {type == "icon" && (
        <div className="btn-circle" onClick={setShowBox(!showBox)}>
          <span className="material-icons-outlined" style={{ margin: 0 }}>
            search
          </span>
        </div>
      )}

      {type == "icon"
        ? showBox
        : true && (
            <AutoComplete
              className={[
                fixedWidth ? "fixed" : "full-width",
                type == "icon" ? "iconbar" : "",
              ]}
              placeholder={placeholder}
              onSelect={onSelect}
              onFocus={getItems}
              onClear={removeItem}
              value={searchValue}
              options={histories}
              onChange={(e) => setSearchValue(e.target.value)}
            >
              <Input
                addonAfter={
                  suffix && (
                    <span
                      className="material-icons-outlined"
                      style={{ margin: "-5px 0" }}
                      onClick={doSearch}
                    >
                      search
                    </span>
                  )
                }
              ></Input>
            </AutoComplete>
          )}

      {type == "largebtn" && (
        <Button
          className="btn btn-primary btn-lg"
          style={{ width: "150px" }}
          onClick={doSearch}
        >
          {t("button.search", { ns: "global" })}
        </Button>
      )}
    </div>
  );
}
