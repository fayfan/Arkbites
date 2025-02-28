import { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddSquadOperatorModal from '../AddSquadOperatorModal';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import OpenModalButton from '../OpenModalButton';
import OperatorCard from '../OperatorCard';
import UnauthorizedPage from '../UnauthorizedPage';
import './SquadPage.css';

const SquadPage = () => {
  const { squadId } = useParams();
  const [manageSquad, setManageSquad] = useState(false);
  const user = useSelector(state => state.session.user);
  if (!user) return <UnauthorizedPage />;

  const squad = user.squads[squadId];
  if (!squad)
    return <main>{/* <h1 style={{ margin: '2rem' }}>Loading...</h1> */}</main>;

  const numOperators = squad.operators.length;

  return (
    <main className="squad-page-main">
      <div className="squad-page-header">{squad.name}</div>
      <div className="squad-page-manage-buttons-div">
        <button
          className="squad-page-manage-button"
          onClick={() => setManageSquad(!manageSquad)}
        >
          {manageSquad ? 'Done Managing' : 'Manage Operators'}
        </button>
        {manageSquad && (
          <OpenModalButton
            modalComponent={<AddSquadOperatorModal />}
            buttonText="Add Operators"
            className="squad-page-manage-button"
          />
        )}
      </div>
      <div className="squad-page-operators-div">
        {Object.values(squad.operators).map(displayNumber => {
          const operator = user.operators[displayNumber];

          return (
            <div className="squad-page-operator" key={displayNumber}>
              <OperatorCard operator={operator} />
              {manageSquad && (
                <OpenModalButton
                  modalComponent={
                    <ConfirmDeleteModal
                      type="squadOperator"
                      id={{
                        squadId: squadId,
                        displayNumber: operator.displayNumber,
                      }}
                    />
                  }
                  buttonIcon={
                    <IoCloseSharp style={{ width: '100%', height: 'auto' }} />
                  }
                  className="squad-page-delete-button"
                />
              )}
            </div>
          );
        })}
        {numOperators < 12 &&
          Array.from({ length: 12 - numOperators }).map((_, index) => (
            <div key={index} className="operator-placeholder-div">
              <OpenModalButton
                modalComponent={<AddSquadOperatorModal />}
                buttonText="+"
                className="operator-placeholder-button"
              />
            </div>
          ))}
      </div>
    </main>
  );
};

export default SquadPage;
