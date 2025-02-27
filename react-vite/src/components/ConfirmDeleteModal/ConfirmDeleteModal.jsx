import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import {
  thunkDeleteSquad,
  thunkDeleteSquadOperator,
  thunkDeleteUserMaterial,
  thunkDeleteUserOperator,
} from '../../redux/session';
import './ConfirmDeleteModal.css';

const ConfirmDeleteModal = ({ type, id }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const typePlaceholders = {
    operator:
      'Are you sure you want to remove this operator from your list of operators?',
    material:
      'Are you sure you want to remove this material from your list of materials?',
    squad: 'Are you sure you want to delete this squad?',
    squadOperator:
      'Are you sure you want to remove this operator from your squad?',
  };

  const confirmDelete = async e => {
    e.preventDefault();

    if (type === 'operator') {
      return dispatch(thunkDeleteUserOperator(id)).then(closeModal());
    }

    if (type === 'material') {
      return dispatch(thunkDeleteUserMaterial(id)).then(closeModal());
    }

    if (type === 'squad') {
      return dispatch(thunkDeleteSquad(id)).then(closeModal());
    }

    if (type === 'squadOperator') {
      return dispatch(
        thunkDeleteSquadOperator(id.squadId, id.displayNumber)
      ).then(closeModal());
    }
  };

  return (
    <div className="confirm-delete-modal-div">
      <h3 className="confirm-delete-modal-h3">{typePlaceholders[type]}</h3>
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
