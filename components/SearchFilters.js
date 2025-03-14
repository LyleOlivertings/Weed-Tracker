'use client';
import { useState, useEffect } from 'react';

export default function SearchFilters({ onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [minEffect, setMinEffect] = useState(0);
  const [maxEffect, setMaxEffect] = useState(100);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    const handler = setTimeout(() => {
      onFilterChange({
        search: searchTerm,
        minEffect,
        maxEffect,
        minRating
      });
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, minEffect, maxEffect, minRating]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label className="block mb-2 font-medium">Search Strains</label>
          <input
            type="text"
            placeholder="Blue Dream, Sour Diesel..."
            className="w-full p-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Effects Range: {minEffect}% - {maxEffect}%
          </label>
          <div className="space-y-4">
            <input
              type="range"
              min="0"
              max="100"
              value={minEffect}
              onChange={(e) => setMinEffect(Number(e.target.value))}
              className="w-full"
            />
            <input
              type="range"
              min="0"
              max="100"
              value={maxEffect}
              onChange={(e) => setMaxEffect(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Minimum Rating: {minRating}+ Stars
          </label>
          <select
            className="w-full p-2 border rounded-lg"
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
          >
            {[0, 1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num === 0 ? 'Any Rating' : `${num}+ Stars`}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}