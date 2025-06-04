import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <div className="relative overflow-hidden h-96 w-full rounded-lg group shadow-sm border border-mauve-300 bg-mauve-800">
      <Link to={`/category${category.href}`}>
        <div className="w-full h-full cursor-pointer relative">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#A758D9] opacity-50 z-10" />

          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            loading="lazy"
          />

          {/* If you want to display price with Ksh prefix, for example */}
          {category.price && (
            <div className="absolute top-4 left-4 bg-[#A758D9] text-white px-3 py-1 rounded-md text-sm font-semibold z-20 select-none">
              Ksh {category.price}
            </div>
          )}

          {/* Enhanced text styling with better readability */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-[#1A1A1A] to-transparent">
            <h3 className="text-3xl font-semibold text-gray-300 mb-2 text-shadow-lg">
              {category.name}
            </h3>
            <p className="text-sm text-gray-400">Explore {category.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
