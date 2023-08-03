import React, { useState } from 'react';
import VirementForm from './VirementForm';

const Virement = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false); // Close the form when called
  };

  const handleProgramButtonClick = () => {
    
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
      {showForm && <VirementForm onClose={handleFormClose} />}
    </div>
  );
};

export default Virement;
