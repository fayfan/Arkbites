import { NavLink } from 'react-router-dom';
import './OperatorCard.css';

const OperatorCard = ({ operator }) => {
  return (
    <NavLink
      to={`/operators/${operator.displayNumber}`}
      className="operator-card"
    >
      <div className="operator-icon-div">
        <img
          src={operator.tooltipUrl}
          alt={operator.name}
          className="operator-icon"
        />
      </div>
      <div className="operator-name-div">
        <div className="operator-name">{operator.name}</div>
      </div>
    </NavLink>
  );
};

export default OperatorCard;
