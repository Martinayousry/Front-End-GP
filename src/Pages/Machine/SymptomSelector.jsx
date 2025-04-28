import React, { useState } from 'react';
import './SymptomSelector.css';

const SymptomSelector = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const allSymptoms = [
    "Fever", "Nasal Discharge", "Loss of appetite", "Weight Loss", "Lameness", 
    "Breathing Difficulty", "Swollen Lymph nodes", "Lethargy", "Depression", 
    "Coughing", "Diarrhea", "Seizures", "Vomiting", "Eating less than usual", 
    "Excessive Salivation", "Redness around Eye area", "Severe Dehydration", 
    "Pain", "Discomfort", "Sepsis", "WeightLoss", "Tender abdomen", 
    "Increased drinking and urination", "Bloated Stomach", "Yellow gums", 
    "Constipation", "Paralysis", "Wrinkled forehead", "Continuously erect and stiff ears", 
    "Grinning appearance", "Stiff and hard tail", "Stiffness of muscles", "Acute blindness", 
    "Blood in urine", "Hunger", "Cataracts", "Losing sight", "Glucose in urine", 
    "Burping", "blood in stools", "Passing gases", "Eating grass", "Scratching", 
    "Licking", "Itchy skin", "Redness of skin", "Face rubbing", "Loss of Fur", 
    "Swelling of gum", "Redness of gum", "Receding gum", "Bleeding of gum", 
    "Plaque", "Bad breath", "Tartar", "Lumps", "Swelling", "Red bumps", 
    "Scabs", "Irritation", "Dry Skin", "Fur loss", "Red patches", "Heart Complication", 
    "Weakness", "Aggression", "Pale gums", "Coma", "Collapse", "Abdominal pain", 
    "Difficulty Urinating", "Dandruff", "Anorexia", "Blindness", "excess jaw tone", 
    "Urine infection", "Lack of energy", "Smelly", "Neurological Disorders", 
    "Eye Discharge", "Loss of Consciousness", "Enlarged Liver", "lethargy", 
    "Purging", "Bloody discharge", "Wounds"
  ].map((symptom, index) => ({ id: `${index + 1}`, name: symptom }));

  const filteredSymptoms = allSymptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSymptom = (symptomId) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const formatSymptomsForApi = () => {
    const apiData = {};
    selectedSymptoms.forEach(id => {
      const symptom = allSymptoms.find(s => s.id === id);
      if (symptom) {
        apiData[symptom.name] = 1;
      }
    });
    return apiData;
  };

  const handleSubmit = async () => {
    const apiData = formatSymptomsForApi();
    setIsLoading(true);
    setError(null);
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:8080/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setApiResponse(data);
      
    } catch (error) {
      console.error('Error submitting symptoms:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="box">
    {/* Add this header section */}
    <div className="header-section">
      <h1>Dog Health Predictor</h1>
      <p className="header-description">
        Select the symptoms your dog is experiencing from the list below. 
        Our system will analyze these symptoms and predict possible diseases 
        including: Tick fever, Distemper, Parvovirus, Hepatitis, Tetanus, 
        Chronic kidney Disease, Diabetes, Gastrointestinal Disease, Allergies, 
        Gingitivis, Cancers, and Skin Rashes.
      </p>
    </div>
    </div>
      <div className="box">
        
        <div className="box-title">Select Your Symptoms</div>
        
        <div className="search-container">
          <input
            type="text"
            id="symptom-search"
            placeholder="Search symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="symptoms-container">
          {filteredSymptoms.length > 0 ? (
            filteredSymptoms.map(symptom => (
              <div
                key={symptom.id}
                className={`symptom ${selectedSymptoms.includes(symptom.id) ? 'selected' : ''}`}
                onClick={() => toggleSymptom(symptom.id)}
              >
                {symptom.name}
              </div>
            ))
          ) : (
            <div className="no-results">No symptoms found matching your search</div>
          )}
        </div>
        
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={selectedSymptoms.length === 0 || isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit Symptoms'}
        </button>
      </div>

      {/* API Response Display */}
      {apiResponse && (
        <div className="box response-box">
          <div className="box-title">Diagnosis Results</div>
          <div className="response-content">
            {apiResponse.predictions && apiResponse.predictions.length > 0 ? (
              <div className="predictions-container">
                {apiResponse.predictions.map((prediction, index) => (
                  <div key={index} className="prediction-item">
                    <div className="disease-name">{prediction.disease || 'Unknown Disease'}</div>
                    <div className="probability-bar">
                      <div 
                        className="probability-fill"
                        style={{ width: `${(prediction.probability || 0) * 100}%` }}
                      ></div>
                      <span className="probability-text">
                        {Math.round((prediction.probability || 0) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-predictions">No predictions available</div>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="box error-box">
          <div className="box-title error-title">Error</div>
          <div className="error-message">{error}</div>
        </div>
      )}
    </div>
  );
};

export default SymptomSelector;