import React from 'react';
import { FiMessageSquare, FiBell } from 'react-icons/fi';
import { fetchNbrNotif } from '../actions/clientActions';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';


function Header({fetchNbrNotif,nbrNotif}) {
  
  useEffect(() => {
    fetchNbrNotif();
  }, []);

  
  return (
    <div className="flex items-center">
      <div className="relative ml-2 mr-8">
        <FiMessageSquare className="h-6 w-6 text-gray-500 mt-3" />
        <span className="absolute top-2 left-2 rounded-full bg-red-500 text-white text-xs leading-tight px-1">
          3
        </span>
      </div>
      <div className="relative ml-2 mr-8">
        <FiBell className="h-6 w-6 text-gray-500 mt-3" />
        <span className="absolute top-2 left-2 rounded-full bg-red-500 text-white text-xs leading-tight px-1">
          {nbrNotif}
        </span>
      </div>
      <div>
        <span className="text-lg font-semibold">{localStorage.getItem("nom")} {localStorage.getItem("prenom")}</span>
        <br />
        <span className="text-sm text-gray-500 flex flex-col items-center justify-center">{localStorage.getItem("role")}</span>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    nbrNotif: state.clients.nbrNotif,
  };
};

const mapDispatchToProps = {
  fetchNbrNotif
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

