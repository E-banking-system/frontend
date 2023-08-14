import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAccounts } from '../../actions/accountActions';
import { FiEye } from 'react-icons/fi'; 
import AddAccountForm from './AddAccountForm';
import UpdateAccount from './UpdateAccount'; 

function AccountsList({ data, loading, error, fetchAccounts }) {
  const [accountsToShow, setAccountsToShow] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddAccountForm, setShowAddAccountForm] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  useEffect(() => {
    fetchAccounts(accountsToShow, searchTerm);
  }, [fetchAccounts, accountsToShow, searchTerm]);

  const handleShowMore = (event) => {
    event.preventDefault();
    setAccountsToShow((prevAccounts) => prevAccounts + 5);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Fetch accounts with the updated search term
    fetchAccounts(accountsToShow, event.target.value);
  };

  const handleAddAccount = () => {
    setShowAddAccountForm(true);
  };

  const handleCancelAddAccount = () => {
    setShowAddAccountForm(false);
  };

  // Function to handle the click of the eye icon
  const handleViewAccountDetails = (rowData) => {
    setSelectedRowData(rowData); // Set the selected row data
  };

  return (
    <div className="container mx-auto my-8">
      {!showAddAccountForm && !selectedRowData && ( // Render AccountsList only if neither AddAccountForm nor UpdateAccount is shown
        <>
          <h2 className="text-xl font-semibold mb-4">Comptes:</h2>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Search by nature, rib, etat"
              className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-orange-400 focus:border-orange-400"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              className="ml-4 bg-orange-400 hover:bg-orange-500 text-white py-1 px-1 w-32 h-12 rounded"
              onClick={handleAddAccount}
            >
              Ajout Compte
            </button>
          </div>
          {loading ? (
            <p>Loading data...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : data && data.length ? (
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
                    <th className="px-2 py-1 bg-gray-100 border border-gray-300 text-center">
                        Consulter
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
                            {(key === 'dateCreation' ||
                              key === 'datePeremption' ||
                              key === 'derniereDateSuspention' ||
                              key === 'derniereDateBloquage') ? (
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No data available.</p>
          )}
          <button
            className="my-4 px-4 py-2 bg-orange-400 text-white rounded"
            onClick={handleShowMore}
          >
            voir plus
          </button>
        </>
      )}
      {showAddAccountForm && <AddAccountForm onCancel={handleCancelAddAccount} />}
      {selectedRowData && (
        <UpdateAccount
          rowData={selectedRowData}
          onCancel={() => setSelectedRowData(null)} // Reset the selectedRowData
        />
      )}
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
  fetchAccounts,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountsList);
