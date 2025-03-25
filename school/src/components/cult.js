import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cult.css'; 
import img1 from '../assets/images/cult1.jpeg';
import img2 from '../assets/images/cult2.jpeg';

function Cult() {
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
        <img src={img1} alt="Cultural 1" onClick={() => handleImageClick(img1)} />
        <img src={img2} alt="Cultural 2" onClick={() => handleImageClick(img2)} />
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

export default Cult;