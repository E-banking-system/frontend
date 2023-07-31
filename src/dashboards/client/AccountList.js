import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAccountsClient } from '../../actions/accountActions';
import { FiEye } from 'react-icons/fi'; // Import the Eye icon from react-icons
import ViewAccount from './ViewAccount'

function AccountsList({ data, loading, error, fetchAccountsClient }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowData, setSelectedRowData] = useState(null);

  // Fetch accounts with the given user ID manually
  const userId = '4ade6610-bc69-4f3c-ace5-83568a22472f'; // Replace this with the actual user ID
  
  useEffect(() => {
    // Fetch accounts with the given user ID manually
    fetchAccountsClient(userId);
  }, [fetchAccountsClient]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle the click of the eye icon
  const handleViewAccountDetails = (rowData) => {
    setSelectedRowData(rowData); // Set the selected row data
  };

  return (
    <div className="container mx-auto my-8">
      { !selectedRowData && ( // Render AccountsList only if neither AddAccountForm nor UpdateAccount is shown
        <>
          <h2 className="text-xl font-semibold mb-4">Comptes:</h2>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Search by nature, solde, email, etc."
              className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-orange-400 focus:border-orange-400"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {loading ? (
            <p>Loading data...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : data && data.length ? (
            <>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    {Object.keys(data[0]).map((key) =>
                      key !== 'id' ? (
                        <th
                          key={key}
                          className="px-4 py-2 bg-gray-100 border border-gray-300 text-sm"
                        >
                          {key}
                        </th>
                      ) : null
                    )}
                    <th className="px-4 py-2 bg-gray-100 border border-gray-300 text-sm">
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
                            className="px-4 py-2 border border-gray-300 text-sm"
                          >
                            {item[key]}
                          </td>
                        ) : null
                      )}
                      <td
                        className="px-9 py-2 border border-gray-300 text-sm justify-center items-center"
                      >
                        <button
                          onClick={() => handleViewAccountDetails(item)} // Pass the row data to the handleViewAccountDetails function
                          className="focus:outline-none"
                        >
                          <FiEye /> {/* Display the Eye icon */}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p>No data available.</p>
          )}
        </>
      )}
      {selectedRowData && (
        <ViewAccount
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
  fetchAccountsClient,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountsList);
