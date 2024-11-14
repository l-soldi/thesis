import { useState } from "react";
import { ModalTypes } from ".";

export default () => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState(ModalTypes.EDIT);
  const [cta, setCta] = useState<() => void>(() => {});

  const showModal = (type: ModalTypes, cta: () => void) => {
    setShow(!show);
    setType(type);
    setCta(cta);
  };

  return { show, type, cta, showModal };
};