import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkAddUserMaterial } from '../../redux/session';
import './AddMaterialModal.css';

const AddMaterialModal = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const { closeModal } = useModal();
  const [materials, setMaterials] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  useEffect(() => {
    const loadMaterials = async () => {
      try {
        const response = await fetch('/api/materials');
        const materials = await response.json();
        setMaterials(materials);
      } finally {
        setLoading(false);
      }
    };

    loadMaterials();
  }, []);

  if (loading)
    return <main>{/* <h1 style={{ margin: '2rem' }}>Loading...</h1> */}</main>;

  const materialsArray = Object.values(materials);
  const filteredMaterialsArray = materialsArray.filter(
    material =>
      !Object.values(user.materials).some(
        existingMaterial => existingMaterial.materialId === material.id
      )
  );

  const handleSubmit = async e => {
    e.preventDefault();

    selectedMaterials.map(selectedMaterial =>
      dispatch(
        thunkAddUserMaterial(selectedMaterial, {
          phase: 'PHASE_0',
          level: 0,
        })
      )
    );

    return closeModal();
  };

  return (
    <div className="add-material-modal-div">
      <h1 className="add-material-modal-h1">Add Materials</h1>
      <form onSubmit={handleSubmit} className="add-material-modal-form">
        <div className="add-material-modal-materials-div">
          {filteredMaterialsArray.map(material => (
            <label
              className={`add-material-modal-material-card ${
                selectedMaterials.includes(material.id) ? 'selected' : ''
              }`}
              key={material.id}
            >
              <input
                type="checkbox"
                checked={selectedMaterials.includes(material.id)}
                onChange={() => {
                  setSelectedMaterials(prev =>
                    prev.includes(material.id)
                      ? prev.filter(id => id !== material.id)
                      : [...prev, material.id]
                  );
                }}
                className="add-material-modal-material-checkbox"
              />
              <div className="add-material-modal-material-icon-div">
                <img
                  src={material.iconUrl}
                  className="add-material-modal-material-icon"
                />
              </div>
              <div className="add-material-modal-material-name">
                {material.name}
              </div>
            </label>
          ))}
        </div>
        <div className="add-material-modal-buttons-div">
          <button type="submit" className="confirm-add-button">
            Add
          </button>
          <button className="cancel-add-button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMaterialModal;
