import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const PeopleAlsoBought = ({ categories, excludedProductIds }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const params = new URLSearchParams();
        if (categories && categories.length > 0) {
          categories.forEach((cat) => params.append("categories", cat));
        }
        if (excludedProductIds && excludedProductIds.length > 0) {
          excludedProductIds.forEach((id) => params.append("excludedIds", id));
        }

        const url = `/products/recommendations?${params.toString()}`;
        const res = await axios.get(url);
        setRecommendations(res.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "An error occurred while fetching recommendations"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [categories, excludedProductIds]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="mt-12 px-6">
      <h3 className="text-3xl font-bold text-[#F1F5F9] mb-4">
        People also bought
      </h3>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {recommendations.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PeopleAlsoBought;
