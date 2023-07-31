import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchNotifications } from '../../actions/notificationActions';
import { FaBell } from 'react-icons/fa'; // Import the FaBell icon

function Notifications({ userId, notifications, loading, error, fetchNotifications }) {
  useEffect(() => {
    fetchNotifications(userId);
  }, [fetchNotifications, userId]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Notifications:</h2>
      {loading ? (
        <p>Loading notifications...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : notifications && notifications.length ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className="bg-white p-4 rounded-lg border border-gray-300 shadow mb-4 flex items-center">
              <div className="inline-block mr-4">
                    <FaBell className="w-6 h-6 text-orange-500 mr-4" /> {/* Notification icon */}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{notification.titre}</h3>
                <p className="text-sm mb-4">{notification.contenu}</p>
                <p className="text-xs text-gray-400">{notification.dateEnvoie}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications available.</p>
      )}
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
