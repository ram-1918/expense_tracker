import { useEffect, useState } from "react";

const API_URL = 'http://localhost:8000';


const ImageSlider = ({ slides, setNewProof }) => {
    const initialZoomSettings = {
        transform: 'scale(1)',
        transformOrigin: '0 0'
      };
  const [X, setX] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(initialZoomSettings);
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  useEffect(() => {
    try{
      if(slides.length){
        setNewProof({'id': slides[current].id, 'filename': slides[current].filename, 'image': slides[current].image})
      }
    }
    catch(error){
      console.log(error, "ERROR Caught IN SLIDER");
    }
  }, [slides, current])

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return <div>No image content yet</div>;
  }

  const handleMouseMovement = (e) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { width, height } = target.getBoundingClientRect();
    const xpos = (offsetX/width) *100;
    const ypos = (offsetY/height) *100;
    const zoom = `scale(1.6) translate(-${xpos}%, -${ypos}%)`;
    setZoomLevel({
        transform: zoom,
        transformOrigin: `-${xpos}% -${ypos}%`
    })
  }

  return (
  <section className='group/image relative w-full h-full flex flex-col justify-center items-center overflow-hidden'>
    {slides.map((slide, index) => (
      <div 
      onMouseEnter={() => setZoomLevel(initialZoomSettings)} 
      onMouseLeave={() => setZoomLevel(initialZoomSettings)} 

      className={`${index === current ? 'opacity-1' : 'opacity-0'} transition duration-300 ease-in-out w-full h-full flex-row-style justify-center`} 
      key={index}>
        {index === current && (
          <img src={`${API_URL}${slide.image}`} alt='expense proof' 
          onMouseMove={(e) => {handleMouseMovement(e)}} 
          
          style={{ ...zoomLevel, transition: 'transform 0.1s ease-out' }}
          className={`object-cover object-center w-full h-[28rem] flex-shrink:0 overflow-hidden`} />
        )}
      </div>
    ))}
    <button className='invisible group-hover/image:visible absolute top-[50%] left-[1%] text-lg font-bold bg-opacity-80 bg-gray-300 p-[5px]' onClick={prevSlide}>
      <i className="fa fa-angle-left"></i>
    </button>
    <button className='invisible group-hover/image:visible absolute top-[50%] right-[1%] text-lg font-bold bg-opacity-80 bg-gray-300 p-[5px]' onClick={nextSlide}>
      <i className="fa fa-angle-right"></i>
    </button>
  </section>
  );
};

export default ImageSlider;