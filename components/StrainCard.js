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
          
          <div className="card-footer">
            <span className="date-badge">
              🗓️ {new Date(strain.date).toLocaleDateString()}
            </span>
          </div>
        </div>
      );
    }
  