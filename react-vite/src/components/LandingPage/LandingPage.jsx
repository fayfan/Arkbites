import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);
  const operators = useSelector(state => state.operators);

  if (!operators) return <h2>Loading...</h2>;

  const operatorsArray = Object.values(operators);
  operatorsArray.sort((operatorA, operatorB) => {
    if (operatorA.name < operatorB.name) return -1;
    if (operatorA.name > operatorB.name) return 1;
    return 0;
  });

  return (
    <main className="landing-page-main">
      <div className="landing-page-header">Arkbites</div>
      <div className="landing-page-operators-div">
        {operatorsArray.map(operator => (
          <div
            className="landing-page-operator-card"
            key={operator.displayNumber}
            onClick={() => navigate(`/operators/${operator.displayNumber}`)}
          >
            <div className="landing-page-operator-icon-div">
              <img
                src={operator.tooltipUrl}
                className="landing-page-operator-icon"
              />
            </div>
            <div className="landing-page-operator-name-div">
              <div className="landing-page-operator-name">{operator.name}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default LandingPage;
