export default function StrainCard({ strain }) {
    const effectLabels = {
      0: 'Very Relaxed',
      25: 'Relaxed',
      50: 'Neutral',
      75: 'Energetic',
      100: 'Very Energetic'
    };
  
    const getEffectLabel = (value) => {
      const closest = Object.keys(effectLabels).reduce((prev, curr) => 
        Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
      );
      return effectLabels[closest];
    };
  
    // Safe rating defaults
    const ratings = strain.ratings || {
      taste: 3,
      potency: 3,
      duration: 3,
      overall: 3
    };
  
    return (
      <div className="strain-card">
        <div className="card-header">
          <h3>{strain.name}</h3>
          <span className="effect-pill">
            {getEffectLabel(strain.effects)}
          </span>
        </div>
        
        <div className="effect-meter">
          <div 
            className="meter-fill"
            style={{ width: `${strain.effects}%` }}
          ></div>
        </div>
  
        <p className="card-comments">{strain.comments}</p>
  
        <div className="mt-4 space-y-2">
          <RatingItem label="Taste" value={ratings.taste} />
          <RatingItem label="Potency" value={ratings.potency} />
          <RatingItem label="Duration" value={ratings.duration} />
          <RatingItem label="Overall" value={ratings.overall} />
        </div>
        
        <div className="card-footer">
          <span className="date-badge">
            🗓️ {new Date(strain.date).toLocaleDateString()}
          </span>
        </div>
      </div>
    );
  }
  
  function RatingItem({ label, value }) {
    return (
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">{label}</span>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-lg ${
                i < value ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    );
  }