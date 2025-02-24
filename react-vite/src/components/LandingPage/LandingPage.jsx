import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import OperatorCard from '../OperatorCard';
import './LandingPage.css';

const LandingPage = () => {
  const [operators, setOperators] = useState(null);
  const [loading, setLoading] = useState(true);
  // const operators = useSelector(state => state.operators);

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
          <OperatorCard operator={operator} key={operator.displayNumber} />
        ))}
      </div>
    </main>
  );
};

export default LandingPage;
