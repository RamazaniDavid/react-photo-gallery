import { motion } from "framer-motion";
import React, { useEffect } from "react";
import useFirestore from "../hooks/useFirestore";
import Modal from "./Modal";

const ImageGrid = () => {
  const [images, loading] = useFirestore({ collection: "images" });
  const [showModal, setShowModal] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState(null);

  useEffect(() => {}, [showModal]);

  return (
    <>
      {showModal && (
        <Modal show={showModal} setShow={setShowModal}>
          <div>
            <img
              src={currentImage.url}
              alt="uploaded pic"
              className="modal-img"
              onLoad={(e) => {

              }}
            />
            <div className="modal-info-panel" >
              <h3>{currentImage.title}</h3>
              <p>{currentImage.description}</p>
            </div>
          </div>
        </Modal>
      )}
      {loading && <div>Loading...</div>}
      {images && (
        <>
          <ul className="gallery-container">
            {images.map((image, cnt) => (
              <React.Fragment key={image.id}>
                <li
                  onClick={() => {
                    setCurrentImage(image);
                    setShowModal(true);
                  }}
                >
                  <img src={image.thumbUrl} width="300" alt="uploaded pic" />
                  <p>{image.title}</p>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default ImageGrid;
