import React from "react";
import { ChevronRight } from "lucide-react";

interface Order {
  orderId: string;
  status: "IN PROGRESS" | "COMPLETED" | "CANCELLED";
  date: string;
  total: string;
}

const RecentOrders: React.FC = () => {
  const orders: Order[] = [
    {
      orderId: "ORD5079D",
      status: "IN PROGRESS",
      date: "Dec 30, 2019 09:10",
      total: "$1,500 (5 Products)",
    },
   
    {
      orderId: "#85214268",
      status: "COMPLETED",
      date: "Feb 2, 2019 19:28",
      total: "$200 (2 Products)",
    },
    {
      orderId: "#85174568",
      status: "CANCELLED",
      date: "Dec 30, 2019 07:52",
      total: "$70 (1 Product)",
    },

  ];

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "IN PROGRESS":
        return "text-yellow-400";
      case "COMPLETED":
        return "text-green-400";
      case "CANCELLED":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="w-full">
      <h2 className="font-avant text-2xl text-white font-semibold mb-6">
        Recent Orders
      </h2>

      <div className="shadow border-black rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full font-avant">
            <thead>
              <tr className="border-b border-cyan-400/20 bg-black/40">
                <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm">
                  ORDER ID
                </th>
                <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm">
                  STATUS
                </th>
                <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm">
                  DATE
                </th>
                <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm">
                  TOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b border-cyan-400/10 hover:bg-black/20 transition-colors"
                >
                  <td className="px-6 py-4 text-white text-sm">
                    {order.orderId}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm font-semibold ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 text-white text-sm">
                    {order.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
