import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAccount } from '../../actions/accountActions';

function HomeBackoffice() {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  // const accountState = useSelector((state) => state.account);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      nature: e.target.nature.value,
      solde: parseFloat(e.target.solde.value),
      dateCreation: e.target.dateCreation.value,
      datePeremption: e.target.datePeremption.value,
      derniereDateSuspention: e.target.derniereDateSuspention.value,
      derniereDateBloquage: e.target.derniereDateBloquage.value,
      email: e.target.email.value,
    };
    dispatch(addAccount(formData));
    alert("compte bien ajouté, le code PIN sera envoyé par email");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-gray-800 w-1/4 p-4 h-screen fixed">
        <h1 className="text-white text-2xl font-bold mb-4">Banquier</h1>
        <div className="flex flex-col space-y-4">
          <button onClick={handleButtonClick} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Ajouter Compte
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateCreation">
                  Date Creation
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="dateCreation"
                  type="datetime-local"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="datePeremption">
                  Date Peremption
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="datePeremption"
                  type="datetime-local"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="derniereDateSuspention">
                  Derniere Date Suspention
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="derniereDateSuspention"
                  type="datetime-local"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="derniereDateBloquage">
                  Derniere Date Bloquage
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="derniereDateBloquage"
                  type="datetime-local"
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
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
