import React from 'react';
import Modal from 'react-modal';

const CustomAlert = ({ isOpen, onClose, title, message, actionLabel }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white border rounded-lg shadow-lg p-4 max-w-md mx-auto mt-24"
      overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
    >
      <div className="text-center">
        <p className="text-lg font-bold mb-4">{title}</p>
        <p className="mb-4">{message}</p>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          onClick={onClose}
        >
          {actionLabel}
        </button>
      </div>
    </Modal>
  );
};

export default CustomAlert;
