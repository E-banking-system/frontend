import React, { useState } from 'react';
import VirementUnitaireForm from './VirementUnitaireForm';
import VirementPermanantForm from './VirementPermanantForm';

const Virement = () => {
  const [showUnitaireForm, setShowUnitaireForm] = useState(false);
  const [showPermanantForm, setShowPermanantForm] = useState(false);


  const handleButtonClick = () => {
    setShowUnitaireForm(true);
    setShowPermanantForm(false); // Close the other form if open
  };

  const handleProgramButtonClick = () => {
    setShowPermanantForm(true);
    setShowUnitaireForm(false); // Close the other form if open
  };

  const handleFormClose = () => {
    setShowUnitaireForm(false);
    setShowPermanantForm(false);
  };

  return (
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
      {showUnitaireForm && <VirementUnitaireForm onClose={handleFormClose} />}
      {showPermanantForm && <VirementPermanantForm onClose={handleFormClose} />}
    </div>
  );
};

export default Virement;
