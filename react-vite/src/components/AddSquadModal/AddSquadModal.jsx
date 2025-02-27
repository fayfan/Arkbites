import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { thunkAddSquadOperator } from '../../redux/session';
import './AddSquadModal.css';

const AddSquadModal = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const { squadId } = useParams();
  const [selectedOperators, setSelectedOperators] = useState([]);
  const user = useSelector(state => state.session.user);
  const operators = user.operators;
  if (!operators)
    return <main>{/* <h1 style={{ margin: '2rem' }}>Loading...</h1> */}</main>;

  const squad = user.squads[squadId];
  if (!squad)
    return <main>{/* <h1 style={{ margin: '2rem' }}>Loading...</h1> */}</main>;

  const operatorsArray = Object.values(operators);
  const filteredOperatorsArray = operatorsArray.filter(
    operator =>
      !squad.operators.some(
        displayNumber => displayNumber === operator.displayNumber
      )
  );
  filteredOperatorsArray.sort((operatorA, operatorB) => {
    if (operatorA.name < operatorB.name) return -1;
    if (operatorA.name > operatorB.name) return 1;
    return 0;
  });

  const handleSubmit = async e => {
    e.preventDefault();

    selectedOperators.map(selectedOperator =>
      dispatch(thunkAddSquadOperator(squadId, selectedOperator))
    );

    return closeModal();
  };

  return (
    <div className="add-squad-operator-modal-div">
      <h1 className="add-squad-operator-modal-h1">Add Operators</h1>
      <form onSubmit={handleSubmit} className="add-squad-operator-modal-form">
        <div className="add-squad-operator-modal-operators-div">
          {filteredOperatorsArray.map(operator => (
            <label
              className={`add-squad-operator-modal-operator-card ${
                selectedOperators.includes(operator.displayNumber)
                  ? 'selected'
                  : ''
              }`}
              key={operator.displayNumber}
            >
              <input
                type="checkbox"
                checked={selectedOperators.includes(operator.displayNumber)}
                onChange={() => {
                  setSelectedOperators(prev =>
                    prev.includes(operator.displayNumber)
                      ? prev.filter(id => id !== operator.displayNumber)
                      : [...prev, operator.displayNumber]
                  );
                }}
                className="add-squad-operator-modal-operator-checkbox"
              />
              <div className="add-squad-operator-modal-operator-icon-div">
                <img
                  src={operator.iconUrl}
                  className="add-squad-operator-modal-operator-icon"
                />
              </div>
              <div className="add-squad-operator-modal-operator-name">
                {operator.name}
              </div>
            </label>
          ))}
        </div>
        <div className="add-squad-operator-modal-buttons-div">
          <button type="submit" className="confirm-add-squad-operator-button">
            Add
          </button>
          <button
            className="cancel-add-squad-operator-button"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSquadModal;
