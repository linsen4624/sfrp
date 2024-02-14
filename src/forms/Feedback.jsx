import { createFeedback } from "@/api/global";
import { uploadFiles, Uploader } from "@/components/Uploader";
import { getObjectId, getUserData } from "@/utils/util";
import { useSelector } from "react-redux";
import { Divider, Modal, Radio, Input, message, Button } from "antd";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Feedback() {
  const current_account = useSelector((state) => state.account);
  const current_profile = useSelector((state) => state.profile);
  const { locale } = current_account;
  const { country, city, nickname, avatar } = current_profile;
  const location = useLocation();
  const { pathname } = location;
  const { t } = useTranslation();
  const { TextArea } = Input;
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState("");
  let postData = {};
  const [fbtype, setFbtype] = useState("bug");
  const [isUploadReady, setIsUploadReady] = useState(false);
  let fbtypes = [
    { label: "Bug", value: "bug" },
    { label: "Suggesion", value: "suggestion" },
  ];
  const uploader = useRef(null);

  const beforeSubmit = async () => {
    let sysinfo = getUserData();
    let userinfo = {};
    userinfo.locale = locale;
    userinfo.theme = localStorage.getItem("themeColor");
    userinfo.country = country;
    userinfo.city = city;
    userinfo.curpath = pathname;

    postData._id = getObjectId();
    postData.posttype = "feedback";
    postData.type = fbtype;
    postData.content = content;
    postData.authorid = current_account._id;
    postData.authoravatar = avatar;
    postData.authorname = nickname;
    postData.imglist = [];
    postData.userinfo = userinfo;
    postData.sysinfo = sysinfo;

    let Images = uploader.current.fileList;
    if (Images.length > 0) {
      let formdata = new FormData();
      formdata.append("category", "feedback");
      formdata.append("contentid", postData._id);
      Images.forEach((file) => {
        formdata.append("file", file);
      });

      await uploadFiles(formdata)
        .then((res) => {
          res = res.map((item) => {
            return Object.assign({}, { uploader: nickname }, item);
          });
          postData.imglist = [...postData.imglist, ...res];
          setIsUploadReady(true);
        })
        .catch(() => {
          message.error(t("global.tips.uploader.failed"));
          setLoading(false);
        });
    } else {
      setIsUploadReady(true);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    await beforeSubmit();
    if (isUploadReady) submitForm();
  };
  const submitForm = () => {
    createFeedback(postData).then((res) => {
      if (res) {
        message.success("Thank you for your feedback!");
        setLoading(false);
        setVisible(false);
        setIsUploadReady(false);
      }
    });
  };
  const footDom = (
    <div>
      <Button
        type="primary"
        onClick={handleSubmit}
        disabled={content == "" || loading}
      >
        {loading
          ? t("button.submit.loading", { ns: "global" })
          : t("button.submit.done", { ns: "global" })}
      </Button>
      <Button onClick={() => setVisible(false)}>
        {t("button.cancel", { ns: "global" })}
      </Button>
    </div>
  );
  return (
    <Modal
      open={visible}
      destroyOnClose={true}
      maskClosable={false}
      onChange={(e) => setVisible(e.target.value)}
      title={t("usermenu.feedback", { ns: "component" })}
      footer={footDom}
    >
      <>
        <div className="mb-6">
          <TextArea
            placeholder={t("placeholder.saysth", { ns: "global" })}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></TextArea>
        </div>

        <Radio.Group
          value={fbtype}
          onChange={(e) => setFbtype(e.target.value)}
          options={fbtypes}
        ></Radio.Group>

        <Divider />

        <Uploader
          isMulti={true}
          path="feedback"
          text={t("tips.uploader.text", { ns: "global" })}
          icon="plus"
          max={9}
          ref={uploader}
        >
          <span>{t("tips.uploader.note", { 0: 1, 1: 9, ns: "global" })}</span>
        </Uploader>
      </>
    </Modal>
  );
}
