import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  const handleImageError = (e) => {
    e.target.src = "/images/placeholder.svg";
  };

  return (
    <div className="relative overflow-hidden rounded-xl group shadow-lg border border-white/10 bg-[var(--navy-800)] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1" style={{ aspectRatio: "3/4" }}>
      <Link to={`/category${category.href}`}>
        <div className="w-full h-full cursor-pointer relative">
          {/* Background container for image */}
          <div className="absolute inset-0 bg-white/5 flex items-center justify-center p-3">
            <img
              src={category.imageUrl}
              alt={category.name}
              className="max-w-full max-h-full object-contain rounded-lg transition-opacity duration-300 group-hover:opacity-90"
              loading="lazy"
              decoding="async"
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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--navy-900)] opacity-60 z-10 transition-opacity duration-300 group-hover:opacity-70" />

          {/* If you want to display price with Ksh prefix, for example */}
          {category.price && (
            <div className="absolute top-4 left-4 bg-[var(--accent-gold)] text-[var(--navy-900)] px-3 py-1 rounded-md text-sm font-semibold z-20 select-none shadow">
              Ksh {category.price}
            </div>
          )}

          {/* Enhanced text styling with better readability */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-[var(--navy-900)] to-transparent">
            <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2 line-clamp-1 transition-all duration-300">
              {category.name}
            </h3>
            <p className="text-sm text-white/80 transition-all duration-300">Explore {category.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
