import { useState } from "react";
import { ModalTypes } from "../Modal/types";

export default () => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState<ModalTypes | undefined>(ModalTypes.EDIT);
  const [cta, setCta] = useState<() => void >(() => {});

  const showModal = ({ type, cta } : { type: ModalTypes, cta: () => void }) => {
    setShow(true);
    setType(type);
    setCta(() => cta);
  };

  const closeModal = () => {
    setShow(false);
    setType(undefined);
    setCta(() => undefined);
  }

  return { show, type, cta, showModal, closeModal };
};