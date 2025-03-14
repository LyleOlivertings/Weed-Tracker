'use client';
import { useState } from 'react';
import StrainForm from './StrainForm';

export default function AddStrainButton({ onAddStrain }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition-all flex items-center gap-2"
      >
        <span className="text-2xl">+</span>
        Add Strain
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">Add New Strain</h2>
            <StrainForm 
              onAddStrain={(strain) => {
                onAddStrain(strain);
                setIsOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}