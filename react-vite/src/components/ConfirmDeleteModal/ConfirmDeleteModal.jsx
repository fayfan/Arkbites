import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import {
  thunkDeleteUserMaterial,
  thunkDeleteUserOperator,
} from '../../redux/session';
import './ConfirmDeleteModal.css';

const ConfirmDeleteModal = ({ type, id }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const confirmDelete = async e => {
    e.preventDefault();

    if (type === 'operator') {
      return dispatch(thunkDeleteUserOperator(id)).then(closeModal());
    }

    if (type === 'material') {
      return dispatch(thunkDeleteUserMaterial(id)).then(closeModal());
    }
  };

  return (
    <div className="confirm-delete-modal-div">
      <h3 className="confirm-delete-modal-h3">
        Are you sure you want to delete this {type}?
      </h3>
      <div className="confirm-delete-modal-buttons-div">
        <button className="confirm-delete-button" onClick={confirmDelete}>
          Delete
        </button>
        <button className="cancel-delete-button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
