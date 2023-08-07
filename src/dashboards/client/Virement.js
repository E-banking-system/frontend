import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchVirements } from '../../actions/virementActions';
import VirementUnitaireForm from './VirementUnitaireForm';
import VirementPermanantForm from './VirementPermanantForm';
import moment from 'moment';

const Virement = ({ fetchVirements, virements }) => {
  const [showUnitaireForm, setShowUnitaireForm] = useState(false);
  const [showPermanantForm, setShowPermanantForm] = useState(false);
  const [visibleVirements, setVisibleVirements] = useState(7);

  const handleButtonClick = () => {
    setShowUnitaireForm(true);
    setShowPermanantForm(false);
  };

  const handleProgramButtonClick = () => {
    setShowPermanantForm(true);
    setShowUnitaireForm(false);
  };

  const handleFormClose = () => {
    setShowUnitaireForm(false);
    setShowPermanantForm(false);
  };

  useEffect(() => {
    const userId = localStorage.getItem('user_id'); 
    const page = 1; 
    const size = 7; 
    fetchVirements(userId, page, size);
  }, [fetchVirements]);

  const handleShowMore = () => {
    setVisibleVirements((prevVisibleVirements) => prevVisibleVirements + 7);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container mx-auto my-8">
        <h2 className="text-xl font-semibold ml-64 mb-4 mt-6 text-left">Virements:</h2>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-orange-400 hover:bg-orange-500 text-white py-1 px-3 w-52 h-12 rounded"
            onClick={handleButtonClick}
          >
            Effectuer un virement
          </button>
          <button
            className="bg-orange-400 hover:bg-orange-500 text-white py-1 px-3 w-52 h-12 rounded"
            onClick={handleProgramButtonClick}
          >
            Programmer un virement
          </button>
        </div>
        <div className="mt-8 ml-64">
          <h3 className="text-lg font-semibold mb-4">Liste des virements:</h3>
          <ul className="space-y-2">
            {virements
              .sort((a, b) => new Date(b.dateOperation) - new Date(a.dateOperation))
              .slice(0, visibleVirements)
              .map((virement) => (
                <li key={virement.id} className="bg-white p-4 shadow-md rounded">
                  <span className="font-semibold">
                    {moment(virement.dateOperation).format('DD MMM YYYY')}
                  </span>{' '}
                  - Montant: {virement.montant} MAD
                </li>
              ))}
          </ul>
          {visibleVirements < virements.length && (
            <button
              className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded"
              onClick={handleShowMore}
            >
              Show More
            </button>
          )}
        </div>
      </div>
      {showUnitaireForm && <VirementUnitaireForm onClose={handleFormClose} />}
      {showPermanantForm && <VirementPermanantForm onClose={handleFormClose} />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    virements: state.virement.virements,
  };
};

const mapDispatchToProps = {
  fetchVirements,
};

export default connect(mapStateToProps, mapDispatchToProps)(Virement);
