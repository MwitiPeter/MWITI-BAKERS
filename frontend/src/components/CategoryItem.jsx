import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  const handleImageError = (e) => {
    e.target.src = "/images/placeholder.svg";
  };

  return (
    <div className="relative overflow-hidden rounded-lg group shadow-sm border border-mauve-300 bg-mauve-800 transition-all duration-300 hover:shadow-lg hover:scale-105" style={{ aspectRatio: "3/4" }}>
      <Link to={`/category${category.href}`}>
        <div className="w-full h-full cursor-pointer relative">
          {/* Background container for image */}
          <div className="absolute inset-0 bg-gray-50 flex items-center justify-center p-2">
            <img
              src={category.imageUrl}
              alt={category.name}
              className="max-w-full max-h-full object-contain rounded-lg transition-opacity duration-300 group-hover:opacity-90"
              loading="lazy"
              onError={handleImageError}
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%',
                width: 'auto',
                height: 'auto'
              }}
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#A758D9] opacity-50 z-10 transition-opacity duration-300 group-hover:opacity-60" />

          {/* If you want to display price with Ksh prefix, for example */}
          {category.price && (
            <div className="absolute top-4 left-4 bg-[#A758D9] text-white px-3 py-1 rounded-md text-sm font-semibold z-20 select-none">
              Ksh {category.price}
            </div>
          )}

          {/* Enhanced text styling with better readability */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-[#1A1A1A] to-transparent">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-300 mb-2 text-shadow-lg line-clamp-1 transition-all duration-300 group-hover:text-white">
              {category.name}
            </h3>
            <p className="text-sm text-gray-400 transition-all duration-300 group-hover:text-gray-200">Explore {category.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
