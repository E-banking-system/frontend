import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {  fetchBeneficiaires, addBeneficiaire, deleteBeneficiaire } from '../../actions/beneficierActions';
import BeneficiaireForm from './BeneficiaireForm';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import CustomAlert from '../../components/CustomAlert';
import UpdateBeneficiaire from './UpdateBeneficiaire';

const Beneficiaire = ({
  beneficiaires,
  loading,
  error,
  fetchBeneficiaires,
  addBeneficiaire,
  deleteBeneficiaire,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState(null);
  const [showUpdateBeneficiaireForm, setShowUpdateBeneficiaireForm] = useState(false);
  const [selectedBeneficiaire, setSelectedBeneficiaire] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);


  useEffect(() => {
    fetchBeneficiaires();
  }, [fetchBeneficiaires]);

  const handleAddBeneficiaire = (formData) => {
    setFormError(null); 
    addBeneficiaire(formData)
      .then((response) => {
        setShowForm(false);
      })
      .catch((error) => {
        // Handle error
        setFormError(error.message || 'An error occurred');
      });
  };

  const handleDeleteBeneficiaire = async (beneficiaireId) => {
    try {
      await deleteBeneficiaire(beneficiaireId);
    } catch (error) {
     setAlertMessage("You are not allowed to delete this beneficiary.");
    }
  };
  
  

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleModifier = (beneficiaire) => {
    setSelectedBeneficiaire(beneficiaire);
    setShowUpdateBeneficiaireForm(true);
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
                    onClick={() => handleModifier(beneficiaire)}
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
                    onClick={() => handleDeleteBeneficiaire(beneficiaire.id)}
                    style={{ margin: '0 auto' }}
                    className="focus:outline-none"
                  >
                    <div>
                      <FiTrash2 />
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
      {formError && <CustomAlert message={formError} onClose={() => setFormError(null)} />}
      {alertMessage && <CustomAlert message={alertMessage} onClose={() => setAlertMessage(null)} />}
      {showForm && (
        <BeneficiaireForm onClose={handleFormClose} onSubmit={handleAddBeneficiaire} />
      )}
      {showUpdateBeneficiaireForm && (
        <UpdateBeneficiaire
            rowData={selectedBeneficiaire}
            onCancel={() => setShowUpdateBeneficiaireForm(false)}
        />
       )}
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
  addBeneficiaire,
  deleteBeneficiaire,
};

export default connect(mapStateToProps, mapDispatchToProps)(Beneficiaire);
