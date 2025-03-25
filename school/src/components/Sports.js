import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sports.css'; 
import sport1 from '../assets/images/sport1.jpeg';
import sport2 from '../assets/images/sport2.jpeg';
import sport3 from '../assets/images/sport3.jpeg';

const Sports = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleImageClick = (imgSrc) => {
    setSelectedImage(imgSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div>
      {/* Separate row for the back button */}
      <div className="button-row">
        <button className="back-button" onClick={goBack}>Back to Activities</button>
      </div>

      {/* Photo gallery */}
      <div className="photo-gallery">
        <img src={sport1} alt="Sport 1" onClick={() => handleImageClick(sport1)} />
        <img src={sport2} alt="Sport 2" onClick={() => handleImageClick(sport2)} />
        <img src={sport3} alt="Sport 3" onClick={() => handleImageClick(sport3)} />
      </div>

      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <span className="close" onClick={closeModal}>&times;</span>
          <img className="modal-content" src={selectedImage} alt="Full Size" />
        </div>
      )}
    </div>
  );
}

export default Sports;
