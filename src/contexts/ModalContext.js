import { useState, createContext, useContext } from "react";

const ModalContext = createContext({
  Component: null,
  props: {},
  showModalState: false,
  showModal: () => {
  },
  hideModal: () => {
  },
});

export const ModalProvider = ({ Component, props, children }) => {
  const [showModalState, setShowModalState] = useState(false);

  const showModal = () => setShowModalState(true);
  const hideModal = () => setShowModalState(false);

  const value = {
    Component,
    props,
    showModalState,
    showModal,
    hideModal,
  };

  return (
    <ModalContext.Provider value={value}>
      <Component {...props} shouldShow={showModalState}
                 onRequestClose={hideModal} />
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  return useContext(ModalContext);
};
