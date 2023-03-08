export const Modal = ({ shouldShow, onRequestClose, children }) => {
  let modalBackground = "modal-background";
  let modalBody = "modal-body";
  let closeButton = "close-button";

  return shouldShow ? (
    <div className={modalBackground} onClick={onRequestClose}>
      <div className={modalBody} onClick={(e) => e.stopPropagation()}>
        <button className={closeButton} onClick={onRequestClose}>
          X
        </button>
        {children}
      </div>
    </div>
  ) : null;
};
