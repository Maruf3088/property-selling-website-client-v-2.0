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
} from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import useFavourites from "../../hooks/useFavourites";
import useAllProperties from "../../hooks/useAllProperties";
import useAllUser from "../../hooks/useAllUser";
import { usePropertyByEmail } from "../../hooks/usePropertyByEmail";
import useAppointmentsByBuyerEmail from "../../hooks/useAppointmentsByBuyerEmail";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  // prevent rerenders from localStorage
  const role = useMemo(() => localStorage.getItem("role"), []);

  // ================= DATA =================
  const { data: favourites = [] } = useFavourites(user?.email);
  const { data: allProperties = [] } = useAllProperties();
  const { data: allUsers = [] } = useAllUser();
  const { data: userProperties = [] } = usePropertyByEmail(user?.email);
  const { data: buyerAppointments = [] } =
    useAppointmentsByBuyerEmail(user?.email);
  const { data: isAdmin } = useAdmin(user?.email);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ================= STABLE CHART DATA =================
  const chartData = useMemo(
    () => [
      { month: "Jan", value: 40 },
      { month: "Feb", value: 55 },
      { month: "Mar", value: 65 },
      { month: "Apr", value: 72 },
      { month: "May", value: 85 },
      { month: "Jun", value: 95 },
    ],
    []
  );

  // ================= STATS =================
  const stats = useMemo(() => {
    if (role === "buyer") {
      return [
        {
          title: "Saved Properties",
          value: favourites.length,
          icon: <FaHeart />,
        },
        {
          title: "Appointments",
          value: buyerAppointments.length,
          icon: <FaCalendarAlt />,
        },
        {
          title: "Purchased",
          value: buyerAppointments.filter(
            (a) => a.status === "completed"
          ).length,
          icon: <FaHome />,
        },
      ];
    }

    if (role === "seller") {
      return [
        {
          title: "Total Properties",
          value: userProperties.length,
          icon: <FaBuilding />,
        },
        {
          title: "Active Listings",
          value: userProperties.filter(
            (p) => p.status === "approved"
          ).length,
          icon: <FaCalendarAlt />,
        },
        {
          title: "Sold",
          value: userProperties.filter((p) => p.status === "sold").length,
          icon: <FaMoneyBillWave />,
        },
      ];
    }

    return [
      {
        title: "Total Users",
        value: allUsers.length,
        icon: <FaUsers />,
      },
      {
        title: "Total Properties",
        value: allProperties.length,
        icon: <FaBuilding />,
      },
      {
        title: "Active Agencies",
        value: new Set(allProperties.map((p) => p.agencyId)).size,
        icon: <FaMoneyBillWave />,
      },
    ];
  }, [
    role,
    favourites,
    buyerAppointments,
    userProperties,
    allUsers,
    allProperties,
  ]);

  // ================= TABLE =================
  const tableData = useMemo(() => {
    if (role === "buyer") {
      return favourites.slice(0, 4).map((f, i) => ({
        id: i + 1,
        name: f.title,
        status: "Saved",
        price: `$${f.price?.toLocaleString()}`,
      }));
    }

    if (role === "seller") {
      return userProperties.slice(0, 4).map((p, i) => ({
        id: i + 1,
        name: p.title,
        status: p.status,
        price: `$${p.price?.toLocaleString()}`,
      }));
    }

    return allProperties.slice(0, 4).map((p, i) => ({
      id: i + 1,
      name: p.title,
      status: p.status,
      price: `$${p.price?.toLocaleString()}`,
    }));
  }, [role, favourites, userProperties, allProperties]);

  // ================= UI =================
  const Card = ({ children }) => (
    <div className="bg-[#0f0f0f]/60 border border-white/5 rounded-3xl p-6 shadow-xl">
      {children}
    </div>
  );

  // ================= RENDER =================
  return (
    <div className="space-y-8 p-6 min-h-screen text-gray-200">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          {role === "admin"
            ? "Admin Overview"
            : role === "seller"
            ? "Seller Dashboard"
            : "My Dashboard"}
        </h1>
        <p className="text-gray-500 mt-2">
          Welcome back, {user?.displayName || "User"}
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((item, i) => (
          <Card key={i}>
            <div className="flex justify-between items-center mb-4">
              <div className="text-orange-400 text-xl">{item.icon}</div>
              <span className="text-green-400 text-xs flex items-center gap-1">
                <FaArrowUp size={10} /> +
              </span>
            </div>
            <h2 className="text-4xl font-bold text-white">{item.value}</h2>
            <p className="text-gray-500 text-sm uppercase">{item.title}</p>
          </Card>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* LINE */}
        <Card>
          <h3 className="mb-4 font-bold text-lg">Property Growth</h3>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={chartData} key="line-chart">
                <CartesianGrid stroke="#333" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "#6b7280" }} />
                <YAxis tick={{ fill: "#6b7280" }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#f97316"
                  strokeWidth={3}
                  isAnimationActive
                  animationDuration={1200}
                  animationEasing="ease-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* BAR */}
        <Card>
          <h3 className="mb-4 font-bold text-lg">Monthly Activity</h3>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} key="bar-chart">
                <CartesianGrid stroke="#333" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "#6b7280" }} />
                <YAxis tick={{ fill: "#6b7280" }} />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#fb923c"
                  barSize={30}
                  radius={[6, 6, 6, 6]}
                  isAnimationActive
                  animationDuration={1200}
                  animationEasing="ease-out"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* TABLE */}
      <Card>
        <h3 className="mb-4 font-bold text-lg">Recent Properties</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-500 border-b border-white/10">
              <tr>
                <th className="py-3 text-left">#</th>
                <th className="py-3 text-left">Name</th>
                <th className="py-3 text-left">Status</th>
                <th className="py-3 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.id} className="border-b border-white/5">
                  <td className="py-3">#{item.id}</td>
                  <td className="py-3">{item.name}</td>
                  <td className="py-3">{item.status}</td>
                  <td className="py-3">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
