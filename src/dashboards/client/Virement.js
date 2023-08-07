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
  const userId = localStorage.getItem('user_id');

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

  const handleShowMore = () => {
    setVisibleVirements(prevVisibleVirements => prevVisibleVirements + 10);
  };

  useEffect(() => {
    fetchVirements(userId, 0, visibleVirements);
  }, [fetchVirements, userId, visibleVirements]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="ml-64 w-full">
        <div className="container mx-auto my-8">
          <h2 className="text-xl font-semibold mb-4 mt-6 text-left">Virements:</h2>
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
          <div className="mt-8">
            <ul className="space-y-2">
              {virements.slice(0, visibleVirements).map((virement) => (
                <li key={virement.id} className="bg-white p-4 shadow-md rounded">
                  <span className="font-semibold">
                    {moment(virement.dateOperation).format('DD MMM YYYY')}
                  </span>{' '}
                  - Montant: {virement.montant} MAD
                </li>
              ))}
            </ul>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleShowMore}
                className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg"
              >
                voir plus
              </button>
            </div>
            {showUnitaireForm && <VirementUnitaireForm onClose={handleFormClose} />}
            {showPermanantForm && <VirementPermanantForm onClose={handleFormClose} />}
          </div>
        </div>
      </div>
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
