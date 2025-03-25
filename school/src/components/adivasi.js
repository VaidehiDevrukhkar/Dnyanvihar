import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adivasi.css'; 
import img1 from '../assets/images/adi1.jpeg';
import img2 from '../assets/images/adi2.jpeg';
import img3 from '../assets/images/adi3.jpeg';
import img4 from '../assets/images/adi4.jpeg';
import img5 from '../assets/images/adi5.jpeg';
import img6 from '../assets/images/adi6.jpeg';
import img7 from '../assets/images/adi7.jpeg';
import img8 from '../assets/images/adi8.jpeg';
import img9 from '../assets/images/adi9.jpeg';
import img10 from '../assets/images/adi10.jpeg';

function Adivasi() {
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
        <img src={img1} alt="Adivasi Event 1" onClick={() => handleImageClick(img1)} />
        <img src={img4} alt="Adivasi Event 2" onClick={() => handleImageClick(img4)} />
        <img src={img2} alt="Adivasi Event 3" onClick={() => handleImageClick(img2)} />
        <img src={img3} alt="Adivasi Event 4" onClick={() => handleImageClick(img3)} />
        <img src={img5} alt="Adivasi Event 5" onClick={() => handleImageClick(img5)} />
        <img src={img6} alt="Adivasi Event 6" onClick={() => handleImageClick(img6)} />
        <img src={img9} alt="Adivasi Event 7" onClick={() => handleImageClick(img9)} />
        <img src={img7} alt="Adivasi Event 8" onClick={() => handleImageClick(img7)} />
        <img src={img10} alt="Adivasi Event 9" onClick={() => handleImageClick(img10)} />
        <img src={img8} alt="Adivasi Event 10" onClick={() => handleImageClick(img8)} />
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

export default Adivasi;