import { useRef, useState, useContext, createContext } from "react";
import ReactDOM from "react-dom";
// import './Modal.css';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [modalContent, setModalContent] = useState(null);
  // Callback function that will be called when modal is closing
  const [onModalClose, setOnModalClose] = useState(null);

  const closeModal = () => {
    setModalContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it to null:
    if (typeof onModalClose === "function") {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const contextValue = {
    modalRef, // reference to modal div
    modalContent, // React component to render inside modal
    setModalContent, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function called when modal is closing
    closeModal, // function to close the modal
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal() {
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);
  // If there is no div referenced by the modalRef or modalContent is not a truthy value, render nothing:
  if (!modalRef || !modalRef.current || !modalContent) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={closeModal} // Clicking the overlay closes the modal
    >
      <div
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-t-xl p-6 shadow-lg transition-transform duration-300 transform translate-y-0"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing the modal
      >
        {modalContent}
      </div>
    </div>,
    modalRef.current
  );
}

export const useModal = () => useContext(ModalContext);
