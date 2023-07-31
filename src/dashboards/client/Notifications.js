import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchNotifications } from '../../actions/notificationActions';

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
            <li key={notification.id}>
              <h3 className="text-lg font-bold">{notification.titre}</h3>
              <p>{notification.contenu}</p>
              <p className="text-sm text-gray-500">{notification.dateEnvoie}</p>
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
