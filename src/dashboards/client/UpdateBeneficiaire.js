import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBeneficiaire } from '../../actions/beneficierActions';
import CustomAlert from '../../components/CustomAlert';

function UpdateBeneficiaire({ rowData, onCancel }) {
  const dispatch = useDispatch();
  const updating = useSelector((state) => state.beneficiaires.updating);

  const [isOpen, setIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      id: rowData.id,
      // nom: e.target.nom.value,
      // prenom: e.target.prenom.value,
      numCompte: e.target.numCompte.value,
      clientId: localStorage.getItem('user_id'),
      email: rowData.email,
    };
    
    try {
      const response = await dispatch(updateBeneficiaire(rowData.beneficier_id, updatedData));
      setAlertMessage(response.data);
      setIsOpen(true);
    } catch (error) {
      setError(error);
      setAlertMessage("ce numéro de compte n'existe pas");
      setIsOpen(true);
    }
  };

  const handleAlertClose = () => {
    setError(null);
    setIsOpen(false);
    onCancel();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white shadow-md rounded p-8 w-96">
        <h1 className="text-2xl font-bold mb-4">Modifier Bénéficiaire</h1>
        <form onSubmit={handleSubmit}>
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nom">
              Nom
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nom"
              type="text"
              placeholder="Nom"
              defaultValue={rowData.nom}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prenom">
              Prénom
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="prenom"
              type="text"
              placeholder="Prénom"
              defaultValue={rowData.prenom}
            />
          </div> */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prenom">
              numCompte
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="numCompte"
              type="text"
              placeholder="numCompte"
              defaultValue={rowData.numCompte}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {updating ? 'Updating...' : 'Modifier Bénéficiaire'}
            </button>
            <button
              className="ml-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onCancel}
            >
              Annuler
            </button>
          </div>
        </form>

        <CustomAlert
          isOpen={isOpen}
          onClose={handleAlertClose}
          title={error ? 'Error' : 'Alert'}
          message={alertMessage}
          actionLabel="OK"
        />
      </div>
    </div>
  );
}

export default UpdateBeneficiaire;
