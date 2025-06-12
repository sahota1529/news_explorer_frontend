import PopupForm from "../PopupForm/PopupForm";
import { useState, useEffect } from "react";
import { useFormWithValidation } from "../../Hooks/useFormWithValidation";

const EditProfilePopup = ({ isOpen, closePopup, handleEditProfile }) => {
  const [inputFocus, setInputFocus] = useState(false);

  const handleInputFocus = (value) => {
    setInputFocus(value);
  };

  const handleInputBlur = () => {
    setInputFocus(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile(values);
  };

  const inputValue = {
    username: "",
  };

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation(inputValue);

  useEffect(() => {
    if (isOpen) {
      resetForm(inputValue);
    }
  }, [isOpen]);

  return (
    <PopupForm
      title="Edit Profile"
      closePopup={closePopup}
      isOpen={isOpen}
      orText={false}
      onSubmit={handleSubmit}
    >
      <label style={{ marginTop: "15px" }} className="popup__form-label">
        Username
      </label>
      <input
        className={`popup__form-input ${
          inputFocus === "username" ? "input-focussed" : ""
        }`}
        style={{ marginBottom: "20px" }}
        required
        min="1"
        max="30"
        onFocus={() => handleInputFocus("Username")}
        onBlur={handleInputBlur}
        placeholder="Enter Username"
        type="text"
        name="username"
        value={values.username}
        onChange={handleChange}
      />
      {errors.username && (
        <span style={{ margin: "-15px 0 15px" }} className="popup__form-error">
          {errors.username}
        </span>
      )}
      {isValid ? (
        <button type="text" className="popup__submit-button button_enabled">
          Save
        </button>
      ) : (
        <button
          disabled
          type="text"
          className="popup__submit-button button_disabled"
        >
          Save
        </button>
      )}
    </PopupForm>
  );
};

export default EditProfilePopup;
