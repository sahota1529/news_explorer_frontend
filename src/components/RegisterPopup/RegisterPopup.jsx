import { useState, useEffect } from "react";
import PopupForm from "../PopupForm/PopupForm";
import { useFormWithValidation } from "../../Hooks/useFormWithValidation";

const RegisterPopup = ({
  isOpen,
  closePopup,
  handleLoginPopup,
  handleRegister,
  serverError,
  setServerError,
}) => {
  const [inputFocus, setInputFocus] = useState(false);

  const inputValues = {
    email: "",
    password: "",
    username: "",
  };

  const handleInputFocus = (value) => {
    setInputFocus(value);
  };

  const handleInputBlur = () => {
    setInputFocus(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(values);
  };

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation(inputValues);

  useEffect(() => {
    resetForm(inputValues);
    setServerError({});
  }, [isOpen]);

  return (
    <PopupForm
      isOpen={isOpen}
      closePopup={closePopup}
      title="Sign Up"
      buttonText="Sign Up"
      spanText="Sign In"
      popupSwitch={handleLoginPopup}
      orText={true}
    >
      <label className="popup__form-label">Email</label>
      <input
        required
        minLength="1"
        maxLength="30"
        onFocus={() => handleInputFocus("email")}
        className={`popup__form-input ${
          inputFocus === "email" ? "input-focussed" : ""
        }`}
        placeholder="Enter Email"
        type="email"
        name="email"
        onChange={handleChange}
        value={values.email}
      ></input>

      <span className="popup__form-error">{errors.email}</span>

      <label className="popup__form-label">Password</label>
      <input
        required
        minLength="2"
        maxLength="30"
        onFocus={() => handleInputFocus("password")}
        onBlur={handleInputBlur}
        value={values.password}
        name="password"
        type="password"
        onChange={handleChange}
        className={`popup__form-input ${
          inputFocus === "password" ? "input-focussed" : ""
        }`}
        placeholder="Enter Password"
      ></input>

      <span className="popup__form-error">{errors.password}</span>

      <label className="popup__form-label">Username</label>
      <input
        required
        minLength="2"
        maxLength="30"
        onFocus={() => handleInputFocus("username")}
        onBlur={handleInputBlur}
        value={values.username}
        name="username"
        type="username"
        onChange={handleChange}
        className={`popup__form-input ${
          inputFocus === "username" ? "input-focussed" : ""
        }`}
        placeholder="Enter Username"
      ></input>
      <span className="popup__form-error">{errors.username}</span>
      {serverError.conflictError ? (
        <span className="popup__form-error error">
          {serverError.conflictError}
        </span>
      ) : null}
      {isValid ? (
        <button
          type="text"
          className="popup__submit-button button_enabled"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      ) : (
        <button
          disabled
          type="text"
          className="popup__submit-button button_disabled"
        >
          Sign Up
        </button>
      )}
    </PopupForm>
  );
};

export default RegisterPopup;
