import { useState } from 'react';
import { StarRating } from './StarRating';

export default function StrainForm({ onAddStrain }) {
    const [ratings, setRatings] = useState({
        taste: 3,
        potency: 3,
        duration: 3,
        overall: 3
      });
  const [name, setName] = useState('');
  const [effects, setEffects] = useState(50);
  const [comments, setComments] = useState('');

  const handleRatingChange = (name, value) => {
    setRatings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    
    onAddStrain({
      id: Date.now(),
      name,
      effects: parseInt(effects),
      comments,
      date: new Date().toISOString()
    });
    
    setName('');
    setEffects(50);
    setComments('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-group">
        <label>Strain Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label className="effect-label">
          Effects: {effects}% ({effects >= 70 ? '⚡ Energetic' : effects >= 40 ? '➖ Neutral' : '😌 Relaxed'})
        </label>
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="100"
            value={effects}
            onChange={(e) => setEffects(e.target.value)}
            className="styled-slider"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Comments</label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="form-textarea"
          rows="3"
        />
      </div>

      <div className="space-y-4 mt-6">
        <div className="rating-item">
          <label>Taste Rating</label>
          <StarRating
            value={ratings.taste}
            onChange={(value) => handleRatingChange('taste', value)}
          />
        </div>
        
        <div className="rating-item">
          <label>Potency Rating</label>
          <StarRating
            value={ratings.potency}
            onChange={(value) => handleRatingChange('potency', value)}
          />
        </div>

        <div className="rating-item">
          <label>Duration Rating</label>
          <StarRating
            value={ratings.duration}
            onChange={(value) => handleRatingChange('duration', value)}
          />
        </div>

        <div className="rating-item">
          <label>Overall Experience</label>
          <StarRating
            value={ratings.overall}
            onChange={(value) => handleRatingChange('overall', value)}
          />
        </div>
      </div>

      <button
        type="submit"
        className="submit-button"
      >
        Add Strain 🌿
      </button>
    </form>
  );
}
