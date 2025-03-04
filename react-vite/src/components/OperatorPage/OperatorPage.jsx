import { useEffect, useState } from 'react';
import { IoStarSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkEditUserOperator } from '../../redux/session';
import professionIcons from '../../ProfessionIcons';
import subProfessionIcons from '../../SubProfessionIcons';
import './OperatorPage.css';

const OperatorPage = () => {
  const dispatch = useDispatch();
  const { displayNumber } = useParams();
  const [operator, setOperator] = useState(null);
  const [level, setLevel] = useState(0);
  const [userOperator, setUserOperator] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    const loadOperator = async () => {
      try {
        const response = await fetch(`/api/operators/${displayNumber}`);
        const operator = await response.json();
        setOperator(operator);
      } finally {
        setLoading(false);
      }
    };

    loadOperator();
  }, [displayNumber]);

  useEffect(() => {
    if (user && user.operators && user.operators[displayNumber]) {
      setLevel(user.operators[displayNumber].level);
      setUserOperator(user.operators[displayNumber]);
    }
  }, [user, displayNumber]);

  if (loading)
    return <main>{/* <h1 style={{ margin: '2rem' }}>Loading...</h1> */}</main>;

  const starCount = parseInt(operator.rarity[operator.rarity.length - 1]);
  const position =
    operator.position.charAt(0).toUpperCase() +
    operator.position.substring(1).toLowerCase();
  const tagList = operator.tagList.split(',');

  const phases = {
    PHASE_0: 'https://arknights.wiki.gg/images/8/85/Base.png',
    PHASE_1: 'https://arknights.wiki.gg/images/f/f2/Elite_1.png',
    PHASE_2: 'https://arknights.wiki.gg/images/2/27/Elite_2.png',
  };
  const rarity3Phases = {
    PHASE_0: 'https://arknights.wiki.gg/images/8/85/Base.png',
    PHASE_1: 'https://arknights.wiki.gg/images/f/f2/Elite_1.png',
  };

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

  const handleLevelChange = ({ rarity, phase }, value) => {
    if (value < 1) {
      setLevel(1);
    } else if (rarity === 'TIER_1' || rarity === 'TIER_2') {
      if (value > 30) {
        setLevel(30);
      } else {
        setLevel(value);
      }
    } else if (rarity === 'TIER_3') {
      if (phase === 'PHASE_0' && value > 40) {
        setLevel(40);
      } else if (phase === 'PHASE_1' && value > 55) {
        setLevel(55);
      } else {
        setLevel(value);
      }
    } else if (rarity === 'TIER_4') {
      if (phase === 'PHASE_0' && value > 45) {
        setLevel(45);
      } else if (phase === 'PHASE_1' && value > 60) {
        setLevel(60);
      } else if (phase === 'PHASE_2' && value > 70) {
        setLevel(70);
      } else {
        setLevel(value);
      }
    } else if (rarity === 'TIER_5') {
      if (phase === 'PHASE_0' && value > 50) {
        setLevel(50);
      } else if (phase === 'PHASE_1' && value > 70) {
        setLevel(70);
      } else if (phase === 'PHASE_2' && value > 80) {
        setLevel(80);
      } else {
        setLevel(value);
      }
    } else if (rarity === 'TIER_6') {
      if (phase === 'PHASE_0' && value > 50) {
        setLevel(50);
      } else if (phase === 'PHASE_1' && value > 80) {
        setLevel(80);
      } else if (phase === 'PHASE_2' && value > 90) {
        setLevel(90);
      } else {
        setLevel(value);
      }
    }
  };

  const handleLevelBlur = async ({ displayNumber, phase }) => {
    await dispatch(
      thunkEditUserOperator(displayNumber, {
        phase: phase,
        level: level,
      })
    );
  };

  return (
    <main className="operator-page-main">
      <div className="operator-page-top-div">
        <div className="operator-page-left-div">
          <div className="operator-rarity-div">
            {Array(starCount)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="operator-rarity-star-div">
                  <IoStarSharp className="operator-rarity-star" />
                </div>
              ))}
          </div>
          <h1 className="main-header">{operator.name}</h1>
          <div className="operator-info-div">
            <img
              src={professionIcons[operator.profession]}
              alt={operator.profession}
              className="operator-profession"
            />
            <img
              src={subProfessionIcons[operator.subProfessionId]}
              alt={operator.subProfessionId}
              className="operator-sub-profession"
            />
            <div className="operator-position-tag-list-div">
              <span className="operator-position">{position}</span>
              <span className="operator-tag-list">{tagList.join(', ')}</span>
            </div>
          </div>
          {userOperator && (
            <div className="operator-page-promotion-level-div">
              <label className="operator-page-promotion-label">
                Promotion:&nbsp;
                <img
                  src={phases[userOperator.phase]}
                  onClick={() => handlePhaseClick(userOperator)}
                  className="operator-page-promotion-icon"
                />
              </label>
              <label className="operator-page-level-label">
                Level:&nbsp;
                <input
                  type="number"
                  min={1}
                  value={level}
                  onChange={e =>
                    handleLevelChange(userOperator, e.target.value)
                  }
                  onBlur={() => handleLevelBlur(userOperator)}
                  className="operator-page-level-input"
                />
              </label>
            </div>
          )}
        </div>
        <div className="operator-page-right-div">
          <img
            src={operator.tooltipUrl}
            className="operator-page-operator-icon"
          />
        </div>
      </div>
      <div className="operator-page-bottom-div"></div>
    </main>
  );
};

export default OperatorPage;
