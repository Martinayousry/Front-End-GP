import React, { useState } from "react";
import axios from "axios";
import "./DiseasePhoto.css";

const SkinDiseasePrediction = () => {
  const [image, setImage] = useState(null); // Changed to single image state
  const [dragging, setDragging] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = (event) => {
    event.preventDefault();
    const files = event.target.files || event.dataTransfer.files;
    if (files.length > 0) {
      // Only take the first file and create URL
      setImage(URL.createObjectURL(files[0]));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    handleImageUpload(event);
  };

  const predictDisease = async () => {
    if (!image) {
      setError("Please upload an image first");
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      // Convert the image to base64
      const response = await fetch(image);
      const blob = await response.blob();
      const reader = new FileReader();
      
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = reader.result.split(',')[1];
        
        try {
          const apiResponse = await axios({
            method: "POST",
            url: "https://serverless.roboflow.com/dog-skin-disease-dataset/3",
            params: {
              api_key: "Mu2gT32FBzYEGW4VhaS5"
            },
            data: base64data,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          });
          
          setPrediction(apiResponse.data);
        } catch (apiError) {
          setError("Failed to get prediction: " + apiError.message);
        } finally {
          setLoading(false);
        }
      };
    } catch (error) {
      setError("Failed to process image: " + error.message);
      setLoading(false);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPrediction(null);
  };

  return (
    <div className="p-25">
      <div className="skin-disease">
        <h6>Skin Disease Detection</h6>
        <h1>Dog's Skin Condition Analysis</h1>
        <p className="text-gray-500">
          Upload a clear photo of your dog's skin condition to get a prediction
          of potential diseases including bacterial, fungal, or hypersensitivity issues.
        </p>
      </div>
      <div className="upload-section">
        <h3>Upload skin condition image</h3>
        {!image ? (
          <div
            className={`upload-box ${dragging ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label className="upload-label">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <p className="text-blue-500">
                Click to upload{" "}
                <span className="text-neutral-600">or drag and drop</span>
              </p>
              <p className="text-gray-400">JPG, JPEG, PNG (less than 1MB)</p>
            </label>
          </div>
        ) : (
          <div className="single-image-preview">
            <img src={image} alt="Uploaded skin condition" className="preview-img" />
            <button className="remove-image-btn" onClick={removeImage}>
              ×
            </button>
          </div>
        )}
        
        {loading && <div className="loading">Analyzing image...</div>}
        {error && <div className="error">{error}</div>}
        
        {prediction && (
          <div className="prediction-result">
            {/* <h4>Prediction Results:</h4>
            <p><strong>Condition:</strong> {prediction.top_prediction}</p>
            <p><strong>Confidence:</strong> {(prediction.confidence * 100).toFixed(2)}%</p> */}
            <div className="all-predictions">
              <h5>All Possible Conditions:</h5>
              <ul>
                {prediction.predictions && prediction.predictions.map((item, index) => (
                  <li key={index}>
                    {item.class}: {(item.confidence * 100).toFixed(2)}%
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {image && (
          <button 
            className="predict-btn" 
            onClick={predictDisease}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Image"}
          </button>
        )}
      </div>
    </div>
  );
};

export default SkinDiseasePrediction;