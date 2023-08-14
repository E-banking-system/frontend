import React, { useEffect } from "react";
import Header from "../../components/Header";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { fetchAccountsClient } from '../../actions/accountActions';
import { connect } from 'react-redux';

const Acceuil = ({ data, loading, error, fetchAccountsClient }) => {

    const chartData = [
      { month: "Jan", value: 100 },
      { month: "Feb", value: 200 },
      { month: "Mar", value: 150 },
      { month: "Apr", value: 300 },
      { month: "May", value: 250 },
      { month: "Jun", value: 400 },
    ];

    useEffect(() => {
        fetchAccountsClient();
    }, []);

    const totalSolde = data.reduce((acc, item) => acc + item.solde, 0);
    
    return (
        <div>
            {/* Header */}
            <nav className="bg-white py-4 px-8 flex justify-end mr-14 mt-8">
                <Header />
            </nav>

            {/* Content */}
            <div className="flex items-center justify-center">

                <div className="flex flex-col">
                    {/* Total Solde */}
                    <div className="bg-white w-64 p-8 rounded-lg shadow-md mb-4 ml-4 mr-4">
                        <h3 className="text-lg font-bold text-orange-500">Solde Total</h3>
                        <p className="text-lg font-semibold text-gray-400">{totalSolde} DH</p>
                    </div>

                    {/* Last transaction */}
                    <div className="bg-white w-64 p-8 rounded-lg shadow-md ml-4 mr-4">
                        <h3 className="text-lg font-bold text-orange-500">Dérniere Opération</h3>
                        <p className="text-lg font-semibold text-gray-400">14/08/2023</p>
                    </div>
                </div>

                {/* Transaction History Graph */}
                <div className="bg-white p-4 rounded ml-4 mr-4">
                    <LineChart width={600} height={500} data={chartData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                </div>
                
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
      data: state.account.data,
      loading: state.account.loading,
      error: state.account.error,
    };
};

const mapDispatchToProps = {
    fetchAccountsClient,
};

export default connect(mapStateToProps, mapDispatchToProps)(Acceuil);
