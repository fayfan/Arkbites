import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import OperatorCard from '../OperatorCard';
import './SquadPage.css';

const SquadPage = () => {
  const { squadId } = useParams();
  const user = useSelector(state => state.session.user);
  const squad = user.squads[squadId];
  // const squad = squads[squadId];

  if (!squad)
    return <main>{/* <h1 style={{ margin: '2rem' }}>Loading...</h1> */}</main>;

  return (
    <main className="squad-page-main">
      <div className="squad-page-header">{squad.name}</div>
      <div className="squad-page-operators-div">
        {Object.values(squad.operators).map(displayNumber => {
          const operator = user.operators[displayNumber];

          return <OperatorCard operator={operator} key={displayNumber} />;
        })}
      </div>
    </main>
  );
};

export default SquadPage;
