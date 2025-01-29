import { useModal } from '../../context/Modal';


function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  className
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return(
    <button
    className={className || "bg-gold text-midnight px-8 py-3 rounded-full text-lg font-semibold hover:bg-ivory hover:text-midnight transition duration-300"}
    onClick={onClick}
  >
  {buttonText}
  </button>
  )
}

export default OpenModalButton;
