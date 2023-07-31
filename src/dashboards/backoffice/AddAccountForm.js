import React from 'react';
import { useDispatch } from 'react-redux';
import { addAccount } from '../../actions/accountActions';

function AddAccountForm() {

    const dispatch = useDispatch();
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
  );
}

export default AddAccountForm;
