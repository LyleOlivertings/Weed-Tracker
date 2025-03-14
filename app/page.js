'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import StrainCard from '@/components/StrainCard';
import Header from '@/components/Header';
import AuthLayout from '@/components/AuthLayout';
import EffectsChart from '@/components/EffectsChart';
import AddStrainButton from '@/components/AddStrainButton';
import SortDropdown from '@/components/SortDropdown';
import SearchFilters from '@/components/SearchFilters';

export default function Home() {
  const [strains, setStrains] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    minEffect: 0,
    maxEffect: 100,
    minRating: 0
  });

  const fetchStrains = async () => {
    try {
      const params = new URLSearchParams(filters);
      const response = await fetch(`/api/strains?${params}`);
      const data = await response.json();
      setStrains(data);
    } catch (error) {
      console.error('Error fetching strains:', error);
    }
  };

  useEffect(() => {
    fetchStrains();
  }, [filters]);


  

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
            <SearchFilters onFilterChange={setFilters} />
            <AddStrainButton onAddStrain={fetchStrains} />
            
            <div className="cards-grid">
              {strains.map((strain) => (
                <StrainCard key={strain._id} strain={strain} />
              ))}
            </div>

            {strains.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No strains found matching your filters
              </div>
            )}

            <EffectsChart />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}