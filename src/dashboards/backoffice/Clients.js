import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchClients } from '../../actions/clientActions';
import Header from '../../components/Header';
import { FiSearch } from 'react-icons/fi'; 

function Clients({ clients, loading, error, fetchClients }) {
  const [clientsToShow, setClientsToShow] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchClients(0, clientsToShow, searchTerm);
  }, [fetchClients, clientsToShow, searchTerm]);

  const handleShowMore = () => {
    setClientsToShow(prevClients => prevClients + 5);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    fetchClients(0, clientsToShow, event.target.value);
  };

  return (
    <div className="container mx-auto my-8 ml-56">
      <>
        {/* Combined Navigation and Search Bar */}
        <nav className="bg-white py-4 px-1 flex justify-between items-center ">
          <div className="flex-grow items-center space-x-4">
            <div className="relative mr-10">
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
          <Header />
        </nav>  
          
        <h2 className="text-xl font-semibold mb-4">Clients:</h2>
        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : clients && clients.length ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
              <thead>
                <tr>
                  {Object.keys(clients[0]).map((key) =>
                    key !== 'id' ? (
                      <th
                        key={key}
                        className="px-4 py-2 bg-gray-100 border border-gray-300"
                      >
                        {key}
                      </th>
                    ) : null
                  )}
                </tr>
              </thead>
              <tbody>
                {clients.map((item) => (
                  <tr key={item.id}>
                    {Object.keys(item).map((key) =>
                      key !== 'id' ? (
                        <td
                          key={key}
                          className="px-4 py-2 border border-gray-300"
                        >
                          {item[key]}
                        </td>
                      ) : null
                    )}
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
          Voir plus
        </button>
      </>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    clients: state.clients.clients,
    loading: state.clients.loading,
    error: state.clients.error,
  };
};

const mapDispatchToProps = {
  fetchClients,
};

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
