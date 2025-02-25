import { useEffect, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import AddOperatorModal from '../AddOperatorModal';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import OpenModalButton from '../OpenModalButton';
import OperatorCard from '../OperatorCard';
import UnauthorizedPage from '../UnauthorizedPage';
import { thunkEditUserOperator } from '../../redux/session';
import './OperatorsPage.css';

const OperatorsPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [manageOperators, setManageOperators] = useState(false);
  const [levels, setLevels] = useState({});
  // const [levels, setLevels] = useState({});
  if (!user) return <UnauthorizedPage />;

  const operators = user.operators;
  if (!operators)
    return <main>{/* <h1 style={{ margin: '2rem' }}>Loading...</h1> */}</main>;

  const phases = {
    PHASE_0: 'https://arknights.wiki.gg/images/8/85/Base.png',
    PHASE_1: 'https://arknights.wiki.gg/images/f/f2/Elite_1.png',
    PHASE_2: 'https://arknights.wiki.gg/images/2/27/Elite_2.png',
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const initialLevels = {};
    for (const displayNumber in operators) {
      initialLevels[displayNumber] = operators[displayNumber].level;
    }
    setLevels(initialLevels);
  }, [operators]);

  const handleLevelChange = (displayNumber, value) => {
    setLevels(prevLevels => ({
      ...prevLevels,
      [displayNumber]: value,
    }));
  };

  const handleLevelBlur = async (displayNumber, operator) => {
    await dispatch(
      thunkEditUserOperator(displayNumber, {
        phase: operator.phase,
        level: levels[displayNumber],
      })
    );
  };

  return (
    <main className="operators-page-main">
      <div className="operators-page-header">Operators</div>
      <div className="operators-page-manage-buttons-div">
        <button
          className="operators-page-manage-button"
          onClick={() => setManageOperators(!manageOperators)}
        >
          {manageOperators ? 'Done Managing' : 'Manage Operators'}
        </button>
        {manageOperators && (
          <OpenModalButton
            modalComponent={<AddOperatorModal />}
            buttonText="Add Operators"
            className="operators-page-manage-button"
          />
        )}
      </div>
      <div className="operators-page-operators-div">
        {Object.values(operators).map(operator => (
          <div className="operators-page-operator" key={operator.displayNumber}>
            <OperatorCard operator={operator} />
            {manageOperators && (
              <>
                <OpenModalButton
                  modalComponent={
                    <ConfirmDeleteModal
                      type="operator"
                      id={operator.displayNumber}
                    />
                  }
                  buttonIcon={
                    <IoCloseSharp
                      style={{ width: '100%', height: 'auto' }}
                      className="delete-button"
                    />
                  }
                  className="operators-page-delete-button"
                />
                <div className="operators-page-operator-card-bottom-div">
                  <label className="operators-page-operator-card-promotion-label">
                    <img
                      src={phases[operator.phase]}
                      onClick={async () => {
                        const phaseIndex = Object.keys(phases).indexOf(
                          operator.phase
                        );

                        return dispatch(
                          thunkEditUserOperator(operator.displayNumber, {
                            phase: Object.keys(phases)[(phaseIndex + 1) % 3],
                            level: operator.level,
                          })
                        );
                      }}
                      className="operators-page-operator-card-promotion-icon"
                    />
                  </label>
                  <label className="operators-page-operator-card-level-label">
                    Level
                    <input
                      type="number"
                      min={0}
                      max={90}
                      value={levels[operator.displayNumber]}
                      onChange={e =>
                        handleLevelChange(
                          operator.displayNumber,
                          e.target.value
                        )
                      }
                      onBlur={() =>
                        handleLevelBlur(operator.displayNumber, operator)
                      }
                      className="operators-page-operator-card-level-input"
                    />
                  </label>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default OperatorsPage;
