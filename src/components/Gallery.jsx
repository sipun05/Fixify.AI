import { useState, useEffect, useRef } from "react";
import field1 from "../assests/FieldWork/FIELD1.jpg";
import field2 from "../assests/FieldWork/FIELD2.jpg";
import field3 from "../assests/FieldWork/FIELD3.jpg";
import field4 from "../assests/FieldWork/FIELD4.jpg";
import field5 from "../assests/FieldWork/FILED5.jpg";
import field6 from "../assests/FieldWork/FILED6.jpg";
import field7 from "../assests/FieldWork/FILED7.jpg";
import Building2 from "../assests/FieldWork/Building_Image2.jpg"; 
// Device images
import device1 from "../assests/FieldWork/Device1.jpg";
import device2 from "../assests/FieldWork/Device2.jpg";
import device3 from "../assests/FieldWork/Device3.jpg";

export const galleryImages = [
  { id: 1, src: field1, alt: "Field Work 1" },
  { id: 2, src: field2, alt: "Field Work 2" },
  { id: 3, src: field3, alt: "Field Work 3" },
  { id: 4, src: field4, alt: "Field Work 4" },
  { id: 5, src: field5, alt: "Field Work 5" },
  { id: 6, src: field6, alt: "Field Work 6" },
  { id: 7, src: field7, alt: "Field Work 7" },
];

export const deviceImages = [
  { id: 1, src: device1, alt: "Device 1" },
  { id: 2, src: device2, alt: "Device 2" },
  { id: 3, src: device3, alt: "Device 3" },
];

// Reusable Carousel Component
const ImageCarousel = ({ images, currentIndex, setCurrentIndex, title, openLightbox }) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-xl w-11/12 max-w-4xl mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
        {title}
      </h2>
      <div className="relative w-full overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <div
              key={img.id}
              className="w-full flex-shrink-0 cursor-pointer"
              onClick={() => openLightbox(img, index, images)} 
            >
              <img
                src={img.src}
                alt={img.alt || `Slide ${index + 1}`}
                className="w-full h-96 object-cover"
              />
            </div>
          ))}
        </div>

        {/* Carousel Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-3 w-3 rounded-full ${
                currentIndex === idx ? "bg-white" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Gallery() {
  // State for the auto-sliding carousels
  const [fieldSlideIndex, setFieldSlideIndex] = useState(0);
  const [deviceSlideIndex, setDeviceSlideIndex] = useState(0);
  const fieldSlideIntervalRef = useRef(null);
  const deviceSlideIntervalRef = useRef(null);

  // Lightbox-related states
  const [selectedImg, setSelectedImg] = useState(null);
  const [lightboxCurrentIndex, setLightboxCurrentIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState([]);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // --- Lightbox Functions ---
  const openLightbox = (img, index, imagesArray) => {
    setSelectedImg(img);
    setLightboxCurrentIndex(index);
    setLightboxImages(imagesArray);
    document.body.style.overflow = "hidden";
    clearInterval(fieldSlideIntervalRef.current);
    clearInterval(deviceSlideIntervalRef.current);
  };

  const closeLightbox = () => {
    setSelectedImg(null);
    setLightboxImages([]);
    document.body.style.overflow = "auto";
    startFieldAutoSlide();
    startDeviceAutoSlide();
  };

  const goNext = () => {
    if (!lightboxImages.length) return;
    const nextIndex = (lightboxCurrentIndex + 1) % lightboxImages.length;
    setSelectedImg(lightboxImages[nextIndex]);
    setLightboxCurrentIndex(nextIndex);
  };

  const goPrev = () => {
    if (!lightboxImages.length) return;
    const prevIndex =
      (lightboxCurrentIndex - 1 + lightboxImages.length) % lightboxImages.length;
    setSelectedImg(lightboxImages[prevIndex]);
    setLightboxCurrentIndex(prevIndex);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diffX = touchStartX.current - touchEndX.current;
    if (diffX > 50) goNext();
    else if (diffX < -50) goPrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // --- Auto-Slider Functions for Field Images ---
  const goToNextFieldSlide = () => {
    setFieldSlideIndex((prevIndex) =>
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const startFieldAutoSlide = () => {
    clearInterval(fieldSlideIntervalRef.current);
    fieldSlideIntervalRef.current = setInterval(goToNextFieldSlide, 3000);
  };

  // --- Auto-Slider Functions for Device Images ---
  const goToNextDeviceSlide = () => {
    setDeviceSlideIndex((prevIndex) =>
      prevIndex === deviceImages.length - 1 ? 0 : prevIndex + 1
    );
  };
   
  const startDeviceAutoSlide = () => {
    clearInterval(deviceSlideIntervalRef.current);
    deviceSlideIntervalRef.current = setInterval(goToNextDeviceSlide, 3000);
  };

  // --- Effects ---
  useEffect(() => {
    startFieldAutoSlide();
    startDeviceAutoSlide();
    return () => {
      clearInterval(fieldSlideIntervalRef.current);
      clearInterval(deviceSlideIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImg) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImg, lightboxCurrentIndex, lightboxImages]);

  return (
    // Outer container with the Building2 background image
    <div
      className="min-h-screen pt-24 pb-8 flex flex-col items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${Building2})` }}
    >
      {/* Container for the main title card */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-2xl w-11/12 text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Gallery
        </h1>
      </div>

      {/* Field Work Slider Section */}
      <ImageCarousel
        images={galleryImages}
        currentIndex={fieldSlideIndex}
        setCurrentIndex={setFieldSlideIndex}
        title="On-Field Work"
        openLightbox={openLightbox}
      />

      {/* Laboratory Devices Slider Section */}
      <ImageCarousel
        images={deviceImages}
        currentIndex={deviceSlideIndex}
        setCurrentIndex={setDeviceSlideIndex}
        title="In Laboratory"
        openLightbox={openLightbox}
      />

      {/* Lightbox Component (Conditional Rendering) */}
      {selectedImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-6xl h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 bg-black bg-opacity-70 text-white p-2 rounded-full text-xl hover:bg-opacity-90 transition-opacity"
            >
              ✕
            </button>

            <img
              src={selectedImg.src}
              alt="Selected"
              className="max-h-full max-w-full object-contain"
            />

            {/* Navigation and Counter */}
            <div className="absolute bottom-4 flex items-center gap-6 bg-black bg-opacity-50 px-6 py-3 rounded-full">
              <button
                onClick={goPrev}
                className="text-white text-3xl px-3 py-1 hover:bg-black hover:bg-opacity-60 rounded-full transition-colors"
              >
                &larr;
              </button>
              <span className="text-white text-lg font-semibold">
                {lightboxCurrentIndex + 1} / {lightboxImages.length}
              </span>
              <button
                onClick={goNext}
                className="text-white text-3xl px-3 py-1 hover:bg-black hover:bg-opacity-60 rounded-full transition-colors"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}