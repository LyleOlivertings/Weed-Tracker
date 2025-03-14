'use client';
import { useState } from 'react';

export function StarRating({ value = 0, onChange }) {
  const [hover, setHover] = useState(0);
  
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            key={ratingValue}
            type="button"
            className={`text-2xl ${
              ratingValue <= (hover || value)
                ? 'text-yellow-400'
                : 'text-gray-300'
            }`}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(ratingValue)}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}