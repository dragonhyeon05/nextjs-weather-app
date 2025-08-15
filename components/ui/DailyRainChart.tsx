// components/ui/DailyRainChart.tsx
'use client';

import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  CartesianGrid,
} from "recharts";
import { UltimateWeatherData } from "@/lib/types";
import { CloudRain } from "lucide-react";

interface ChartData {
  date: string;
  chanceOfRain: number;
}

const formatChartData = (dailyData: UltimateWeatherData['forecast']['daily']): ChartData[] => {
  if (!dailyData) return [];
  return dailyData.slice(0, 5).map((item) => ({
    // Mengubah tanggal menjadi nama hari (contoh: "Sen", "Sel")
    date: new Date(item.date).toLocaleDateString('id-ID', { weekday: 'short' }),
    chanceOfRain: item.chanceOfRain,
  }));
};

// Komponen Tooltip Kustom agar sesuai dengan tema
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-md shadow-lg">
        <p className="font-bold text-slate-100">{`${payload[0].value}%`}</p>
        <p className="text-xs text-slate-400">{`Hari ${label}`}</p>
      </div>
    );
  }
  return null;
};

export function DailyRainChart({ data }: { data: UltimateWeatherData }) {
  const chartData = formatChartData(data.forecast.daily);

  return (
    <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-3">
          <CloudRain className="h-7 w-7 text-blue-400" />
          <h3 className="text-2xl font-bold text-foreground">Probabilitas Hujan</h3>
        </div>
        <p className="text-muted-foreground mb-4">Perkiraan kemungkinan hujan untuk 5 hari ke depan.</p>
        <div className="w-full h-[200px] pl-0 pr-4 sm:pr-6">
            <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" vertical={false} />
                <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    tickFormatter={(value) => `${value}%`}
                    domain={[0, 100]}
                />
                <Tooltip 
                    content={<CustomTooltip />}
                    cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }} // Warna latar saat hover
                />
                <Bar dataKey="chanceOfRain" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
}