import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAccountsClient } from '../../actions/accountActions';
import { FiEye, FiCreditCard, FiMessageSquare, FiBell, FiSearch } from 'react-icons/fi';
import ViewAccount from './ViewAccount';
import VirementUnitaireForm from './VirementUnitaireForm';
import VirementPermanantForm from './VirementPermanantForm';
import AccountOperations from './AccountOperations';

function AccountsList({ data, loading, error, fetchAccountsClient }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showUnitaireForm, setShowUnitaireForm] = useState(false);
  const [showPermanantForm, setShowPermanantForm] = useState(false);


  useEffect(() => {
    fetchAccountsClient(searchTerm);
  }, [fetchAccountsClient, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Fetch accounts with the updated search term
    fetchAccountsClient(event.target.value);
  };

  const handleViewAccountDetails = (rowData) => {
    setSelectedRowData(rowData);
  };

  const handleViewAccountOperations = (rowData) => {
    setSelectedAccount(rowData);
  };

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

  
  return (
    <div className="container mx-auto my-8">
      {/* Combined Navigation and Search Bar */}
      <nav className="bg-white py-4 px-8 flex justify-between items-center ">
          
        <div className="flex-grow items-center space-x-4">
          <div className="relative mr-6">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search by nature, rib, etat"
                className="w-full pl-10 pr-4 py-3 h-10 border border-gray-300 rounded shadow-sm focus:ring-orange-400 focus:border-orange-400"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
        </div>
        
        <div className="flex items-center ">
          <div className="relative ml-2">
            <FiMessageSquare className="h-6 w-6 text-gray-500" />
            <span className="absolute top-0 right-0 rounded-full bg-red-500 text-white text-xs leading-tight px-1">
              3
            </span>
          </div>
          <div className="relative ml-2 mr-2">
            <FiBell className="h-6 w-6 text-gray-500" />
            <span className="absolute top-0 right-0 rounded-full bg-red-500 text-white text-xs leading-tight px-1">
              5
            </span>
          </div>
          <span className="text-lg font-semibold mr-8">Welcome, John Doe</span>
        </div>
        
      </nav>

      {/* Action Buttons and "Comptes" Heading */}
      <div className="flex justify-between items-center py-6 px-8">
        <h2 className="text-xl font-semibold">Comptes:</h2>
        <div className="flex space-x-4">
          <button
            className="bg-orange-400 hover:bg-orange-500 text-white py-1 px-3 w-50 h-11 rounded"
            onClick={handleButtonClick}
          >
            Effectuer un virement
          </button>
          <button
            className="bg-orange-400 hover:bg-orange-500 text-white py-1 px-3 w-50 h-11 rounded"
            onClick={handleProgramButtonClick}
          >
            Programmer un virement
          </button>
        </div>
      </div>

      {!selectedRowData && !selectedAccount && (
        <>         
          {loading ? (
            <p>Loading data...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : data && data.length ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300 text-xs sm:text-sm">
                  <thead>
                    <tr>
                      {Object.keys(data[0]).map((key) =>
                        key !== 'id' ? (
                          <th
                            key={key}
                            className="px-1 py-1 bg-gray-100 border border-gray-300"
                          >
                            {key}
                          </th>
                        ) : null
                      )}
                      <th className="px-2 py-1 bg-gray-100 border border-gray-300">
                        Consulter
                      </th>
                      <th className="px-2 py-1 bg-gray-100 border border-gray-300">
                        Historique de virements
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                        {Object.keys(item).map((key) =>
                          key !== 'id' ? (
                            <td
                              key={key}
                              className="px-2 py-1 border border-gray-300"
                            >
                              {key === 'dateCreation' ||
                              key === 'datePeremption' ||
                              key === 'derniereDateSuspention' ||
                              key === 'derniereDateBloquage' ? (
                                new Date(item[key]).toLocaleString()
                              ) : (
                                item[key]
                              )}
                            </td>
                          ) : null
                        )}
                        <td className="px-2 py-1 border border-gray-300" style={{ textAlign: 'center' }}>
                          <button
                            onClick={() => handleViewAccountDetails(item)}
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
                            onClick={() => handleViewAccountOperations(item)}
                            style={{ margin: '0 auto' }}
                            className="focus:outline-none"
                          >
                            <div>
                              <FiCreditCard /> 
                            </div>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p>No data available.</p>
          )}
        </>
      )}
      {selectedRowData && (
        <ViewAccount
          rowData={selectedRowData}
          onCancel={() => setSelectedRowData(null)}
        />
      )}
      {selectedAccount && <AccountOperations rowData={selectedAccount} />}
      {showUnitaireForm && <VirementUnitaireForm onClose={handleFormClose} />}
      {showPermanantForm && <VirementPermanantForm onClose={handleFormClose} />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.account.data,
    loading: state.account.loading,
    error: state.account.error,
  };
};

const mapDispatchToProps = {
  fetchAccountsClient,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountsList);
