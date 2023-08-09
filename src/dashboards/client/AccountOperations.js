import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { fetchAccountOperations } from "../../actions/accountActions";
import moment from 'moment';
import { FaArrowDown , FaArrowUp } from 'react-icons/fa';


const AccountOperations = ({ rowData, onClose, accountOperations, fetchAccountOperations }) => {
    const { data, loading, error } = accountOperations;

    useEffect(() => {
        if (rowData && rowData.id) {
            fetchAccountOperations(rowData.id);
        }
    }, [rowData, fetchAccountOperations]);

    console.log("ops: " + JSON.stringify(data));
    return (
        <div className="flex justify-center  min-h-screen ">
            <div className="max-w-screen-lg w-full p-6">
                <h2 className="text-2xl font-semibold mb-4 text-left">Historiques</h2>
                <ul className="space-y-4">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : data.length > 0 ? (
                        data.map((operation) => (
                            <li key={operation.id} className="bg-white p-4 shadow-md rounded">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-semibold text-lg">
                                            Montant: <span className="font-semibold">{operation.montant} MAD</span>
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            {moment(operation.dateOperation).format('DD MMM YYYY HH:mm:ss')}
                                        </span>
                                    </div>
                                    <div className="text-lg">
                                        {operation.estDepot ? (
                                            <>
                                            <span className="text-green-500 mr-2">Depot</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 transform rotate-180 text-green-500 ml-3"
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
                                            <span className="text-red-500 mr-2">Retrait</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-red-500 ml-3"
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
                                            <span className="text-blue-500">Virement Unitaire</span>
                                        ) : null}
                                    </div>
                                </div>
                            </li>
                        ))                                                
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
