import { GiChessRook } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import {
  thunkFavoriteUserOperator,
  thunkUnfavoriteUserOperator,
} from '../../redux/session';
import './FavoriteButton.css';

export default function FavoriteButton({ displayNumber }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const favoriteOperators = user.favoriteOperators;

  const handleClick = async displayNumber => {
    if (!favoriteOperators.includes(displayNumber)) {
      await dispatch(thunkFavoriteUserOperator(displayNumber));
    } else {
      await dispatch(thunkUnfavoriteUserOperator(displayNumber));
    }
  };

  return (
    <>
      {user && (
        <span
          onClick={() => handleClick(displayNumber)}
          className="favorite-button-container"
        >
          {favoriteOperators.includes(displayNumber) && (
            <GiChessRook
              style={{ width: '100%', height: 'auto' }}
              className="favorite-button"
            />
          )}
          {!favoriteOperators.includes(displayNumber) && (
            <GiChessRook
              style={{ width: '100%', height: 'auto' }}
              className="unfavorite-button"
            />
          )}
        </span>
      )}
    </>
  );
}
