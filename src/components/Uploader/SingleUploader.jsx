import { baseUrl } from "@/config/env";
import { ValidateExt } from "./index";
import { ACCESS_TOKEN } from "@/config/constants";
import { updateProfile } from "@/api/user";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Upload, message } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUserInfo } from "@/hooks";

SingleUploader.propTypes = {
  uploadType: PropTypes.string,
  profile: PropTypes.object,
};
export default function SingleUploader({ uploadType = "avatar", profile }) {
  const curUser = useSelector((state) => state.curUser);
  const [headers, setHeaders] = useState({ userid: "", type: "cover" });
  const { t, i18n } = useTranslation();
  const { avatar, cover } = useUserInfo({ user: curUser });
  const dispatch = useDispatch();

  const handleChange = (info) => {
    if (info.file.status !== "uploading") {
      //console.log(info.file, info.fileList)
    }
    if (info.file.status === "done") {
      let doc = { _id: profile._id };
      if (uploadType == "avatar") doc.avatar = info.file.response;
      if (uploadType == "cover") doc.cover = info.file.response;

      updateProfile(doc).then((res) => {
        if (res.n === 1) {
          message.success(i18n.t("global.tips.form.updated"));
          if (uploadType == "avatar")
            dispatch({ type: "user", payload: { avatar: info.file.response } });
          if (uploadType == "cover")
            dispatch({ type: "user", payload: { cover: info.file.response } });
        }
      });
    } else if (info.file.status === "error") {
      message.error(
        `${info.file.name} ${i18n.t("global.tips.uploader.failed")}`
      );
    }
  };

  const beforeUpload = (file) => {
    let r = ValidateExt(file);
    if (typeof r == "string") {
      message.error(r);
      return false;
    }
  };

  useEffect(() => {
    setHeaders({ userid: curUser._id });
    setHeaders({ type: uploadType });
    setHeaders({ authorization: localStorage.getItem(ACCESS_TOKEN) });
  }, []);

  return (
    <div
      className={
        uploadType == "avatar" ? "ant-upload-avatar" : "ant-upload-cover"
      }
    >
      <div className="mask">
        <Upload
          name="file"
          action={`${baseUrl}/zg_api/uploadUserPic`}
          headers={headers}
          beforeUpload={beforeUpload}
          showUploadList={false}
          onChange={handleChange}
        >
          {uploadType == "cover" ? (
            <div className="uploadText">
              <span className="material-icons">add</span>
              {t("account.components.Information.uploadcover")}
            </div>
          ) : (
            <span className="material-icons">add</span>
          )}
        </Upload>
      </div>
      <div>
        {uploadType == "avatar" ? (
          <img src={avatar} />
        ) : (
          <img src={cover} alt={t("account.components.Information.cover")} />
        )}
      </div>
    </div>
  );
}
