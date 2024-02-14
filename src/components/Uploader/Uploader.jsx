import { useState } from "react";
import { ValidateExt, deleteFile, getBase64 } from "./index";
import PropTypes from "prop-types";
import { Upload, message, Modal, Button } from "antd";

Uploader.propTypes = {
  picType: PropTypes.string,
  isMulti: PropTypes.bool,
  path: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
  max: PropTypes.number,
  children: PropTypes.element,
};
export default function Uploader({
  picType = "picture-card",
  isMulti = false,
  path,
  text = "Upload",
  icon = "upload",
  max = 1,
  children,
}) {
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const beforeUpload = (file) => {
    let r = ValidateExt(file);
    if (typeof r == "string") {
      message.error(r);
    } else {
      getBase64(file, (imageUrl) => {
        file.url = imageUrl;
        if (fileList.length < max) setFileList([...fileList, file]);
      });
    }
    return false;
  };

  const handleRemove = (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
    if (path && file.newname) {
      deleteFile({ fp: path + "/", fn: file.newname });
    }
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
  };
  return (
    <div>
      <Upload
        listType={picType}
        fileList={fileList}
        multiple={isMulti}
        beforeUpload={beforeUpload}
        onRemove={handleRemove}
        onPreview={handlePreview}
      >
        {fileList.length < (isMulti ? max : 1) && (
          <div>
            {picType == "picture-card" && (
              <div>
                <span
                  className="material-icons-outlined"
                  style={{ fontSize: "36px" }}
                >
                  {icon == "upload" ? "file_upload" : "add"}
                </span>
                <div className="ant-upload-text">{text}</div>
              </div>
            )}

            {picType == "text" && (
              <span>
                <span className="material-icons-outlined">
                  {icon == "upload" ? "file_upload" : "add"}
                </span>
                {text}
              </span>
            )}

            {picType == "picture" && (
              <Button type="default">
                <span className="material-icons-outlined">
                  {icon == "upload" ? "file_upload" : "add"}
                </span>
                {text}
              </Button>
            )}
          </div>
        )}
      </Upload>

      {children}

      <Modal open={previewVisible} footer={null} onCancel={handleCancel}>
        <img style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
}
