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
  const [manageOperators, setManageOperators] = useState(false);
  const [levels, setLevels] = useState({});
  const user = useSelector(state => state.session.user);
  if (!user) return <UnauthorizedPage />;

  const operators = user.operators;
  if (!operators)
    return <main>{/* <h1 style={{ margin: '2rem' }}>Loading...</h1> */}</main>;

  const phases = {
    PHASE_0: 'https://arknights.wiki.gg/images/8/85/Base.png',
    PHASE_1: 'https://arknights.wiki.gg/images/f/f2/Elite_1.png',
    PHASE_2: 'https://arknights.wiki.gg/images/2/27/Elite_2.png',
  };
  const rarity3Phases = {
    PHASE_0: 'https://arknights.wiki.gg/images/8/85/Base.png',
    PHASE_1: 'https://arknights.wiki.gg/images/f/f2/Elite_1.png',
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const initialLevels = {};
    for (const displayNumber in operators) {
      initialLevels[displayNumber] = operators[displayNumber].level;
    }
    setLevels(initialLevels);
  }, [operators]);

  const handlePhaseClick = async ({ displayNumber, rarity, phase, level }) => {
    if (rarity === 'TIER_1' || rarity === 'TIER_2') {
      return;
    } else if (rarity === 'TIER_3') {
      const phaseIndex = Object.keys(rarity3Phases).indexOf(phase);

      if (phaseIndex === 1 && level > 40) {
        return dispatch(
          thunkEditUserOperator(displayNumber, {
            phase: Object.keys(rarity3Phases)[(phaseIndex + 1) % 2],
            level: 40,
          })
        );
      } else {
        return dispatch(
          thunkEditUserOperator(displayNumber, {
            phase: Object.keys(rarity3Phases)[(phaseIndex + 1) % 2],
            level: level,
          })
        );
      }
    } else {
      const phaseIndex = Object.keys(phases).indexOf(phase);

      if (rarity === 'TIER_4') {
        if (phaseIndex === 2 && level > 45) {
          return dispatch(
            thunkEditUserOperator(displayNumber, {
              phase: Object.keys(phases)[(phaseIndex + 1) % 3],
              level: 45,
            })
          );
        } else {
          return dispatch(
            thunkEditUserOperator(displayNumber, {
              phase: Object.keys(phases)[(phaseIndex + 1) % 3],
              level: level,
            })
          );
        }
      } else if (rarity === 'TIER_5' || rarity === 'TIER_6') {
        if (phaseIndex === 2 && level > 50) {
          return dispatch(
            thunkEditUserOperator(displayNumber, {
              phase: Object.keys(phases)[(phaseIndex + 1) % 3],
              level: 50,
            })
          );
        } else {
          return dispatch(
            thunkEditUserOperator(displayNumber, {
              phase: Object.keys(phases)[(phaseIndex + 1) % 3],
              level: level,
            })
          );
        }
      }
    }
  };

  const handleLevelChange = ({ displayNumber, rarity, phase }, value) => {
    if (value < 0) {
      setLevels(prevLevels => ({
        ...prevLevels,
        [displayNumber]: 0,
      }));
    } else if (rarity === 'TIER_1' || rarity === 'TIER_2') {
      if (value > 30) {
        setLevels(prevLevels => ({
          ...prevLevels,
          [displayNumber]: 30,
        }));
      } else {
        setLevels(prevLevels => ({
          ...prevLevels,
          [displayNumber]: value,
        }));
      }
    } else if (rarity === 'TIER_3') {
      if (phase === 'PHASE_0' && value > 40) {
        setLevels(prevLevels => ({
          ...prevLevels,
          [displayNumber]: 40,
        }));
      } else if (phase === 'PHASE_1' && value > 55) {
        setLevels(prevLevels => ({
          ...prevLevels,
          [displayNumber]: 55,
        }));
      } else {
        setLevels(prevLevels => ({
          ...prevLevels,
          [displayNumber]: value,
        }));
      }
    } else if (rarity === 'TIER_4') {
      if (phase === 'PHASE_0' && value > 45) {
        setLevels(prevLevels => ({
          ...prevLevels,
          [displayNumber]: 45,
        }));
      } else if (phase === 'PHASE_1' && value > 60) {
        setLevels(prevLevels => ({
          ...prevLevels,
          [displayNumber]: 60,
        }));
      } else if (phase === 'PHASE_2' && value > 70) {
        setLevels(prevLevels => ({
          ...prevLevels,
          [displayNumber]: 70,
        }));
      } else {
        setLevels(prevLevels => ({
          ...prevLevels,
          [displayNumber]: value,
        }));
      }
    } else if (rarity === 'TIER_5') {
      if (phase === 'PHASE_0' && value > 50) {
        setLevels(prevLevels => ({
          ...prevLevels,
          [displayNumber]: 50,
        }));
      } else if (phase === 'PHASE_1' && value > 70) {
        setLevels(prevLevels => ({
          ...prevLevels,
          [displayNumber]: 70,
        }));
      } else if (phase === 'PHASE_2' && value > 80) {
        setLevels(prevLevels => ({
          ...prevLevels,
          [displayNumber]: 80,
        }));
      } else {
        setLevels(prevLevels => ({
          ...prevLevels,
          [displayNumber]: value,
        }));
      }
    } else if (rarity === 'TIER_6') {
      if (phase === 'PHASE_0' && value > 50) {
        setLevels(prevLevels => ({
          ...prevLevels,
          [displayNumber]: 50,
        }));
      } else if (phase === 'PHASE_1' && value > 80) {
        setLevels(prevLevels => ({
          ...prevLevels,
          [displayNumber]: 80,
        }));
      } else if (phase === 'PHASE_2' && value > 90) {
        setLevels(prevLevels => ({
          ...prevLevels,
          [displayNumber]: 90,
        }));
      } else {
        setLevels(prevLevels => ({
          ...prevLevels,
          [displayNumber]: value,
        }));
      }
    }
  };

  const handleLevelBlur = async ({ displayNumber, phase }) => {
    await dispatch(
      thunkEditUserOperator(displayNumber, {
        phase: phase,
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
                    <IoCloseSharp style={{ width: '100%', height: 'auto' }} />
                  }
                  className="operators-page-delete-button"
                />
                <div className="operators-page-operator-card-bottom-div">
                  <label className="operators-page-operator-card-promotion-label">
                    <img
                      src={phases[operator.phase]}
                      onClick={() => handlePhaseClick(operator)}
                      className="operators-page-operator-card-promotion-icon"
                    />
                  </label>
                  <label className="operators-page-operator-card-level-label">
                    Level
                    <input
                      type="number"
                      min={0}
                      value={levels[operator.displayNumber]}
                      onChange={e =>
                        handleLevelChange(operator, e.target.value)
                      }
                      onBlur={() => handleLevelBlur(operator)}
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
