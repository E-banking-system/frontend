import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccount } from '../../actions/accountActions';
import CustomAlert from '../../components/CustomAlert';
import { useState } from 'react';

function UpdateAccount({ rowData, onCancel }) {
  const dispatch = useDispatch();
  const updating = useSelector((state) => state.account.updating);

  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      id: rowData.id,
      solde: parseFloat(e.target.solde.value),
      etatCompte: e.target.etatCompte.value,
    };
    dispatch(updateAccount(updatedData));
    setIsOpen(true); // Show the custom alert modal
  };

  const handleAlertClose = () => {
    setIsOpen(false); // Close the custom alert modal
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white shadow-md rounded p-8 w-96">
        <h1 className="text-2xl font-bold mb-4">Modifier Compte</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="solde">
              Montant à retirer
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="solde"
              type="text"
              placeholder="Solde"
              defaultValue={0}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="etatCompte">
              Etat Compte
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="etatCompte"
              defaultValue={rowData.etatCompte}
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="BLOCKE">BLOCKE</option>
              <option value="SUSPENDU">SUSPENDU</option>
            </select>
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {updating ? 'Updating...' : 'Modifier Compte'}
            </button>
            <button
              className="ml-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>

        <CustomAlert
          isOpen={isOpen}
          onClose={handleAlertClose}
          title="Alert"
          message="Compte modifié avec succès."
          actionLabel="OK"
        />
      </div>
    </div>
  );
}

export default UpdateAccount;
