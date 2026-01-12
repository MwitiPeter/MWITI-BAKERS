import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageCarousel = ({ images = [], aspectRatio = "3/4" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // If no images, return null or a placeholder
  if (!images || images.length === 0) {
    return (
      <div 
        className="w-full bg-white/5 rounded-lg flex items-center justify-center"
        style={{ aspectRatio }}
      >
        <div className="text-center p-4">
          <div className="w-16 h-16 mx-auto mb-2 text-white/60">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </div>
          <span className="text-sm text-white/60">No image available</span>
        </div>
      </div>
    );
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setImageError(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  return (
    <div 
      className="relative w-full overflow-hidden rounded-lg bg-white/5"
      style={{ aspectRatio }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="w-full h-full flex items-center justify-center p-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-white/5 rounded-lg">
              <div className="text-center p-4">
                <div className="w-12 h-12 mx-auto mb-2 text-white/60">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                </div>
                <span className="text-sm text-white/60">Image not available</span>
              </div>
            </div>
          ) : (
            <img
              src={images[currentIndex]}
              alt={`Product image ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg transition-opacity duration-300"
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading={currentIndex === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchpriority={currentIndex === 0 ? "high" : "auto"}
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%',
                width: 'auto',
                height: 'auto'
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-[var(--navy-900)] p-2 rounded-full transition-all duration-200 shadow-md z-10 hover:shadow-lg"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-[var(--navy-900)] p-2 rounded-full transition-all duration-200 shadow-md z-10 hover:shadow-lg"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setImageError(false);
                }}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? "bg-white shadow-md scale-110" 
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
