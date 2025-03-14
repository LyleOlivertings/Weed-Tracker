'use client';
import { useState } from 'react';
import StrainForm from './StrainForm';

export default function AddStrainButton({ onAddStrain }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-green-500 text-white p-4 md:px-6 md:py-3 rounded-full shadow-xl hover:bg-green-600 transition-all flex items-center gap-2 z-50"
        style={{
          // Add iOS touch-friendly sizing
          minWidth: '56px',
          minHeight: '56px'
        }}
      >
        <span className="text-2xl md:text-xl">+</span>
        <span className="hidden md:inline">Add Strain</span>
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