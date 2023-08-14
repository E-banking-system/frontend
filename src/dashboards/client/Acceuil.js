import React from "react";
import Header from "../../components/Header";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { month: "Jan", value: 100 },
  { month: "Feb", value: 200 },
  { month: "Mar", value: 150 },
  { month: "Apr", value: 300 },
  { month: "May", value: 250 },
  { month: "Jun", value: 400 },
];

const Acceuil = () => {
  return (
    <div className="items-center justify-center">
      {/* Header */}
      <nav className="bg-white py-4 px-8 flex justify-end mr-14 mt-8">
        <Header />
      </nav>

      {/* Transaction History Graph */}
      <div className="mt-4 flex justify-end mr-28">
        <div className="bg-white p-4 rounded">
          <LineChart width={600} height={500} data={data}>
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

export default Acceuil;
