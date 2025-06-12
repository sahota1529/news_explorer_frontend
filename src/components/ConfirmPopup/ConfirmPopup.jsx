import PopupForm from "../PopupForm/PopupForm";
import "../PopupForm/PopupForm.css";
import { useState, useEffect, useContext } from "react";

const ConfirmPopup = ({ isOpen, closePopup, handleUnsaveArticle, article }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUnsaveArticle(article);
  };

  // useEffect(() => {
  //   if (isOpen) {
  //     console.log("open");
  //   }
  // }, [isOpen]);

  return (
    <PopupForm
      title="Are You Sure?"
      orText={false}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      closePopup={closePopup}
    >
      <label
        className="popup__form-label"
        style={{ margin: "15px 0 30px", color: "#1a1b22", fontSize: "15px" }}
      >
        You cannot undo this action.
      </label>
      <button
        onClick={handleSubmit}
        type="text"
        className="popup__submit-button button_enabled"
      >
        Delete
      </button>
    </PopupForm>
  );
};

export default ConfirmPopup;
