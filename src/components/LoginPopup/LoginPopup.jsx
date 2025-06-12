import PopupForm from "../PopupForm/PopupForm";
import { useState, useEffect } from "react";
import { useFormWithValidation } from "../../Hooks/useFormWithValidation";

const LoginPopup = ({
  isOpen,
  closePopup,
  handleRegisterPopup,
  handleLogin,
  serverError,
  setServerError,
}) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [orText, setOrText] = useState(false);

  const handleInputFocus = (value) => {
    setInputFocus(value);
  };

  const handleInputBlur = () => {
    setInputFocus(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
  };

  const inputValues = {
    email: "",
    password: "",
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
      title="Sign In"
      spanText="Sign Up"
      popupSwitch={handleRegisterPopup}
      onSubmit={handleSubmit}
      orText={true}
    >
      <label className="popup__form-label">Email</label>
      <input
        required
        minLength="1"
        maxLength="30"
        className={`popup__form-input ${
          inputFocus === "email" ? "input-focussed" : ""
        }`}
        onFocus={() => handleInputFocus("email")}
        onBlur={handleInputBlur}
        placeholder="Enter Email"
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
      ></input>

      <span className="popup__form-error">{errors.email}</span>

      <label className="popup__form-label">Password</label>
      <input
        required
        minLength="2"
        maxLength="30"
        className={`popup__form-input ${
          inputFocus === "password" ? "input-focussed" : ""
        }`}
        onFocus={() => handleInputFocus("password")}
        onBlur={handleInputBlur}
        placeholder="Enter Password"
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      ></input>

      <span className="popup__form-error">{errors.password}</span>
      {serverError.invalidError ? (
        <span className="popup__form-error error">
          {serverError.invalidError}
        </span>
      ) : null}
      {isValid ? (
        <button type="text" className="popup__submit-button button_enabled">
          Sign In
        </button>
      ) : (
        <button
          disabled
          type="text"
          className="popup__submit-button button_disabled"
        >
          Sign In
        </button>
      )}
    </PopupForm>
  );
};

export default LoginPopup;
