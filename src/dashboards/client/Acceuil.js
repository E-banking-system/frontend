import React, { useEffect } from "react";
import Header from "../../components/Header";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from "recharts";
import { fetchAccountsClient, fetchTotalBalanceClient, fetchLastOpClient, fetchOperationsCountByTime  } from '../../actions/accountActions';
import { connect } from 'react-redux';

const Acceuil = ({ totalBalance, lastOp, operationsCountByTime, fetchLastOpClient, fetchTotalBalanceClient, fetchAccountsClient, fetchOperationsCountByTime  }) => {

    useEffect(() => {
        fetchAccountsClient();
        fetchTotalBalanceClient();
        fetchLastOpClient();
        fetchOperationsCountByTime();
    }, []);

    const transformOperationsCountByTime = () => {
        return operationsCountByTime.map(item => ({
            month: item.timeIntervalStart,
            value: item.operationsCount,
        }));
    };

    const chartData = transformOperationsCountByTime();
    
    
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
                        <p className="text-lg font-semibold text-gray-400">{totalBalance} DH</p>
                    </div>

                    {/* Last transaction */}
                    <div className="bg-white w-64 p-8 rounded-lg shadow-md ml-4 mr-4">
                        <h3 className="text-lg font-bold text-orange-500">Dernière Opération</h3>
                        <p className="text-lg font-semibold text-gray-400">
                            {new Date(lastOp).toLocaleDateString()} {new Date(lastOp).toLocaleTimeString()}
                        </p>
                    </div>
                </div>

                {/* Transaction History Graph */}
                <div className="bg-white p-4 rounded ml-4 mr-4">
                    <LineChart width={600} height={500} data={chartData}>
                        <XAxis dataKey="month">
                            <Label value="jours" position="insideBottom" offset={-5} />    
                        </XAxis> 
                        <YAxis>
                            <Label value="nombre d'opérations" position="insideLeft" angle={-90} offset={5} />
                        </YAxis>
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
      totalBalance: state.account.totalBalance,
      lastOp: state.account.lastOp,
      operationsCountByTime: state.account.operationsCountByTime,
    };
};

const mapDispatchToProps = {
    fetchAccountsClient,
    fetchTotalBalanceClient,
    fetchLastOpClient,
    fetchOperationsCountByTime 
};

export default connect(mapStateToProps, mapDispatchToProps)(Acceuil);
