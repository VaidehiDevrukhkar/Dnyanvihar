import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './lib.css'; 
import img1 from '../assets/images/lib1.jpeg';
import img2 from '../assets/images/lib2.jpeg';
import img3 from '../assets/images/lib3.jpeg';

function Lib() {
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
        <button className="back-button" onClick={goBack}>Back to Facilities</button>
      </div>

      {/* Photo gallery */}
      <div className="photo-gallery">
        <img src={img1} alt="Independence 1" onClick={() => handleImageClick(img1)} />
        <img src={img2} alt="Independence 3" onClick={() => handleImageClick(img2)} />
        <img src={img3} alt="Independence 4" onClick={() => handleImageClick(img3)} />
        
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

export default Lib;