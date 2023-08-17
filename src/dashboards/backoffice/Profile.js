import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo, updateUserInfo } from '../../actions/profileActions';
import CustomAlert from '../../components/CustomAlert';
import Header from '../../components/Header';

const Profile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.profile.userInfo);

  const [isOpen, setIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    address: '',
    tel: '',
    gender: '',
    cin: '',
    email: '',
    operateur: '',
  });

  useEffect(() => {
    dispatch(fetchUserInfo(localStorage.getItem("accessToken"),localStorage.getItem("user_id")));
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        id: userInfo.id,
        nom: userInfo.nom,
        prenom: userInfo.prenom,
        address: userInfo.address,
        tel: userInfo.tel,
        gender: userInfo.gender,
        cin: userInfo.cin,
        email: userInfo.email,
        operateur: userInfo.operateur,
      });
    }
  }, [userInfo]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(formData));
    setAlertMessage('Opérateur bien modifié');
    setIsOpen(true);
  };

  const handleAlertClose = () => {
    setIsOpen(false);
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
    {/* Header */}
    <nav className="bg-white py-4 px-8 flex justify-end mr-14 mt-8">
      <Header />
    </nav>
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Votre Profile</h1>
      <p className="text-lg font-medium">
        {userInfo.prenom} {userInfo.nom}
      </p>
      <p className="text-gray-600 text-sm">{userInfo.email}</p>

      <form className="mt-6" onSubmit={handleUpdate}>
        <div className="mb-4 flex items-center">
          <label className="block text-orange-500 font-semibold w-1/4" htmlFor="nom">
            Nom
          </label>
          <div className="relative w-3/4">
            <input
              type="text"
              id="nom"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              readOnly
              className="form-input bg-gray-100 border border-black rounded-lg border-2 w-full px-4"
            />
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <label className="block text-orange-500 font-semibold w-1/4" htmlFor="prenom">
            Prénom
          </label>
          <div className="relative w-3/4">
            <input
              type="text"
              id="prenom"
              value={formData.prenom}
              onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
              readOnly
              className="form-input bg-gray-100 border border-black rounded-lg border-2 w-full px-4"
            />
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <label className="block text-orange-500 font-semibold w-1/4" htmlFor="gender">
            Gender
          </label>
          <div className="relative w-3/4">
            <input
              type="text"
              id="gender"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              readOnly
              className="form-input bg-gray-100 border border-black rounded-lg border-2 w-full px-4"
            />
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <label className="block text-orange-500 font-semibold w-1/4" htmlFor="cin">
            CIN
          </label>
          <div className="relative w-3/4">
            <input
              type="text"
              id="cin"
              value={formData.cin}
              onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
              readOnly
              className="form-input bg-gray-100 border border-black rounded-lg border-2 w-full px-4"
            />
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <label className="block text-orange-500 font-semibold w-1/4" htmlFor="address">
            Address
          </label>
          <div className="relative w-3/4">
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              readOnly
              className="form-input bg-gray-100 border border-black rounded-lg border-2 w-full px-4"
            />
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <label className="block text-orange-500 font-semibold w-1/4" htmlFor="tel">
            Tel
          </label>
          <div className="relative w-3/4">
            <input
              type="text"
              id="tel"
              value={formData.tel}
              onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
              readOnly
              className="form-input bg-gray-100 border border-black rounded-lg border-2 w-full px-4"
            />
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <label className="block text-orange-500 font-semibold w-1/4" htmlFor="operateur">
            Opérateur
          </label>
          <div className="relative w-3/4">
            <input
              type="text"
              id="operateur"
              value={formData.operateur}
              onChange={(e) => setFormData({ ...formData, operateur: e.target.value })}
              className="form-input bg-gray-100 border border-black rounded-lg border-2 w-full px-4"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded mt-6"
        >
          Update Profile
        </button>

      </form>
      
      <CustomAlert isOpen={isOpen} onClose={handleAlertClose} title="Alert" message={alertMessage} actionLabel="OK" />
    </div>
    </>
  );
};

export default Profile;
