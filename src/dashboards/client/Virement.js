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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-screen-lg w-full p-6">
        <h2 className="text-2xl font-semibold mb-4 text-left">Virements</h2>
        <div className="flex justify-center space-x-4 mb-6">
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
        <ul className="space-y-4">
          {virements.slice(0, visibleVirements).map((virement) => (
            <li key={virement.id} className="bg-white p-4 shadow-md rounded">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-lg">
                    Montant: <span className="font-semibold">{virement.montant} MAD</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {moment(virement.dateOperation).format('DD MMM YYYY HH:mm:ss')}
                  </span>
                </div>
                <div className="text-orange-500 text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </div>
              </div>
            </li>
          ))}
        </ul>
       
        <div className="flex justify-center mt-4">
          <button
            onClick={handleShowMore}
            className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Voir plus
          </button>
        </div>
      
        {showUnitaireForm && <VirementUnitaireForm onClose={handleFormClose} />}
        {showPermanantForm && <VirementPermanantForm onClose={handleFormClose} />}
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
