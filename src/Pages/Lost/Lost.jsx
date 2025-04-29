import React, { useState } from "react";
import "./Lost.css";
import { IoMdPhotos } from "react-icons/io";

const Lost = () => {
  const [images, setImages] = useState([]);
  const [dragging, setDragging] = useState(false);

  const handleImageUpload = (event) => {
    event.preventDefault();
    const files = event.target.files || event.dataTransfer.files;
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages([...images, ...newImages]);
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

  return (
    <div className="p-25">
      <div className="lost">
        <h6>Your pet lost!</h6>
        <h1>Lost & Found</h1>
        <p className="text-gray-500">
          Our mission is simple — help reunite lost animals with their families
          through quick <br />
          actdivion, community support, and dedicated care.
        </p>
      </div>
      <div className="upload-section">
        <h3>Drag latest pet images</h3>
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
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
            {/* <IoMdPhotos className="text-neutral-400 text-4xl" /> */}
            <p className="text-blue-500">
              Click to upload{" "}
              <span className="text-neutral-600">or drag and drop</span>
            </p>
            <p className="text-gray-400">JPG, JPEG, PNG (less than 1MB)</p>
          </label>
        </div>
        <div className="image-preview">
          {images.map((img, index) => (
            <img key={index} src={img} alt="Uploaded" className="preview-img" />
          ))}
          <div className="add-image">+</div>
        </div>
        <button className="search-btn">Search</button>
      </div>
    </div>
  );
};

export default Lost;
