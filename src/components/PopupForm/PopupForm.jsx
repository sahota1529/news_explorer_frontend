import "./PopupForm.css";

const PopupForm = ({
  title,
  children,
  spanText,
  isOpen,
  closePopup,
  popupSwitch,
  onSubmit,
  orText,
}) => {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__content">
        <button
          type="button"
          className="popup__close-button"
          onClick={closePopup}
        />
        <h3 className="popup__form-title">{title}</h3>
        <form
          className="popup__form"
          onSubmit={onSubmit}
          style={{
            margin: orText === true ? "22px 0 0" : "0",
          }}
        >
          {children}
        </form>
        {orText === true ? (
          <p className="popup__or-text">
            <>
              or
              <button
                onClick={popupSwitch}
                type="text"
                className="popup__or-button"
              >
                {spanText}
              </button>
            </>
          </p>
        ) : (
          <p className="popup__or-text" style={{ margin: "14px auto  0 0" }}>
            <button
              onClick={popupSwitch}
              type="text"
              className="popup__or-button"
              style={{ textAlign: "left" }}
            >
              {spanText}
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default PopupForm;
