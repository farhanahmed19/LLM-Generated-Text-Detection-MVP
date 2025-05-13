import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ResultChart = ({ chartData, title }) => (
  <div style={{ marginTop: '30px' }}>
    <h3>{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" stroke="#fff" />
        <YAxis stroke="#fff" />
        <Tooltip />
        <Legend />
        <Bar dataKey="confidence" fill="#0ea5e9" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default ResultChart;
