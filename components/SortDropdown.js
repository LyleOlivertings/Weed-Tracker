'use client';

export default function SortDropdown({ onSortChange }) {
  return (
    <select 
      className="p-2 border rounded-lg"
      onChange={(e) => onSortChange(e.target.value)}
    >
      <option value="date-desc">Newest First</option>
      <option value="date-asc">Oldest First</option>
      <option value="name-asc">A → Z</option>
      <option value="name-desc">Z → A</option>
      <option value="effect-asc">Most Relaxed</option>
      <option value="effect-desc">Most Energetic</option>
      <option value="rating-desc">Highest Rated</option>
      <option value="rating-asc">Lowest Rated</option>
    </select>
  );
}