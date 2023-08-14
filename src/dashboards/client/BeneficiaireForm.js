import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBeneficiaire } from '../../actions/beneficierActions';
import CustomAlert from '../../components/CustomAlert';

function BeneficiaireForm({ onClose }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [error, setError] = useState(null);

  // adding a beneficier
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      numCompte: e.target.numCompte.value,
      email: e.target.email.value,
      clientId: localStorage.getItem('user_id')
    };
    setIsOpen(true); 
    try {
        const response = await dispatch(addBeneficiaire(formData));
        setAlertMessage("Bénéficiaire bien ajouté"); // Success message
        setError(null); // Clear any previous errors
        console.info('Bénéficiaire bien ajouté');
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setAlertMessage(error.response.data);
          setError(error.response.data.message); // Set error message from API response
          console.warn(error.response.data);
        } else {
          setAlertMessage("Compte introuvable ou inactif");
          setError(error.message); // Set general error message
          console.warn(error.message);
        }
      }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleAlertClose = () => {
    setIsOpen(false); 
    onClose();
    if (error) {
        setError(null); // Clear error when closing alert
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white shadow-md rounded p-8 w-96">
        <h1 className="text-2xl font-bold mb-4">Ajouter bénéficiaire</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numCompte">
              Numéro de Compte
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="numCompte"
              type="text"
              placeholder="Numéro de Compte"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Ajouter Bénéficiaire
            </button>
            <button
              className="ml-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleCancel}
            >
              Annuler
            </button>
          </div>
        </form>

        <CustomAlert
          isOpen={isOpen}
          onClose={handleAlertClose}
          title="Alert"
          message={alertMessage}
          actionLabel="OK"
        />
      </div>
    </div>
  );
}

export default BeneficiaireForm;
