import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchNotifications } from '../../actions/notificationActions';
import { FaBell } from 'react-icons/fa'; // Import the FaBell icon

// Function to format date as "01 Aug"
function getFormattedDate(dateString) {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return new Intl.DateTimeFormat('fr-FR', options).format(date);
}

function Notifications({ userId, notifications, loading, error, fetchNotifications }) {
  const [visibleNotifications, setVisibleNotifications] = useState(7); // Number of notifications to display initially

  useEffect(() => {
    fetchNotifications(userId);
  }, [fetchNotifications, userId]);

  // Extract unique dates from notifications
  const uniqueDates = Array.from(new Set(notifications.map(notification => getFormattedDate(notification.dateEnvoie))));

  const handleShowMore = () => {
    setVisibleNotifications(prevVisibleNotifications => prevVisibleNotifications + 7); // Increase the number of visible notifications by 7
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 mt-6 text-left">Notifications:</h2>
     <div className="flex justify-center">
      <div className="w-3/5">
        {loading ? (
          <p>Loading notifications...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : notifications && notifications.length ? (
          <>
            {uniqueDates.map(date => (
              <div key={date} className="mb-4">
                <div className="flex justify-center"> 
                  <div className="w-1/6 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-sm mb-2">
                    {date}
                  </div>
                </div>
                <ul>
                  {notifications
                    .filter(notification => getFormattedDate(notification.dateEnvoie) === date)
                    .slice(0, visibleNotifications) 
                    .map(notification => (
                      <li
                        key={notification.id}
                        className="bg-white p-4 rounded-lg border border-gray-300 shadow mb-4 flex items-start"
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
                    ))}
                </ul>
              </div>
            ))}
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
  };
};

const mapDispatchToProps = {
  fetchNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
