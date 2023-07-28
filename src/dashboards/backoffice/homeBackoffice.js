import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addAccount } from '../../actions/accountActions';
import { useNavigate } from 'react-router-dom';

function HomeBackoffice() {

  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (!accessToken || role !== 'BANQUIER') {
      navigate('/');
    }
  }, [accessToken, role, navigate]);


  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  // const accountState = useSelector((state) => state.account);

  
  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      nature: e.target.nature.value,
      solde: parseFloat(e.target.solde.value),
      email: e.target.email.value,
    };
    alert("l'opération va prendre quelque seconds. Le code pin du client sera envoyer par email");
    dispatch(addAccount(formData));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-gray-800 w-1/4 p-4 h-screen fixed">
        <h1 className="text-white text-2xl font-bold mb-4">Banquier</h1>
        <div className="flex flex-col space-y-4">
          <button onClick={handleButtonClick} className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded mb-4">
            Ajouter Compte
          </button>
          <button onClick={handleLogout} className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded">
            logout
          </button>
        </div>
      </div>


      {/* Main Content */}
      <div className="w-3/4 p-4 ml-auto">
        {showForm ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">Hello banquier!</h1>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nature">
                  Nature
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nature"
                  type="text"
                  placeholder="Nature"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="solde">
                  Solde
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="solde"
                  type="number"
                  placeholder="Solde"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add Account
                </button>
              </div>
            </form>
          </div>
        ) : (
          <h1 className="text-2xl font-bold mb-4">Hello banquier!</h1>
        )}
      </div>
    </div>
  );
}

export default HomeBackoffice;
