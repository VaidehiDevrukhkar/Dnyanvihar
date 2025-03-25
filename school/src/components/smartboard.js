import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './smartboard.css'; 
import f1 from '../assets/images/f1.jpeg';
import f2 from '../assets/images/f2.jpeg';
import f3 from '../assets/images/f3.jpeg';
import f4 from '../assets/images/f4.jpeg';
import f5 from '../assets/images/f5.jpeg';
import f6 from '../assets/images/f6.jpeg';
import f7 from '../assets/images/f7.jpeg';
import f8 from '../assets/images/f8.jpeg';
import f9 from '../assets/images/f9.jpeg';
import f10 from '../assets/images/f10.jpeg';

const Smartboard = () => {
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
        <img src={f1} alt="f1" onClick={() => handleImageClick(f1)} />
        <img src={f2} alt="f2" onClick={() => handleImageClick(f2)} />
        <img src={f3} alt="f3" onClick={() => handleImageClick(f3)} />
        <img src={f4} alt="f4" onClick={() => handleImageClick(f4)} />
        <img src={f5} alt="f5" onClick={() => handleImageClick(f5)} />
        <img src={f6} alt="f6" onClick={() => handleImageClick(f6)} />
        <img src={f7} alt="f7" onClick={() => handleImageClick(f7)} />
        <img src={f8} alt="f8" onClick={() => handleImageClick(f8)} />
        <img src={f9} alt="f9" onClick={() => handleImageClick(f9)} />
        <img src={f10} alt="f10" onClick={() => handleImageClick(f10)} />
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

export default Smartboard;
