'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import StrainForm from '@/components/StrainForm';
import StrainCard from '@/components/StrainCard';
import Header from '@/components/Header';
import AuthLayout from '@/components/AuthLayout';
import EffectsChart from '@/components/EffectsChart';
import AddStrainButton from '@/components/AddStrainButton';

export default function Home() {
  const { data: session } = useSession();
  const [strains, setStrains] = useState([]);

  useEffect(() => {
    fetchStrains();
  }, []);

  const fetchStrains = async () => {
    try {
      const response = await fetch('/api/strains');
      const data = await response.json();
      setStrains(data);
    } catch (error) {
      console.error('Error fetching strains:', error);
    }
  };

  const handleAddStrain = async (newStrain) => {
    try {
      const response = await fetch('/api/strains', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStrain),
      });
      
      if (response.ok) {
        const createdStrain = await response.json();
        setStrains([createdStrain, ...strains]);
      }
    } catch (error) {
      console.error('Error adding strain:', error);
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen">
        <Header />
        <div className="app-container">
          <div className="main-content">
            <h1 className="app-title">🌱 Weed Strain Tracker</h1>
            <AddStrainButton onAddStrain={handleAddStrain} />
            <div className="cards-grid">
              {strains.map((strain) => (
                <StrainCard key={strain._id} strain={strain} />
              ))}
            </div>
            <EffectsChart />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}