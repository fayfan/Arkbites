import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UnauthorizedPage from '../UnauthorizedPage';
import './SquadsPage.css';

const SquadsPage = () => {
  const user = useSelector(state => state.session.user);
  if (!user) return <UnauthorizedPage />;

  const squads = user.squads;
  if (!squads)
    return <main>{/* <h1 style={{ margin: '2rem' }}>Loading...</h1> */}</main>;

  return (
    <main className="squads-page-main">
      <div className="squads-page-header">Squads</div>
      <div className="squads-div">
        {Object.values(squads).map(squad => (
          <NavLink
            to={`/squads/${squad.id}`}
            className="squad-card"
            key={squad.id}
          >
            <div className="squad-name-div">
              <div className="squad-name">{squad.name}</div>
            </div>
          </NavLink>
        ))}
      </div>
    </main>
  );
};

export default SquadsPage;
