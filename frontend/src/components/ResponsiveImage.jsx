import { useState } from "react";

const ResponsiveImage = ({
  src,
  alt,
  aspectRatio = "3/4",
  className = "",
  fallbackSrc = "/images/placeholder.svg",
  objectFit = "contain",
  loading = "lazy",
  onLoad,
  onError,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = (e) => {
    setImageError(true);
    setImageLoading(false);
    if (onError) onError(e);

    // Fallback to placeholder if not already using it
    if (e.target.src !== fallbackSrc) {
      e.target.src = fallbackSrc;
    }
  };

  const handleImageLoad = (e) => {
    setImageLoading(false);
    setImageError(false);
    if (onLoad) onLoad(e);
  };

  const containerClasses = `
    relative overflow-hidden bg-gray-50 rounded-lg flex items-center justify-center p-2
    ${imageLoading ? "animate-pulse" : ""}
    ${className}
  `.trim();

  const imageClasses = `
    max-w-full max-h-full transition-opacity duration-300 rounded-lg
    ${objectFit === "cover" ? "object-cover" : "object-contain"}
    ${imageLoading ? "opacity-0" : "opacity-100"}
  `.trim();

  return (
    <div className={containerClasses} style={{ aspectRatio }}>
      {imageError && imageLoading === false ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center p-4">
            <div className="w-12 h-12 mx-auto mb-2 text-gray-400">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            </div>
            <span className="text-sm text-gray-400">Image not available</span>
          </div>
        </div>
      ) : (
        <img
          src={src || fallbackSrc}
          alt={alt || "Product image"}
          className={imageClasses}
          loading={loading}
          decoding="async"
          onError={handleImageError}
          onLoad={handleImageLoad}
          style={{ 
            maxWidth: '100%', 
            maxHeight: '100%',
            width: 'auto',
            height: 'auto'
          }}
          {...props}
        />
      )}

      {imageLoading && !imageError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}
    </div>
  );
};

export default ResponsiveImage;
