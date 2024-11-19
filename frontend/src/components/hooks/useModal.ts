import { useState } from "react";

export default () => {
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  }

  return { show, showModal, closeModal };
};