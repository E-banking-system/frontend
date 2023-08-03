import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { effectuerVirement } from '../../actions/virementActions';
import { fetchAccountsClient } from '../../actions/accountActions';
import CustomAlert from '../../components/CustomAlert';
import { fetchBeneficiaires } from '../../actions/beneficierActions';

const VirementForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    montant: 0,
    numCompteClient: '',
    numCompteBeneficier: ''
  });

  const [isOpen, setIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const clientAccounts = useSelector((state) => state.account.data);
  const beneficierAccounts = useSelector((state) => state.beneficiaires.beneficiaires);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    setFormData((prevFormData) => ({
      ...prevFormData,
      clientId: userId || ''
    }));

    dispatch(fetchAccountsClient());
    dispatch(fetchBeneficiaires());
  }, [dispatch]);

  console.log("Fetched Accounts:", clientAccounts);
  console.log("Fetched Accounts:", beneficierAccounts);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formData.montant <= 0) {
      setIsOpen(true);
      setAlertMessage('Le montant doit être supérieur à 0.');
      return;
    }

    try {
      await dispatch(effectuerVirement(formData));
      setAlertMessage('Virement bien effectué');
      setIsOpen(true);
    } catch (error) {
      setAlertMessage('Erreur de virement');
      setIsOpen(true);
    }
  };

  const handleCancel = () => {
    setFormData({
      montant: 0,
      numCompteClient: '',
      numCompteBeneficier: ''
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
              min="100"
              onChange={(e) => setFormData({ ...formData, montant: parseFloat(e.target.value) })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numCompteClient">
              Numéro de compte client
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="numCompteClient"
              value={formData.numCompteClient}
              onChange={(e) => setFormData({ ...formData, numCompteClient: e.target.value })}
              required
            >
              <option value="" disabled>
                selectionnez un de votre comptes
              </option>
              {clientAccounts && clientAccounts.map((account) => (
                <option key={account.id} value={account.numCompte}>
                  {account.numCompte}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numCompteBeneficier">
              Numéro de compte bénéficiaire
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="numCompteBeneficier"
              value={formData.numCompteBeneficier}
              placeholder="Numéro de compte bénéficiaire"
              onChange={(e) => setFormData({ ...formData, numCompteBeneficier: e.target.value })}
              required
            >
              <option value="" disabled>
                selectionnez le compte de votre bénéficiaire
              </option>
              {beneficierAccounts && beneficierAccounts.map((account) => (
                <option key={account.id} value={account.numCompte}>
                  {account.numCompte}
                </option>
              ))}
            </select>
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
