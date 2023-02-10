import ConfirmContext from "@/contexts/ConfirmContext";
import { useContext } from "react";

let resolveCallback;

const useConfirm = () => {
  const { showConfirm, hideConfirm, show, message } = useContext(ConfirmContext);

  const onConfirm = () => {
    hideConfirm();
    resolveCallback(true);
  };

  const onCancel = () => {
    hideConfirm();
    resolveCallback(false);
  };

  const confirm = (msg) => {
    showConfirm(msg);

    return new Promise((res, rej) => {
      resolveCallback = res;
    });
  };

  return { confirm, onConfirm, onCancel, show, message };
};

export default useConfirm;
