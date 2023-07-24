import React, { useState } from 'react';
import { connect } from 'react-redux';
import { registerBanquier } from '../actions/actions';

const TestComponent = ({ registerBanquier }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    gender: '',
    adresse: '',
    cin: '',
    telephone: '',
    operateur: '',
    banqueId: '',
    password: '',
    role: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const responseData = await registerBanquier(formData);
    console.log('Response data:', responseData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom:
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Prénom:
        <input
          type="text"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Email:
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Gender:
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Adresse:
        <input
          type="text"
          name="adresse"
          value={formData.adresse}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Cin:
        <input
          type="text"
          name="cin"
          value={formData.cin}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Téléphone:
        <input
          type="text"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Opérateur:
        <input
          type="text"
          name="operateur"
          value={formData.operateur}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Banque ID:
        <input
          type="text"
          name="banqueId"
          value={formData.banqueId}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Role:
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
        />
      </label>
      <br />

      <button type="submit">Register</button>
    </form>
  );
};

const mapDispatchToProps = {
  registerBanquier,
};

export default connect(null, mapDispatchToProps)(TestComponent);
