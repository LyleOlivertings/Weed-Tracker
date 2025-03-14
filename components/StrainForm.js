import { useState } from 'react';

export default function StrainForm({ onAddStrain }) {
  const [name, setName] = useState('');
  const [effects, setEffects] = useState(50);
  const [comments, setComments] = useState('');

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
    <form onSubmit={handleSubmit} className="form-container">
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

      <button
        type="submit"
        className="submit-button"
      >
        Add Strain 🌿
      </button>
    </form>
  );
}
