import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchNotifications } from '../../actions/notificationActions';
import { fetchAccounts } from '../../actions/accountActions'; 
import { updateAccountStateOnly } from '../../actions/accountActions';
import { FaBell } from 'react-icons/fa';

function getFormattedDate(dateString) {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return new Intl.DateTimeFormat('fr-FR', options).format(date);
}

function Notifications({ userId, notifications, loading, error, fetchNotifications, fetchAccounts, updateAccountStateOnly }) {
  const [visibleNotifications, setVisibleNotifications] = useState(7);

  useEffect(() => {
    fetchNotifications(userId);
  }, [fetchNotifications, userId]);

  const sortedNotifications = [...notifications].sort((a, b) => new Date(b.dateEnvoie) - new Date(a.dateEnvoie));

  const handleShowMore = () => {
    setVisibleNotifications(prevVisibleNotifications => prevVisibleNotifications + 7);
  };

  const renderedDates = new Set();

  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleDemande = async (accountId, demandeType) => {
    try {
      const updatedData = { id: accountId };
      
      if (demandeType === "activer") {
        updatedData.etatCompte = "ACTIVE";
      } else if (demandeType === "bloquer") {
        updatedData.etatCompte = "BLOCKE";
      } else if (demandeType === "suspendre") {
        updatedData.etatCompte = "SUSPENDU";
      }

      await updateAccountStateOnly(updatedData); 
      closeModal();

    } catch (error) {
      console.error("Error handling demande:", error);
    }
  };

  const handleNotificationClick = async (notification) => {
    try {
      const accountsResponse = await fetchAccounts(1, notification.contenu.split(":")[1].trim());
  
      const AccountStateComponent = ({ accountsResponse }) => (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white shadow-md rounded p-8 w-96">
            <h1 className="text-2xl font-bold mb-4">Accepter demande?</h1>
            {notification.titre.includes("Demande d'activation") ? (
              <div>
                <p>Le client {accountsResponse[0].id} demande d'activer son compte</p>
                <div className="flex items-center justify-center mt-4 space-x-2">
                  <button
                    className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => closeModal()}
                  >
                    Annuler
                  </button>
                  <button
                    className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleDemande(accountsResponse[0].id, "activer")}
                  >
                    Activer
                  </button>
                </div>
              </div>
            ) : notification.titre.includes("Demande de block") ? (
              <div>
                <p>Le client {accountsResponse[0].id} demande de bloquer son compte</p>
                <div className="flex items-center justify-center mt-4 space-x-2">
                  <button
                    className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => closeModal()}
                  >
                    Annuler
                  </button>
                  <button
                    className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleDemande(accountsResponse[0].id, "bloquer")}
                  >
                    Bloquer
                  </button>
                </div>
              </div>
            ) : notification.titre.includes("Demande de suspen") ? (
              <div>
                <p>Le client {accountsResponse[0].id} demande de suspendre son compte</p>
                <div className="flex items-center justify-center mt-4 space-x-2">
                  <button
                    className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => closeModal()}
                  >
                    Annuler
                  </button>
                  <button
                    className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleDemande(accountsResponse[0].id, "suspendre")}
                  >
                    Suspendre
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                onClick={() => closeModal()}
              >
                Fermer
              </button>
            )}
          </div>
        </div>
      );      
      setModalContent(<AccountStateComponent accountsResponse={accountsResponse}/>);
      setIsOpen(true);
  
    } catch (error) {
      alert(`Error fetching accounts: ${error.message}`);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold ml-64 mb-4 mt-6 text-left">Notifications:</h2>
      <div className="flex justify-center">
        <div className="w-3/5">
          {loading ? (
            <p>Loading notifications...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : notifications && notifications.length ? (
            <>
              {sortedNotifications
                .slice(0, visibleNotifications)
                .map(notification => {
                  const formattedDate = getFormattedDate(notification.dateEnvoie);
                  const shouldRenderDate = !renderedDates.has(formattedDate);
                  if (shouldRenderDate) {
                    renderedDates.add(formattedDate);
                  }

                  return (
                    <div key={notification.id} className="mb-4">
                      {shouldRenderDate && (
                        <div className="flex justify-center"> 
                          <div className="w-1/6 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-sm mb-2">
                            {formattedDate}
                          </div>
                        </div>
                      )}
                      <ul>
                        <li
                          key={notification.id}
                          className="bg-white p-4 rounded-lg border border-gray-300 shadow mb-4 flex items-start"
                          onClick={() => handleNotificationClick(notification)}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="flex items-center"> 
                            <div className="w-6 h-6 text-orange-500 mr-4">
                              <FaBell /> 
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold mb-2">{notification.titre}</h3>
                              <p className="text-sm mb-4">{notification.contenu}</p>
                              <p className="text-xs text-gray-400">
                                {new Date(notification.dateEnvoie).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  );
                })}
              {visibleNotifications < notifications.length && (
                <div className="flex justify-center">
                  <button
                    onClick={handleShowMore}
                    className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg mt-4 "
                  >
                    voir plus
                  </button>
                </div>
              )}
            </>
          ) : (
            <p>Pas de notification</p>
          )}
          {isOpen && modalContent}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notification.notifications,
    loading: state.notification.loading,
    error: state.notification.error,
    accountsData: state.account.data,
  };
};

const mapDispatchToProps = {
  fetchNotifications,
  fetchAccounts,
  updateAccountStateOnly,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
