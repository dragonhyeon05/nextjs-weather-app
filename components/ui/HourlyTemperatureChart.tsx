import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  CartesianGrid,
} from "recharts";
import { UltimateWeatherData } from "@/lib/types";

interface ChartData {
  time: string;
  temp: number;
}

const formatChartData = (hourlyData: UltimateWeatherData['forecast']['hourly']): ChartData[] => {
  if (!hourlyData) return [];
  return hourlyData.slice(0, 24).map((item) => ({
    time: new Date(item.time * 1000).getHours().toString().padStart(2, '0') + ':00',
    temp: item.temp,
  }));
};

// Komponen Tooltip Kustom
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-md shadow-lg">
        <p className="font-bold text-slate-100">{`${payload[0].value.toFixed(1)}°C`}</p>
        <p className="text-xs text-slate-400">{`Pukul ${label}`}</p>
      </div>
    );
  }
  return null;
};

export function HourlyTemperatureChart({ data }: { data: UltimateWeatherData }) {
  const chartData = formatChartData(data.forecast.hourly);

  // Menentukan suhu min/max untuk padding pada sumbu Y
  const temps = chartData.map(d => d.temp);
  const yDomain = [Math.min(...temps) - 2, Math.max(...temps) + 2];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          {/* Palet warna gradien baru */}
          <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#818cf8" stopOpacity={0.7} />
            <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="time"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#94a3b8", fontSize: 12 }}
          tickFormatter={(time) => (parseInt(time) % 6 === 0 ? time : "")}
        />
        <YAxis
          dataKey="temp"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#94a3b8", fontSize: 12 }}
          // Menambahkan simbol ° pada sumbu Y
          tickFormatter={(value) => `${Math.round(value)}°`}
          domain={yDomain}
        />
        {/* Menambahkan garis grid horizontal */}
        <CartesianGrid strokeDasharray="3 3" stroke="#475569" vertical={false} />
        <Tooltip 
          content={<CustomTooltip />}
          // Kursor vertikal saat hover
          cursor={{ stroke: '#a78bfa', strokeWidth: 1, strokeDasharray: '3 3' }}
        />
        <Area
          type="monotone"
          dataKey="temp"
          stroke="#a78bfa" // Warna garis baru
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorTemp)"
          // Titik aktif saat hover
          activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2, fill: '#a78bfa' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}