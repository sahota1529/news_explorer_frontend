import PopupForm from "../PopupForm/PopupForm";
import { useState } from "react";

const SuccessPopup = ({ isOpen, closePopup, handleLoginPopup }) => {
  const [orText, setOrText] = useState(false);
  return (
    <PopupForm
      title="Registration successfully completed!"
      isOpen={isOpen}
      popupSwitch={handleLoginPopup}
      spanText="Sign In"
      closePopup={closePopup}
      orText={orText}
    ></PopupForm>
  );
};

export default SuccessPopup;
