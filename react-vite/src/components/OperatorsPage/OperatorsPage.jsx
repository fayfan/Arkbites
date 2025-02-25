import { useState } from 'react';
import { FaSquareXmark } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import AddOperatorModal from '../AddOperatorModal';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import OpenModalButton from '../OpenModalButton';
import OperatorCard from '../OperatorCard';
import UnauthorizedPage from '../UnauthorizedPage';
import './OperatorsPage.css';

const OperatorsPage = () => {
  const user = useSelector(state => state.session.user);
  const [manageOperators, setManageOperators] = useState(false);
  if (!user) return <UnauthorizedPage />;

  const operators = user.operators;
  if (!operators)
    return <main>{/* <h1 style={{ margin: '2rem' }}>Loading...</h1> */}</main>;

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
              <OpenModalButton
                modalComponent={
                  <ConfirmDeleteModal
                    type="operator"
                    id={operator.displayNumber}
                  />
                }
                buttonIcon={
                  <FaSquareXmark
                    style={{ width: '100%', height: 'auto' }}
                    className="delete-button"
                  />
                }
                className="operators-page-delete-button"
              />
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default OperatorsPage;
