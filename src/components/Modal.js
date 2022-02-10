import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaWindowClose } from "react-icons/fa";

const Modal = ({ children, show, setShow, closeOnOutsideClick = true }) => {
  useEffect(() => {
    console.log(show);
  }, [show]);

  return (
    { show } && (
      <div
        className="modal-popup"
        onClick={(e) => {
          if (closeOnOutsideClick) {
            setShow && setShow(false);
          }
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="modal-container">
          {!closeOnOutsideClick && (
            <FaWindowClose
              className="modal-close"
              onClick={(e) => {
                setShow && setShow(false);
              }}
            />
          )}
          <div
            className="modal-children"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
