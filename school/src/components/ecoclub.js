import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ecoclub.css'; 
import img1 from '../assets/images/eco1.jpeg';
import img2 from '../assets/images/eco2.jpeg';
import img3 from '../assets/images/eco3.jpeg';
import img4 from '../assets/images/eco4.jpeg';
import img5 from '../assets/images/eco5.jpeg';
import img6 from '../assets/images/eco6.jpeg';
import img7 from '../assets/images/eco7.jpeg';
import img8 from '../assets/images/eco8.jpeg';
import img9 from '../assets/images/eco9.jpeg';
import img10 from '../assets/images/eco10.jpeg';

function Ecoclub() {
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
        <img src={img1} alt="Eco Club 1" onClick={() => handleImageClick(img1)} />
        <img src={img2} alt="Eco Club 2" onClick={() => handleImageClick(img2)} />
        <img src={img3} alt="Eco Club 3" onClick={() => handleImageClick(img3)} />
        <img src={img8} alt="Eco Club 8" onClick={() => handleImageClick(img8)} />
        <img src={img5} alt="Eco Club 5" onClick={() => handleImageClick(img5)} />
        <img src={img6} alt="Eco Club 6" onClick={() => handleImageClick(img6)} />
        <img src={img7} alt="Eco Club 7" onClick={() => handleImageClick(img7)} />
        <img src={img9} alt="Eco Club 9" onClick={() => handleImageClick(img9)} />
        <img src={img10} alt="Eco Club 10" onClick={() => handleImageClick(img10)} />
        <img src={img4} alt="Eco Club 4" onClick={() => handleImageClick(img4)} />
        
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

export default Ecoclub;