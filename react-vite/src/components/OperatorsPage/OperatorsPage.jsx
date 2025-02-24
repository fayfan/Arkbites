import { useSelector } from 'react-redux';
import OperatorCard from '../OperatorCard';
import UnauthorizedPage from '../UnauthorizedPage';
import './OperatorsPage.css';

const OperatorsPage = () => {
  const user = useSelector(state => state.session.user);
  if (!user) return <UnauthorizedPage />;

  const operators = user.operators;
  if (!operators)
    return <main>{/* <h1 style={{ margin: '2rem' }}>Loading...</h1> */}</main>;

  return (
    <main className="operators-page-main">
      <div className="operators-page-header">Operators</div>
      <div className="operators-page-operators-div">
        {Object.values(operators).map(operator => (
          <OperatorCard operator={operator} key={operator.displayNumber} />
        ))}
      </div>
    </main>
  );
};

export default OperatorsPage;
