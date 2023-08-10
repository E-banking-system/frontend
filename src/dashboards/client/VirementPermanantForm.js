import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { effectuerVirementPermanent } from '../../actions/virementActions'; 
import { fetchAccountsClient } from '../../actions/accountActions';
import CustomAlert from '../../components/CustomAlert';
import { fetchBeneficiaires } from '../../actions/beneficierActions';

const VirementPermanantForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    montant: 0,
    numCompteClient: '',
    numCompteBeneficier: '',
    premierDateExecution: '',
    dateFinExecution: '',
    frequence: '',
  });

  const [isOpen, setIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const clientAccounts = useSelector((state) => state.account.data);
  const beneficierAccounts = useSelector((state) => state.beneficiaires.beneficiaires);
  

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    setFormData((prevFormData) => ({
      ...prevFormData,
      numCompteClient: userId || '',
    }));

    dispatch(fetchAccountsClient());
    dispatch(fetchBeneficiaires());
  }, [dispatch]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.montant <= 0) {
      setAlertMessage('Le montant doit être supérieur à 0.');
      setIsOpen(true);
    } else if (formData.premierDateExecution >= formData.dateFinExecution) {
      setAlertMessage('La date de début d\'exécution doit être avant la date de fin d\'exécution.');
      setIsOpen(true);
    } else if ( clientAccounts.find(account => account.numCompte === formData.numCompteClient).solde < formData.montant) {
      setAlertMessage('solde insuffisant pour programmer ce virement');
      setIsOpen(true);
    } else {
        dispatch(effectuerVirementPermanent(formData));
        setAlertMessage("le virement est bien programmé"); 
        setIsOpen(true);
    }
  };

  const handleCancel = () => {
    setFormData({
      montant: 0,
      numCompteClient: '',
      numCompteBeneficier: '',
      premierDateExecution: '',
      dateFinExecution: '',
      frequence: '',
    });
    onClose();
  };

  const handleAlertClose = () => {
    setIsOpen(false);
  };
  console.log(JSON.stringify(formData))
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white shadow-md rounded p-8 w-96">
        <h1 className="text-2xl font-bold mb-4">Effectuer un virement permanent</h1>
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
              {clientAccounts && clientAccounts.filter(account => account.etatCompte === "ACTIVE").map((account) => (
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="premierDateExecution">
              Date de début d'exécution
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="premierDateExecution"
              type="date"
              onChange={(e) => setFormData({ ...formData, premierDateExecution: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateFinExecution">
              Date de fin d'exécution
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="dateFinExecution"
              type="date"
              onChange={(e) => setFormData({ ...formData, dateFinExecution: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="frequence">
              Fréquence
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="frequence"
              value={formData.frequence}
              onChange={(e) => setFormData({ ...formData, frequence: e.target.value })}
              required
            >
              <option value="" disabled>
                Sélectionnez la fréquence
              </option>
              <option value="HEBDOMADAIRE">Hebdomadaire</option>
              <option value="BIMENSUELLE">Bimensuelle</option>
              <option value="MENSUELLE">Mensuelle</option>
              <option value="TRIMESTRIELLE">Trimestrielle</option>
              <option value="SEMESTRIELLE">Semestrielle</option>
            </select>
          </div>
          
          <div className="flex items-center justify-center mt-4">
            <button
              className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
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

export default VirementPermanantForm;
