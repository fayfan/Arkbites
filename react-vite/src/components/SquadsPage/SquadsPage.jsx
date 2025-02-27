import { useEffect, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { RiEditFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AddSquadModal from '../AddSquadModal';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import OpenModalButton from '../OpenModalButton';
import { thunkEditSquad } from '../../redux/session';
import UnauthorizedPage from '../UnauthorizedPage';
import './SquadsPage.css';

const SquadsPage = () => {
  const dispatch = useDispatch();
  const [manageSquads, setManageSquads] = useState(false);
  const [editing, setEditing] = useState(null);
  const [names, setNames] = useState({});
  const user = useSelector(state => state.session.user);
  if (!user) return <UnauthorizedPage />;

  const squads = user.squads;
  if (!squads)
    return <main>{/* <h1 style={{ margin: '2rem' }}>Loading...</h1> */}</main>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const initialNames = {};
    for (const id in squads) {
      initialNames[id] = squads[id].name;
    }
    setNames(initialNames);
  }, [squads]);

  const handleNameChange = (squadId, value) => {
    setNames(prevNames => ({
      ...prevNames,
      [squadId]: value,
    }));
  };

  const handleNameBlur = async squadId => {
    await dispatch(
      thunkEditSquad(squadId, {
        name: names[squadId],
      })
    );

    setEditing(null);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (editing !== null) {
      const nameInput = document.getElementById(`squad-name-input-${editing}`);
      if (nameInput) {
        nameInput.focus();
      }
    }
  }, [editing]);

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
          <div
            className={`squads-page-squad ${
              editing === squad.id ? 'editing' : ''
            }`}
            key={squad.id}
          >
            {(!manageSquads || (manageSquads && editing !== squad.id)) && (
              <NavLink
                to={`/squads/${squad.id}`}
                className="squads-page-squad-link"
              >
                <div className="squads-page-squad-link-div">{squad.name}</div>
              </NavLink>
            )}
            {manageSquads && editing === squad.id && (
              <div className="squads-page-squad-link-div">
                <input
                  type="text"
                  value={names[squad.id]}
                  onChange={e => handleNameChange(squad.id, e.target.value)}
                  onBlur={() => handleNameBlur(squad.id)}
                  id={`squad-name-input-${squad.id}`}
                  className="squads-page-squad-link editing"
                />
              </div>
            )}
            {manageSquads && (
              <>
                <div
                  onClick={() =>
                    setEditing(prevId =>
                      prevId === squad.id ? null : squad.id
                    )
                  }
                  className="squads-page-edit-button-div"
                >
                  <button className="squads-page-edit-button">
                    <RiEditFill style={{ width: '100%', height: 'auto' }} />
                  </button>
                </div>
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
