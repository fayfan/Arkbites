import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkAddUserOperator } from '../../redux/session';
import './AddOperatorModal.css';

const AddOperatorModal = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const { closeModal } = useModal();
  const [operators, setOperators] = useState(null);
  const [promotionsIndex, setPromotionsIndex] = useState(0);
  const [level, setLevel] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const promotions = [
    {
      phase: 'PHASE_0',
      iconUrl: 'https://arknights.wiki.gg/images/8/85/Base.png',
    },
    {
      phase: 'PHASE_1',
      iconUrl: 'https://arknights.wiki.gg/images/f/f2/Elite_1.png',
    },
    {
      phase: 'PHASE_2',
      iconUrl: 'https://arknights.wiki.gg/images/2/27/Elite_2.png',
    },
  ];

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

    return dispatch(
      thunkAddUserOperator(selectedOperator, {
        phase: promotions[promotionsIndex].phase,
        level: level,
      })
    ).then(closeModal());
  };

  return (
    <div className="add-operator-modal-div">
      <h1 className="add-operator-modal-h1">Add Operators</h1>
      <form onSubmit={handleSubmit} className="add-operator-modal-form">
        <div className="add-operator-modal-operators-div">
          {filteredOperatorsArray.map(operator => (
            <div
              onClick={() => setSelectedOperator(operator.displayNumber)}
              className="add-operator-modal-operator-card"
              key={operator.displayNumber}
            >
              <div className="add-operator-modal-operator-icon-div">
                <img
                  src={operator.iconUrl}
                  className="add-operator-modal-operator-icon"
                />
              </div>
              <div className="add-operator-modal-operator-name">
                {operator.name}
              </div>
            </div>
          ))}
        </div>
        <div className="add-operator-modal-bottom-div">
          <label className="add-operator-modal-promotion-label">
            Promotion:&nbsp;
            <img
              src={promotions[promotionsIndex % 3].iconUrl}
              onClick={() => setPromotionsIndex(promotionsIndex + 1)}
              className="add-operator-modal-promotion-icon"
            />
          </label>
          <label className="add-operator-modal-level-label">
            Level:&nbsp;
            <input
              type="number"
              min={0}
              max={90}
              value={level}
              onChange={e => setLevel(e.target.value)}
              className="add-operator-modal-level-input"
            />
          </label>
        </div>
        <div className="add-operator-modal-buttons-div">
          <button type="submit" className="confirm-add-button">
            Add
          </button>
          <button className="cancel-add-button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOperatorModal;
