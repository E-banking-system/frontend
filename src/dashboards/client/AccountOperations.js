import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { fetchAccountOperations } from "../../actions/accountActions";
import moment from 'moment';

const AccountOperations = ({ rowData, accountOperations, fetchAccountOperations }) => {
    const { data, loading, error } = accountOperations;
    const [visibleOps, setVisibleOps] = useState(10);

    const handleShowMore = () => {
        setVisibleOps(prevVisibleOps => prevVisibleOps + 7);
    };

    useEffect(() => {
        if (rowData && rowData.id) {
            fetchAccountOperations(rowData.id, visibleOps);
        }
    }, [rowData, fetchAccountOperations, visibleOps]);

    // Sort the operations based on dates
    const sortedData = [...data].sort((a, b) => new Date(b.dateOperation) - new Date(a.dateOperation));
   
    return (
        <div className="flex justify-center min-h-screen">
            <div className="max-w-screen-lg w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-left">Historiques</h2>
                    <button
                        className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded-lg"
                        onClick={() => window.location.reload()} // To return to AccountList
                    >
                        Liste des comptes
                    </button>
                </div>
                <ul className="space-y-4">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : sortedData.length > 0 ? (
                        <>
                        {sortedData.slice(0, visibleOps).map((operation) => (
                            <li key={operation.id} className="bg-white p-4 shadow-md rounded">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-semibold text-lg">
                                            Montant: <span className="font-semibold">{(operation.montant > 0) ? operation.montant: (operation.montant * (-1))} MAD</span>
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            {moment(operation.dateOperation).format('DD MMM YYYY HH:mm:ss')}
                                        </span>
                                    </div>
                                    <div className="text-lg">
                                        {operation.estDepot ? (
                                            <>
                                            <span className="text-green-500 mr-16 ml-1">Depot</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 transform rotate-180 text-green-500 ml-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                />
                                            </svg>
                                            </>
                                        ) : operation.estRetrait ? (
                                            <>
                                            <span className="text-red-500 mr-16 ml-1">Retrait</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-red-500 ml-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                />
                                            </svg>
                                            </>
                                        ) : operation.estVirementUnitaire ? ( 
                                            (rowData.id === operation.compteId) ? 
                                            (
                                                <>
                                                    <span className="text-gray-500 mr-7">Virement unitaire</span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 text-gray-400 ml-16"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                    />
                                                </svg>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-gray-500 mr-7">Virement unitaire</span>
                                                    <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 transform rotate-180 text-gray-400 ml-16"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                    />
                                                    </svg>
                                                </>
                                            )
                                        ) : operation.estVirementPermanent ? ( 
                                            (rowData.id === operation.compteId) ? 
                                            (
                                                <>
                                                    <span className="text-gray-500">Virement permanent</span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 text-gray-400 ml-16"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                    />
                                                </svg>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-gray-500">Virement permanent</span>
                                                    <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 transform rotate-180 text-gray-400 ml-16"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                    />
                                                    </svg>
                                                </>
                                            )
                                        ) : null}
                                    </div>
                                </div>
                            </li>
                        ))}
                        {<div className="flex justify-center">
                            <button
                            onClick={handleShowMore}
                            className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg mt-4 "
                            >
                            voir plus
                            </button>
                        </div>} 
                        
                    </>                                           
                    ) : (
                        <p>No operation data available.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    accountOperations: state.account, 
});

const mapDispatchToProps = {
    fetchAccountOperations,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountOperations);
