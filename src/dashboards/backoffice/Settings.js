import React, { useState } from 'react';
import ChangePasswordForm from './changePasswordForm';

const Settings = () => {
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
    
    const handleShowChangePasswordForm = () => {
        setShowChangePasswordForm(true);
    };

    const handleHideChangePasswordForm = () => {
        setShowChangePasswordForm(false);
    };

    return (
        <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold mb-4">Paramètres</h1>
            <div className="max-w-xl mt-16 mx-auto flex space-x-4">
                <button
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
                    onClick={handleShowChangePasswordForm}
                >
                    Changement de mot de passe
                </button>
                <button
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
                    // onClick={handleChangeLanguage}
                >
                    Changement de langue
                </button>
            </div>
            {showChangePasswordForm && <ChangePasswordForm onCancel={handleHideChangePasswordForm}/>}
        </div>
    );
}

export default Settings;
