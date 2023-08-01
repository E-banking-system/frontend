import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAccountsClient } from '../../actions/accountActions';
import { FiEye } from 'react-icons/fi';
import ViewAccount from './ViewAccount';

function AccountsList({ data, loading, error, fetchAccountsClient }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowData, setSelectedRowData] = useState(null);
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    fetchAccountsClient(userId);
  }, [fetchAccountsClient, userId]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewAccountDetails = (rowData) => {
    setSelectedRowData(rowData);
  };

  return (
    <div className="container mx-auto my-8">
      {!selectedRowData && (
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
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
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
