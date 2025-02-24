import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './OperatorPage.css';

const OperatorPage = () => {
  const { displayNumber } = useParams();
  const user = useSelector(state => state.session.user);
  const [operator, setOperator] = useState(null);
  const [loading, setLoading] = useState(true);
  // const operators = useSelector(state => state.operators);
  // const operator = operators[displayNumber];

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

  if (loading)
    return <main>{/* <h1 style={{ margin: '2rem' }}>Loading...</h1> */}</main>;

  return (
    <main className="operator-page-main">
      <h1>{operator.name}</h1>
      <img src={operator.tooltipUrl} className="operator-page-operator-icon" />
      {user && user.operators[displayNumber] && (
        <div>{user.operators[displayNumber].level}</div>
      )}
    </main>
  );
};

export default OperatorPage;
