import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkEditSquad } from '../../redux/session';
import './RenameModal.css';

const ConfirmDeleteModal = ({ id }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const confirmRename = async e => {
    e.preventDefault();
    return dispatch(thunkEditSquad(id)).then(closeModal());
  };

  return (
    <div className="rename-modal-div">
      <h1 className="rename-modal-h1">Rename</h1>
      <div className="rename-modal-buttons-div">
        <button className="confirm-rename-button" onClick={confirmRename}>
          Confirm
        </button>
        <button className="cancel-rename-button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
