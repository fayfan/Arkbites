import { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { RiEditFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AddSquadModal from '../AddSquadModal';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import OpenModalButton from '../OpenModalButton';
import RenameModal from '../RenameModal';
import UnauthorizedPage from '../UnauthorizedPage';
import './SquadsPage.css';

const SquadsPage = () => {
  const [manageSquads, setManageSquads] = useState(false);
  const user = useSelector(state => state.session.user);
  if (!user) return <UnauthorizedPage />;

  const squads = user.squads;
  if (!squads)
    return <main>{/* <h1 style={{ margin: '2rem' }}>Loading...</h1> */}</main>;

  return (
    <main className="squads-page-main">
      <div className="squads-page-header">Squads</div>
      <div className="squads-page-manage-buttons-div">
        <button
          className="squads-page-manage-button"
          onClick={() => setManageSquads(!manageSquads)}
        >
          {manageSquads ? 'Done Managing' : 'Manage Squads'}
        </button>
        {manageSquads && (
          <OpenModalButton
            modalComponent={<AddSquadModal />}
            buttonText="Add Squad"
            className="squads-page-manage-button"
          />
        )}
      </div>
      <div className="squads-page-squads-div">
        {Object.values(squads).map(squad => (
          <div className="squads-page-squad" key={squad.id}>
            <NavLink
              to={`/squads/${squad.id}`}
              className="squads-page-squad-link"
            >
              <div className="squads-page-squad-link-div">{squad.name}</div>
            </NavLink>
            {manageSquads && (
              <>
                <OpenModalButton
                  modalComponent={<RenameModal id={squad.id} />}
                  buttonIcon={
                    <RiEditFill style={{ width: '100%', height: 'auto' }} />
                  }
                  className="squads-page-edit-button"
                />
                <OpenModalButton
                  modalComponent={
                    <ConfirmDeleteModal type="squad" id={squad.id} />
                  }
                  buttonIcon={
                    <IoCloseSharp style={{ width: '100%', height: 'auto' }} />
                  }
                  className="squads-page-delete-button"
                />
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default SquadsPage;
