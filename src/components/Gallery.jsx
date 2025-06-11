import { useState, useEffect, useRef } from "react";
import field1 from "../assests/FieldWork/FIELD1.jpg";
import field2 from "../assests/FieldWork/FIELD2.jpg"; 
import field3 from "../assests/FieldWork/FIELD3.jpg";
import field4 from "../assests/FieldWork/FIELD4.jpg";
import field5 from "../assests/FieldWork/FILED5.jpg";
import field6 from "../assests/FieldWork/FILED6.jpg";
import field7 from "../assests/FieldWork/FILED7.jpg";

// Sample image data (replace with actual paths)
export const galleryImages = [
  { id: 1, src: field1 },
  { id: 2, src: field2 },
  { id: 3, src: field3 },
  { id: 4, src: field4 },
  { id: 5, src: field5 },
  { id: 6, src: field6 },
  { id: 7, src: field7 }
];



export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const sizedImages = galleryImages.map((img, i) => ({
    ...img,
    sizeType: i % 12 === 0 ? "large" : i % 5 === 0 ? "horizontal" : "small",
  }));

  const openLightbox = (img, index) => {
    setSelectedImg(img);
    setCurrentIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImg(null);
    document.body.style.overflow = "auto";
  };

  const goNext = () => {
    const nextIndex = (currentIndex + 1) % sizedImages.length;
    setSelectedImg(sizedImages[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const goPrev = () => {
    const prevIndex =
      (currentIndex - 1 + sizedImages.length) % sizedImages.length;
    setSelectedImg(sizedImages[prevIndex]);
    setCurrentIndex(prevIndex);
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImg) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImg, currentIndex]);

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-8">
      <h1 className="text-3xl font-bold text-center mb-10">Gallery</h1>
      <div className="flex justify-center px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl w-full auto-rows-[minmax(120px,auto)] grid-flow-dense">
          {sizedImages.map((img, index) => (
            <div
              key={img.id}
              className={`overflow-hidden rounded-lg shadow-lg cursor-pointer transition-all hover:shadow-xl ${
                img.sizeType === "large"
                  ? "md:col-span-2 md:row-span-2"
                  : img.sizeType === "horizontal"
                  ? "md:col-span-2"
                  : ""
              }`}
              onClick={() => openLightbox(img, index)}
            >
              <img
                src={img.src}
                alt={`Gallery Image ${img.id}`}
                className={`w-full h-full object-cover ${
                  img.sizeType === "horizontal"
                    ? "aspect-[16/9]"
                    : img.sizeType === "large"
                    ? "aspect-square"
                    : "aspect-[4/3]"
                }`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-5xl h-[75vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80"
            >
              ✕
            </button>

            <img
              src={selectedImg.src}
              alt="Selected"
              className="max-h-full max-w-full object-contain"
            />

            <div className="absolute bottom-4 flex items-center gap-6 bg-black bg-opacity-40 px-4 py-2 rounded-full">
              <button
                onClick={goPrev}
                className="text-white text-lg px-3 py-1 hover:bg-black hover:bg-opacity-40 rounded"
              >
                ⬅
              </button>
              <span className="text-white text-sm">
                {currentIndex + 1} / {sizedImages.length}
              </span>
              <button
                onClick={goNext}
                className="text-white text-lg px-3 py-1 hover:bg-black hover:bg-opacity-40 rounded"
              >
                ➡
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
