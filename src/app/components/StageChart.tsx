// "use client";

// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// const stageData = [
//   { stage: "Stage 1", count: 34 },
//   { stage: "Stage 2", count: 22 },
//   { stage: "Stage 3", count: 15 },
//   { stage: "Stage 4", count: 8 },
// ];

// const StageChart = () => {
//   return (
//     <div className="bg-white shadow-md rounded-xl p-6">
//       <h2 className="text-xl font-bold text-gray-800 mb-4">Cancer Stage Distribution</h2>

//       <div className="h-72">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={stageData}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//             <XAxis dataKey="stage" stroke="#6b7280" />
//             <YAxis stroke="#6b7280" />
//             <Tooltip />
//             <Bar dataKey="count" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default StageChart;

"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const stageData = [
  { stage: "I", count: 28 },
  { stage: "II", count: 18 },
  { stage: "III", count: 10 },
  { stage: "IV", count: 6 },
];

export default function StageChart() {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={stageData} margin={{ top: 4, right: 12, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="stage" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip />
          <Bar dataKey="count" fill="#7c3aed" radius={[6,6,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
