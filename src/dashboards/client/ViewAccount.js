import React, { useState } from 'react';

function ViewAccount({ rowData, onCancel }) {
  const [selectedEtatCompte, setSelectedEtatCompte] = useState('');

  
console.log(rowData.id);
  //const accountId =  rowData.id;
  const handleEtatCompteChange = (e) => {
    setSelectedEtatCompte(e.target.value);
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
    </div>
  );
}

export default ViewAccount;
