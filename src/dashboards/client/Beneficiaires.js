import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBeneficiaires } from '../../actions/beneficierActions'
import BeneficiaireForm from './BeneficiaireForm';
import { FiEye, FiTrash2  } from 'react-icons/fi';


const Beneficiaire = ({ beneficiaires, loading, error, fetchBeneficiaires }) => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchBeneficiaires(); // Fetch beneficiaries when the component mounts
  }, [fetchBeneficiaires]);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false); // Close the form when called
  };

  return (
    <div className="container mx-auto my-8 flex flex-col items-center">
      <div className="flex justify-between w-full mb-4">
        <h2 className="ml-32 text-xl font-semibold">Bénéficiaires:</h2>
        <button
          className="bg-orange-400 hover:bg-orange-500 text-white py-1 px-3 w-52 h-12 rounded"
          onClick={handleButtonClick}
        >
          Ajouter un bénéficiaire
        </button>
      </div>
      {/* Display beneficiaries data in a table */}
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : beneficiaires && beneficiaires.length ? (
        <table className="border-collapse border border-gray-300 text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-100 border border-gray-300">Nom</th>
              <th className="px-4 py-2 bg-gray-100 border border-gray-300">Prénom</th>
              <th className="px-4 py-2 bg-gray-100 border border-gray-300">Numéro de Compte</th>
              <th className="px-2 py-1 bg-gray-100 border border-gray-300">modifier</th>
              <th className="px-2 py-1 bg-gray-100 border border-gray-300">supprimer</th>
            </tr>
          </thead>
          <tbody>
            {beneficiaires.map((beneficiaire) => (
              <tr key={beneficiaire.id}>
                <td className="px-4 py-2 border border-gray-300">{beneficiaire.nom}</td>
                <td className="px-4 py-2 border border-gray-300">{beneficiaire.prenom}</td>
                <td className="px-4 py-2 border border-gray-300">{beneficiaire.numCompte}</td>
                <td className="px-2 py-1 border border-gray-300" style={{ textAlign: 'center' }}>
                    <button
                    //onClick={() => handleModifier(beneficiaire)}
                    style={{ margin: '0 auto' }}
                    className="focus:outline-none"
                    >
                    <div>
                        <FiEye /> 
                    </div>
                    </button>
                </td>
                <td className="px-2 py-1 border border-gray-300" style={{ textAlign: 'center' }}>
                    <button
                    //onClick={() => handleSupprimer(beneficiaire)}
                    style={{ margin: '0 auto' }}
                    className="focus:outline-none"
                    >
                    <div>
                        <FiTrash2  /> 
                    </div>
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No beneficiaries available.</p>
      )}
      {showForm && <BeneficiaireForm />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    beneficiaires: state.beneficiaires.beneficiaires,
    loading: state.beneficiaires.loading,
    error: state.beneficiaires.error,
  };
};

const mapDispatchToProps = {
  fetchBeneficiaires,
};

export default connect(mapStateToProps, mapDispatchToProps)(Beneficiaire);
