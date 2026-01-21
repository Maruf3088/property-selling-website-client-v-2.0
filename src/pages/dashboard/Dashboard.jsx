import React, { useEffect, useContext, useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  FaHome,
  FaHeart,
  FaCalendarAlt,
  FaBuilding,
  FaUsers,
  FaMoneyBillWave,
  FaArrowUp,
  FaArrowDown,
  FaSpinner,
} from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import useFavourites from "../../hooks/useFavourites";
import useAllProperties from "../../hooks/useAllProperties";
import useAllUser from "../../hooks/useAllUser";
import { usePropertyByEmail } from "../../hooks/usePropertyByEmail";
import useAppointmentsByBuyerEmail from "../../hooks/useAppointmentsByBuyerEmail";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const role = localStorage.getItem("role");
  const { user } = useContext(AuthContext);

  // Fetch data based on role
  const { data: favourites = [] } = useFavourites(user?.email);
  const { data: allProperties = [] } = useAllProperties();
  const { data: allUsers = [] } = useAllUser();
  const { data: userProperties = [] } = usePropertyByEmail(user?.email);
  const { data: buyerAppointments = [] } = useAppointmentsByBuyerEmail(user?.email);
  const { data: isAdmin } = useAdmin(user?.email);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Generate chart data from real appointments/activity
  const chartData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return months.map((month, idx) => ({
      month,
      value: Math.floor(Math.random() * 100) + 30, // Mock data - replace with real data
    }));
  }, []);

  // Calculate stats based on role
  const stats = useMemo(() => {
    if (role === "buyer") {
      return [
        {
          title: "Saved Properties",
          value: favourites?.length || 0,
          icon: <FaHeart />,
          trend: `+${Math.max(0, (favourites?.length || 0) - 10)}`,
        },
        {
          title: "Appointments",
          value: buyerAppointments?.length || 0,
          icon: <FaCalendarAlt />,
          trend: `+${Math.max(0, (buyerAppointments?.length || 0) - 3)}`,
        },
        {
          title: "Purchased",
          value: buyerAppointments?.filter(a => a.status === "completed")?.length || 0,
          icon: <FaHome />,
          trend: "0",
        },
      ];
    } else if (role === "seller") {
      return [
        {
          title: "Total Properties",
          value: userProperties?.length || 0,
          icon: <FaBuilding />,
          trend: `+${Math.max(0, (userProperties?.length || 0) - 15)}`,
        },
        {
          title: "Active Listings",
          value: userProperties?.filter(p => p.status === "approved")?.length || 0,
          icon: <FaCalendarAlt />,
          trend: `+${Math.max(0, (userProperties?.filter(p => p.status === "approved")?.length || 0) - 5)}`,
        },
        {
          title: "Sold",
          value: userProperties?.filter(p => p.status === "sold")?.length || 0,
          icon: <FaMoneyBillWave />,
          trend: "+1",
        },
      ];
    } else {
      // Admin stats
      return [
        {
          title: "Total Users",
          value: allUsers?.length || 0,
          icon: <FaUsers />,
          trend: `+${Math.max(0, (allUsers?.length || 0) - 500)}`,
        },
        {
          title: "Total Properties",
          value: allProperties?.length || 0,
          icon: <FaBuilding />,
          trend: `+${Math.max(0, (allProperties?.length || 0) - 300)}`,
        },
        {
          title: "Active Agencies",
          value: Array.from(new Set(allProperties?.map(p => p.agencyId)))?.length || 0,
          icon: <FaMoneyBillWave />,
          trend: `+${Math.max(0, Array.from(new Set(allProperties?.map(p => p.agencyId)))?.length - 50)}`,
        },
      ];
    }
  }, [
    role,
    favourites,
    buyerAppointments,
    userProperties,
    allUsers,
    allProperties,
  ]);

  // Get recent items to display in table
  const tableData = useMemo(() => {
    if (role === "buyer") {
      return favourites?.slice(0, 4)?.map((fav, idx) => ({
        id: idx + 1,
        name: fav.title || "Property",
        status: "Saved",
        price: `$${fav.price?.toLocaleString() || "0"}`,
      })) || [];
    } else if (role === "seller") {
      return userProperties?.slice(0, 4)?.map((prop, idx) => ({
        id: idx + 1,
        name: prop.title || "Property",
        status: prop.status || "Pending",
        price: `$${prop.price?.toLocaleString() || "0"}`,
      })) || [];
    } else {
      return allProperties?.slice(0, 4)?.map((prop, idx) => ({
        id: idx + 1,
        name: prop.title || "Property",
        status: prop.status || "Approved",
        price: `$${prop.price?.toLocaleString() || "0"}`,
      })) || [];
    }
  }, [role, favourites, userProperties, allProperties]);

  /* ================== UI Components ================== */
  const Card = ({ children, className = "" }) => (
    <div
      className={`bg-[#0f0f0f]/60 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 shadow-xl ${className}`}
    >
      {children}
    </div>
  );

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-96">
      <FaSpinner className="text-4xl text-orange-500 animate-spin" />
    </div>
  );

  return (
    <div className="space-y-8 p-4 sm:p-8 min-h-screen text-gray-200 overflow-x-hidden">
      {/* Title Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {role === "admin"
              ? "Admin Overview"
              : role === "seller"
                ? "Seller Dashboard"
                : "My Dashboard"}
          </h1>
          <p className="text-gray-500 mt-2 font-medium text-sm sm:text-base">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">
            {user?.displayName || "User"}
          </p>
          <p className="text-orange-500 font-bold capitalize">
            {role || "User"} Member
          </p>
        </div>
      </div>

      {/* ================= Stats Cards ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {stats?.map((item, idx) => (
          <Card
            key={idx}
            className="relative overflow-hidden group hover:border-orange-500/30 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="text-6xl text-white">{item.icon}</span>
            </div>
            <div className="flex flex-col justify-between h-full relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/5 rounded-2xl text-orange-400 text-xl border border-white/5 shadow-inner">
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-lg flex items-center gap-1">
                  <FaArrowUp size={10} /> {item.trend}
                </span>
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1">
                  {item.value}
                </h2>
                <p className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide">
                  {item.title}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* ================= Charts ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Line Chart */}
        <Card>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="font-bold text-lg text-white">Property Growth</h3>
            <button className="text-xs text-orange-400 border border-orange-500/20 px-3 py-1 rounded-full hover:bg-orange-500/10 transition">
              View Report
            </button>
          </div>
          <div className="h-[300px] w-full overflow-x-auto">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#333"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#fff" }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#f97316"
                  strokeWidth={4}
                  dot={{
                    r: 4,
                    fill: "#1a1a1a",
                    stroke: "#f97316",
                    strokeWidth: 2,
                  }}
                  activeDot={{ r: 6, fill: "#f97316" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Bar Chart */}
        <Card>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="font-bold text-lg text-white">Monthly Activity</h3>
            <select className="bg-white/5 border border-white/10 text-xs text-gray-400 rounded-lg px-2 py-1 outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full overflow-x-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#333"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#fb923c"
                  radius={[6, 6, 6, 6]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* ================= Table ================= */}
      <Card>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            <FaBuilding className="text-orange-500" />
            {role === "buyer"
              ? "Saved Properties"
              : role === "seller"
                ? "My Properties"
                : "Recent Properties"}
          </h3>
          <button className="text-sm text-gray-400 hover:text-white transition">
            See All
          </button>
        </div>

        {tableData?.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-400 text-sm">
              {role === "buyer"
                ? "No saved properties yet"
                : role === "seller"
                  ? "No properties listed yet"
                  : "No properties in database"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-white/5">
                  <th className="pb-4 pl-2 font-medium">#ID</th>
                  <th className="pb-4 font-medium">Property Name</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium">Price</th>
                  <th className="pb-4 font-medium text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {tableData?.map((item) => (
                  <tr
                    key={item.id}
                    className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                  >
                    <td className="py-4 pl-2 text-gray-500">#{item.id}</td>
                    <td className="py-4 text-white font-medium text-xs sm:text-sm">
                      {item.name}
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          item.status === "sold"
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : item.status === "Saved" || item.status === "pending"
                              ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                              : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-300 font-mono text-xs sm:text-sm">
                      {item.price}
                    </td>
                    <td className="py-4 text-right pr-2">
                      <button className="text-gray-500 hover:text-orange-400 transition text-xs sm:text-sm">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
