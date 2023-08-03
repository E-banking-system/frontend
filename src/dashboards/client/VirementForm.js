import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { effectuerVirement } from '../../actions/virementActions';
import CustomAlert from '../../components/CustomAlert';

const VirementForm = ({ onClose }) => {
  
    const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    montant: 0,
    numCompteClient: '',
    numCompteBeneficier: '',
    clientId: '',
    beneficierId: ''
  });

  const [isOpen, setIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Initialize clientId from local storage on component mount
  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    setFormData(prevFormData => ({
      ...prevFormData,
      clientId: userId || ''
    }));
   }, []);

   const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formData.montant <= 0) {
        setIsOpen(true);
        setAlertMessage('Le montant doit être supérieur à 0.');
        return;
    }
  
    try {
        await dispatch(effectuerVirement(formData)); // Get the response from the action
        setAlertMessage('Virement bien effectué'); 
        setIsOpen(true); 
      } catch (error) {
        setAlertMessage("Erreur de virement"); 
        setIsOpen(true); 
      }
    
  };

  const handleCancel = () => {
    setFormData({
      montant: 0,
      numCompteClient: '',
      numCompteBeneficier: '',
      clientId: '',
      beneficierId: ''
    });
    onClose();
  };

  const handleAlertClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white shadow-md rounded p-8 w-96">
        <h1 className="text-2xl font-bold mb-4">Effectuer un virement</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="montant">
              Montant
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="montant"
              type="number"
              placeholder="Montant"
              step="0.01"
              min="0"
              onChange={(e) => setFormData({ ...formData, montant: parseFloat(e.target.value) })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numCompteClient">
              Numéro de compte client
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="numCompteClient"
              type="text"
              placeholder="Numéro de compte client"
              onChange={(e) => setFormData({ ...formData, numCompteClient: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numCompteBeneficier">
              Numéro de compte bénéficiaire
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="numCompteBeneficier"
              type="text"
              placeholder="Numéro de compte bénéficiaire"
              onChange={(e) => setFormData({ ...formData, numCompteBeneficier: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientId">
              ID du client
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="clientId"
              type="text"
              placeholder="ID du client"
              value={formData.clientId}
              disabled
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="beneficierId">
              ID du bénéficiaire
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="beneficierId"
              type="text"
              placeholder="ID du bénéficiaire"
              onChange={(e) => setFormData({ ...formData, beneficierId: e.target.value })}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="mr-16 bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Effectuer
            </button>
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleCancel}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
      <CustomAlert
        isOpen={isOpen}
        onClose={handleAlertClose}
        title="Alert"
        message={alertMessage}
        actionLabel="OK"
      />
    </div>
  );
};

export default VirementForm;
