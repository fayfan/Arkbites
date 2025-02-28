import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkAddUserOperator } from '../../redux/session';
import './AddOperatorModal.css';

const AddOperatorModal = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [operators, setOperators] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOperators, setSelectedOperators] = useState([]);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    const loadOperators = async () => {
      try {
        const response = await fetch('/api/operators');
        const operators = await response.json();
        setOperators(operators);
      } finally {
        setLoading(false);
      }
    };

    loadOperators();
  }, []);

  if (loading)
    return <main>{/* <h1 style={{ margin: '2rem' }}>Loading...</h1> */}</main>;

  const operatorsArray = Object.values(operators);
  const filteredOperatorsArray = operatorsArray.filter(
    operator =>
      !Object.values(user.operators).some(
        existingOperator =>
          existingOperator.displayNumber === operator.displayNumber
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
      dispatch(
        thunkAddUserOperator(selectedOperator, {
          phase: 'PHASE_0',
          level: 0,
        })
      )
    );

    return closeModal();
  };

  return (
    <div className="add-operator-modal-div">
      <h1 className="add-operator-modal-h1">Add Operators</h1>
      <form onSubmit={handleSubmit} className="add-operator-modal-form">
        <div className="add-operator-modal-operators-div">
          {filteredOperatorsArray.map(operator => (
            <label
              className={`add-operator-modal-operator-card ${
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
                className="add-operator-modal-operator-checkbox"
              />
              <div className="add-operator-modal-operator-icon-div">
                <img
                  src={operator.iconUrl}
                  alt={operator.name}
                  className="add-operator-modal-operator-icon"
                />
              </div>
              <div className="add-operator-modal-operator-name">
                {operator.name}
              </div>
            </label>
          ))}
        </div>
        <div className="add-operator-modal-buttons-div">
          <button type="submit" className="confirm-add-operator-button">
            Add
          </button>
          <button className="cancel-add-operator-button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOperatorModal;
