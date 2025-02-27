import { useEffect, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import AddMaterialModal from '../AddMaterialModal';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import OpenModalButton from '../OpenModalButton';
import UnauthorizedPage from '../UnauthorizedPage';
import { thunkEditUserMaterial } from '../../redux/session';
import './MaterialsPage.css';

const MaterialsPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [manageMaterials, setManageMaterials] = useState(false);
  const [quantities, setQuantities] = useState({});
  if (!user) return <UnauthorizedPage />;

  const userMaterials = user.materials;
  if (!userMaterials)
    return <main>{/* <h1 style={{ margin: '2rem' }}>Loading...</h1> */}</main>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const initialQuantities = {};
    for (const materialId in userMaterials) {
      initialQuantities[materialId] = userMaterials[materialId].quantity;
    }
    setQuantities(initialQuantities);
  }, [userMaterials]);

  const handleQuantityChange = (materialId, value) => {
    if (value < 0) {
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [materialId]: 0,
      }));
    } else {
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [materialId]: value,
      }));
    }
  };

  const handleQuantityBlur = async materialId => {
    await dispatch(
      thunkEditUserMaterial(materialId, {
        quantity: quantities[materialId],
      })
    );
  };

  return (
    <main className="materials-page-main">
      <div className="materials-page-header">Materials</div>
      <div className="materials-page-manage-buttons-div">
        <button
          className="materials-page-manage-button"
          onClick={() => setManageMaterials(!manageMaterials)}
        >
          {manageMaterials ? 'Done Managing' : 'Manage Materials'}
        </button>
        {manageMaterials && (
          <OpenModalButton
            modalComponent={<AddMaterialModal />}
            buttonText="Add Materials"
            className="materials-page-manage-button"
          />
        )}
      </div>
      <div className="materials-page-user-materials-div">
        {Object.values(userMaterials).map(userMaterial => (
          <div
            className="materials-page-material"
            key={userMaterial.materialId}
          >
            <div className="user-material-card">
              <div className="user-material-icon-div">
                <img
                  src={userMaterial.iconUrl}
                  className="user-material-icon"
                />
              </div>
              <div className="user-material-name-div">
                <div className="user-material-name">{userMaterial.name}</div>
              </div>
            </div>
            {!manageMaterials && (
              <div className="materials-page-material-card-quantity-label">
                Quantity: {quantities[userMaterial.materialId]}
              </div>
            )}
            {manageMaterials && (
              <>
                <OpenModalButton
                  modalComponent={
                    <ConfirmDeleteModal
                      type="material"
                      id={userMaterial.materialId}
                    />
                  }
                  buttonIcon={
                    <IoCloseSharp style={{ width: '100%', height: 'auto' }} />
                  }
                  className="materials-page-delete-button"
                />
                <div className="materials-page-material-card-bottom-div">
                  <label className="materials-page-material-card-quantity-label">
                    Quantity
                    <input
                      type="number"
                      min={0}
                      value={quantities[userMaterial.materialId]}
                      onChange={e =>
                        handleQuantityChange(
                          userMaterial.materialId,
                          e.target.value
                        )
                      }
                      onBlur={() => handleQuantityBlur(userMaterial.materialId)}
                      className="materials-page-material-card-quantity-input"
                    />
                  </label>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default MaterialsPage;
