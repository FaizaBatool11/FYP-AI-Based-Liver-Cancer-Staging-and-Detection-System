// "use client";

// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// const data = [
//   { month: "Jan", accuracy: 82 },
//   { month: "Feb", accuracy: 88 },
//   { month: "Mar", accuracy: 91 },
//   { month: "Apr", accuracy: 89 },
//   { month: "May", accuracy: 94 },
//   { month: "Jun", accuracy: 96 },
// ];

// const TrendChart = () => {
//   return (
//     <div className="bg-white shadow-md rounded-xl p-6">
//       <h2 className="text-xl font-bold text-gray-800 mb-4">AI Accuracy Trend</h2>

//       <div className="h-64 w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//             <XAxis dataKey="month" stroke="#6b7280" />
//             <YAxis stroke="#6b7280" />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="accuracy"
//               stroke="#3b82f6"
//               strokeWidth={3}
//               dot={{ stroke: "#1e40af", strokeWidth: 2, r: 5 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default TrendChart;

"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { date: "01-01", score: 0.78 },
  { date: "01-05", score: 0.82 },
  { date: "01-10", score: 0.79 },
  { date: "01-15", score: 0.86 },
  { date: "01-20", score: 0.88 },
  { date: "01-25", score: 0.91 },
];

export default function TrendChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, left: -12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eef2ff" />
          <XAxis dataKey="date" stroke="#6b7280" />
          <YAxis domain={[0, 1]} tickFormatter={(v) => `${Math.round(v * 100)}%`} stroke="#6b7280" />
          <Tooltip formatter={(v:number) => `${Math.round(v * 100)}%`} />
          <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
