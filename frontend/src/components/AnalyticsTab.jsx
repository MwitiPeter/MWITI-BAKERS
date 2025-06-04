import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, ShoppingCart, Coins } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/analytics");
        setAnalyticsData(response.data.analyticsData);
        setDailySalesData(response.data.dailySalesData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.users.toLocaleString()}
          icon={Users}
          color="from-[#DAAFFC] to-[#E7C9FD]"
        />
        <AnalyticsCard
          title="Total Products"
          value={analyticsData.products.toLocaleString()}
          icon={Package}
          color="from-[#E0B8FD] to-[#DDB6FB]"
        />
        <AnalyticsCard
          title="Total Sales"
          value={`Ksh ${analyticsData.totalSales.toLocaleString()}`}
          icon={ShoppingCart}
          color="from-[#F5E9FD] to-[#E7C9FD]"
        />
        <AnalyticsCard
          title="Total Revenue"
          value={new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KES",
          }).format(analyticsData.totalRevenue)}
          icon={Coins}
          color="from-[#DDB6FB] to-[#DAAFFC]"
        />
      </div>

      <motion.div
        className="bg-[#F5E9FD] rounded-lg p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#DDB6FB" />
            <XAxis dataKey="name" stroke="#A758D9" />
            <YAxis yAxisId="left" stroke="#A758D9" />
            <YAxis yAxisId="right" orientation="right" stroke="#A758D9" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#DAAFFC"
              activeDot={{ r: 8 }}
              name="Sales"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#A758D9"
              activeDot={{ r: 8 }}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    className={`rounded-lg p-6 shadow-lg overflow-hidden relative bg-gradient-to-br ${color}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-between items-center">
      <div className="z-10">
        <p className="text-[#A758D9] text-sm mb-1 font-semibold">{title}</p>
        <h3 className="text-[#6D3EA5] text-3xl font-bold">{value}</h3>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-20" />
    <div className="absolute -bottom-4 -right-4 text-[#DDB6FB] opacity-30">
      <Icon className="h-32 w-32" />
    </div>
  </motion.div>
);
