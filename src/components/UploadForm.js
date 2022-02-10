import React, { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import ProgressBar from "./ProgressBar";
import useStorage from "../hooks/useStorage";
import useInput from "../hooks/useInput";
import { FaCloudUploadAlt } from "react-icons/fa";
import useImage from "../hooks/useImage";

const UploadForm = () => {
  const [record, setRecord] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleProps, resetTitle] = useInput("");
  const [descriptionProps, resetDescription] = useInput("");
  const { progress, url } = useStorage(record);
  const [prevImage, setPrevImage] = useImage();

  useEffect(() => {
    if (!showModal) {
      resetTitle();
      resetDescription();
      setFile(null);
    }
  }, [showModal, resetTitle, resetDescription]);

  useEffect(() => {
    if (url) {
      setRecord(null);
      setShowModal(false);
      resetTitle();
      resetDescription();
    }
  }, [url, resetTitle, resetDescription]);

  const types = ["image/png", "image/jpeg"];

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      let reader = new FileReader();
      reader.readAsDataURL(selected);
      reader.onloadend = () => {
        setPrevImage(reader.result);
        setShowModal(true);
        setError("");
        setFile(selected);
      };
    } else {
      setFile(null);
      setPrevImage(null);
      setShowModal(false);
      setError("Please select an image file (png or jpg)");
    }
  };

  return (
    <>
      {showModal && prevImage?.status === "loaded" && (
        <Modal show={showModal} setShow={setShowModal}>
          <div>
            {progress > 0 && progress < 100 && (
              <ProgressBar
                progress={progress}
                width={`${
                  (prevImage.width > window.screen.width * 0.9
                    ? window.screen.width * 0.9
                    : prevImage.width) * 0.8
                }px`}
              />
            )}
            <img
              src={prevImage.src}
              alt="uploaded pic"
              className="modal-img"
              onLoad={(e) => {}}
            />
            <div
              className="modal-info-panel"
              style={{
                width: `${
                  (prevImage.width > window.screen.width * 0.9
                    ? window.screen.width * 0.9
                    : prevImage.width) * 0.8
                }px`,
              }}
            >
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  aria-describedby=""
                  placeholder="Enter Title ..."
                  {...titleProps}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  placeholder="Write Description ..."
                  {...descriptionProps}
                />
              </div>

              <button
                className="btn btn-primary"
                onClick={() => {
                  setRecord({
                    file: file,
                    title: titleProps.value,
                    description: descriptionProps.value,
                  });
                }}
              >
                Upload
              </button>
            </div>
          </div>
        </Modal>
      )}
      <label>
        <input
          type="file"
          onChange={handleChange}
          className="custom-file-input"
        />
        <FaCloudUploadAlt className="upload-btn" />
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
      </div>
    </>
  );
};

export default UploadForm;
