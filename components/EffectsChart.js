'use client';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function EffectsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/analytics');
        const result = await response.json();
        setData(result.map(item => ({
          ...item,
          value: Number(item.value.toFixed(1)) // Round to 1 decimal
        })));
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Average Ratings</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              label={{ 
                value: 'Rating Category', 
                position: 'bottom',
                offset: 0 
              }}
            />
            <YAxis 
              domain={[0, 5]}
              label={{ 
                value: 'Average Rating', 
                angle: -90, 
                position: 'insideLeft' 
              }}
            />
            <Tooltip 
              formatter={(value) => [value, 'Stars']}
              contentStyle={{ borderRadius: '8px' }}
            />
            <Bar 
              dataKey="value" 
              fill="#4CAF50" 
              radius={[4, 4, 0, 0]}
              name="Average Rating"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-gray-600 mt-4 text-sm">
        Shows average ratings across all strains (1-5 stars)
      </p>
    </div>
  );
}