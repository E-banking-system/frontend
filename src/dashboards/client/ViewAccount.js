import React, { useState } from 'react';
import { connect } from 'react-redux';
import { demandeActivation, demandeSuspension, demandeBlock } from '../../actions/accountActions';
import CustomAlert from '../../components/CustomAlert';

function ViewAccount({ rowData, onCancel, demandeActivation, demandeSuspension, demandeBlock }) {
  const [selectedEtatCompte, setSelectedEtatCompte] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  const handleEtatCompteChange = (e) => {
    setSelectedEtatCompte(e.target.value);

    if (e.target.value === 'demande_activation') {
      demandeActivation(rowData.id);
      setIsOpen(true);
    }
    if (e.target.value === 'demande_suspension') {
        demandeSuspension(rowData.id);
        setIsOpen(true);
    }
    if (e.target.value === 'demande_bloquage') {
        demandeBlock(rowData.id);
        setIsOpen(true);
    }
  };

  const handleAlertClose = () => {
    setIsOpen(false); // Close the custom alert modal
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">View Account</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numCompte">
            Num Compte
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="numCompte"
            type="text"
            readOnly
            value={rowData.numCompte}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="etatCompte">
            Etat Compte
          </label>
          {rowData.etatCompte === 'ACTIVE' ? (
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="etatCompte"
              value={selectedEtatCompte}
              onChange={handleEtatCompteChange}
            >
              <option value="">Active</option>
              <option value="demande_suspension">Demande Suspension</option>
              <option value="demande_bloquage">Demande Bloquage</option>
            </select>
          ) : rowData.etatCompte === 'SUSPENDU' ? (
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="etatCompte"
              value={selectedEtatCompte}
              onChange={handleEtatCompteChange}
            >
              <option value="">Suspendu</option>
              <option value="demande_activation">Demande Activation</option>
              <option value="demande_bloquage">Demande Bloquage</option>
            </select>
          ) : (
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="etatCompte"
              value={selectedEtatCompte}
              onChange={handleEtatCompteChange}
            >
              <option value="">Bloqué</option>
              <option value="demande_activation">Demande Activation</option>
              <option value="demande_suspension">Demande suspension</option>
            </select>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rib">
            RIB
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="rib"
            type="text"
            readOnly
            value={rowData.rib}
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={onCancel}
          >
            Close
          </button>
        </div>
      </form>
      <CustomAlert
        isOpen={isOpen}
        onClose={handleAlertClose}
        title="Alert"
        message="Demande bien enregistrée"
        actionLabel="OK"
      />
    </div>
  );
}

export default connect(null, { demandeActivation, demandeSuspension, demandeBlock })(ViewAccount);
