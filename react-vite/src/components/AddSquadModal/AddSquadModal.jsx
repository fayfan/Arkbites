import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkAddSquad } from '../../redux/session';
import './AddSquadModal.css';

const AddSquadModal = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    const serverResponse = await dispatch(thunkAddSquad({ name }));

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="add-squad-modal-div">
      <h1 className="add-squad-modal-h1">Add Squad</h1>
      <form onSubmit={handleSubmit} className="add-squad-modal-form">
        <label className="add-squad-modal-label">
          Name
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={e => setName(e.target.value)}
            required
            className="add-squad-modal-input"
          />
          {errors.name && (
            <p className="add-squad-modal-error">{errors.name}</p>
          )}
        </label>
        <div className="add-squad-modal-buttons-div">
          <button type="submit" className="confirm-add-squad-button">
            Submit
          </button>
          <button className="cancel-add-squad-button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSquadModal;
