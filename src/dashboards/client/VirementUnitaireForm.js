import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { effectuerVirement } from '../../actions/virementActions';
import { fetchAccountsClient } from '../../actions/accountActions';
import CustomAlert from '../../components/CustomAlert';
import { fetchBeneficiaires } from '../../actions/beneficierActions';
import { generateOtpToken } from '../../actions/otpActions';
import { verifyOtpToken } from '../../actions/otpActions';

const VirementForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [timerDuration, setTimerDuration] = useState(50);


  const [formData, setFormData] = useState({
    montant: 0,
    numCompteClient: '',
    numCompteBeneficier: '',
    verificationCode: '',
    codeVerified: false,
    verificationCodeSent: false,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const clientAccounts = useSelector((state) => state.account.data);
  const beneficierAccounts = useSelector((state) => state.beneficiaires.beneficiaires);
  
  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    setFormData((prevFormData) => ({
      ...prevFormData,
      clientId: userId || '',
    }));

    dispatch(fetchAccountsClient());
    dispatch(fetchBeneficiaires());
  }, [dispatch]);

  const handleSendVerificationCode = async () => {
    try {
      dispatch(generateOtpToken());
      setFormData((prevFormData) => ({
        ...prevFormData,
        verificationCodeSent: true,
      }));

      // Start the timer
      setTimerDuration(50); // Reset the timer duration to 50 seconds
      const timerInterval = setInterval(() => {
        setTimerDuration((prevDuration) => prevDuration - 1);
      }, 1000); // Update the timer every 1 second
      
      // After 50 seconds, clear the interval, close the input and reactivate the send code verification button
      setTimeout(() => {
        clearInterval(timerInterval);
        setFormData((prevFormData) => ({
          ...prevFormData,
          verificationCodeSent: false,
        }));
      }, 50000); // 50 seconds in milliseconds

    } catch (error) {
      setAlertMessage('Failed to send verification code');
      setIsOpen(true);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(verifyOtpToken({ otpToken: formData.verificationCode }));

      if (response.status === 200) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          codeVerified: true,
        }));
      } else {
        setAlertMessage('Verification code is wrong');
        setIsOpen(true);
      }
    } catch (error) {
      setAlertMessage('An error occurred while verifying OTP');
      setIsOpen(true);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.codeVerified) {
      setIsOpen(true);
      setAlertMessage('Please verify your code first');
      return;
    }

    if (formData.montant <= 0) {
      setIsOpen(true);
      setAlertMessage('Le montant doit être supérieur à 0.');
      return;
    }

    try {
      await dispatch(effectuerVirement(formData));
      setAlertMessage('Virement bien effectué');
      setIsOpen(true);
    } catch (error) {
      setAlertMessage(error.response.data);
      setIsOpen(true);
    }
  };

  const handleCancel = () => {
    setFormData({
      montant: 0,
      numCompteClient: '',
      numCompteBeneficier: '',
      verificationCode: '',
      codeVerified: false,
      verificationCodeSent: false,
    });
    onClose();
  };

  const handleAlertClose = () => {
    setIsOpen(false);
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white shadow-md rounded p-8 w-96">
        <h1 className="text-2xl font-bold mb-4">Effectuer un virement</h1>
        {!formData.codeVerified ? (
          <div>
            <div className="flex items-center justify-center">
            <button
              className={`bg-${formData.verificationCodeSent ? 'gray-200 text-black' : 'orange-400 text-white'} ${
                formData.verificationCodeSent ? 'cursor-not-allowed' : 'hover:bg-orange-500'
              } font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              onClick={handleSendVerificationCode}
              disabled={formData.verificationCodeSent}
            >
              code verification
            </button>

              <button
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
                type="button"
                onClick={handleCancel}
              >
                Annuler
              </button>
            </div>
            {formData.verificationCodeSent && (
              <div className="mt-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="verificationCode">
                  Verification Code
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="verificationCode"
                  type="text"
                  placeholder="Entrer Code Verification reçu par email"
                  value={formData.verificationCode}
                  onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value })}
                  required
                />
                <button
                  className="ml-48 mt-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleVerifyCode}
                  disabled={formData.verificationCode === ''}
                >
                  Verify Code
                </button>
                <p className="text-gray-400 text-sm ml-12 mt-2">
                  {`Remaining time: ${timerDuration} seconds`}
                </p>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="montant">
                Montant
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="montant"
                type="number"
                placeholder="Montant"
                step="0.01"
                min="100"
                onChange={(e) => setFormData({ ...formData, montant: parseFloat(e.target.value) })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numCompteClient">
                Numéro de compte client
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="numCompteClient"
                value={formData.numCompteClient}
                onChange={(e) => setFormData({ ...formData, numCompteClient: e.target.value })}
                required
              >
                <option value="" disabled>
                  selectionnez un de votre comptes
                </option>
                {clientAccounts &&
                  clientAccounts.filter((account) => account.etatCompte === 'ACTIVE').map((account) => (
                    <option key={account.id} value={account.numCompte}>
                      {account.numCompte}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numCompteBeneficier">
                Numéro de compte bénéficiaire
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="numCompteBeneficier"
                value={formData.numCompteBeneficier}
                placeholder="Numéro de compte bénéficiaire"
                onChange={(e) => setFormData({ ...formData, numCompteBeneficier: e.target.value })}
                required
              >
                <option value="" disabled>
                  selectionnez le compte de votre bénéficiaire
                </option>
                {beneficierAccounts &&
                  beneficierAccounts.map((account) => (
                    <option key={account.id} value={account.numCompte}>
                      {account.numCompte}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Effectuer
              </button>
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
                type="button"
                onClick={handleCancel}
              >
                Annuler
              </button>
            </div>
          </form>
        )}
        <CustomAlert
          isOpen={isOpen}
          onClose={handleAlertClose}
          title="Alert"
          message={alertMessage}
          actionLabel="OK"
        />
      </div>
    </div>
  );
};

export default VirementForm;
