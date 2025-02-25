import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // optional: text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  buttonIcon, // optional: icon of the button that opens the modal
  className, // optional: className of the button that opens the modal
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === 'function') onButtonClick();
  };

  if (buttonIcon)
    return (
      <div onClick={onClick} className={`${className}-div`}>
        <button className={className}>{buttonIcon}</button>
      </div>
    );

  return (
    <button onClick={onClick} className={className}>
      {buttonText}
    </button>
  );
}

export default OpenModalButton;
