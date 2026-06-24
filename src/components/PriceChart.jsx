import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  ReferenceDot,
  Brush,
} from "recharts";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "../styles/pricechart.css";

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  const source = payload[0]?.payload ?? {};
  const price = source.close ?? source.price;
  const volume = source.volume;
  const open = source.open;
  const high = source.high;
  const low = source.low;

  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      <p className="chart-tooltip-value">
        ${Number(price).toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </p>
      {Number.isFinite(open) && Number.isFinite(high) && Number.isFinite(low) && (
        <p className="chart-tooltip-volume">
          O {Number(open).toLocaleString(undefined, { maximumFractionDigits: 2 })} | H {Number(high).toLocaleString(undefined, { maximumFractionDigits: 2 })} | L {Number(low).toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </p>
      )}
      {Number.isFinite(volume) && (
        <p className="chart-tooltip-volume">
          Volume: ${Number(volume).toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </p>
      )}
    </div>
  );
}

function PriceChart({
  data,
  markers = [],
  activeRange = null,
  onRangeChange,
  mode = "area",
  drawMode = false,
  annotations = [],
  onPointSelect,
}) {
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    setHoverIndex(null);
  }, [data]);

  const activePoint = hoverIndex != null ? data[hoverIndex] : null;

  return (
    <motion.div
      className={drawMode ? "chart-container draw-mode" : "chart-container"}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          onMouseMove={(state) => {
            if (state?.activeTooltipIndex != null) {
              setHoverIndex(state.activeTooltipIndex);
            }
          }}
          onMouseLeave={() => setHoverIndex(null)}
          onClick={(state) => {
            if (!drawMode || state?.activeTooltipIndex == null) return;

            const point = state.activePayload?.[0]?.payload;
            if (!point) return;

            const xAxis = state.xAxisMap?.[Object.keys(state.xAxisMap ?? {})[0]];
            const yAxis = state.yAxisMap?.[Object.keys(state.yAxisMap ?? {})[0]];
            const x = xAxis?.scale?.(state.activeLabel);
            const y = yAxis?.scale?.(point.close ?? point.price);

            if (Number.isFinite(x) && Number.isFinite(y)) {
              onPointSelect?.({
                x,
                y,
                index: state.activeTooltipIndex,
                label: point.date,
                price: point.close ?? point.price,
              });
            }
          }}
        >
          <defs>
            <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.34} />
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="volumeFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.04} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={{ stroke: "rgba(148,163,184,0.18)" }}
            tickLine={false}
            minTickGap={26}
          />
          <YAxis
            yAxisId="price"
            orientation="left"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={{ stroke: "rgba(148,163,184,0.18)" }}
            tickLine={false}
            width={74}
            domain={["auto", "auto"]}
          />
          <YAxis yAxisId="volume" orientation="right" hide domain={["auto", "auto"]} />
          <Tooltip content={<ChartTooltip />} />

          {markers.map((marker) => (
            <ReferenceLine
              key={marker.label}
              yAxisId="price"
              y={marker.value}
              stroke={marker.color}
              strokeDasharray="4 4"
              label={{
                value: marker.label,
                fill: marker.color,
                position: "insideTopRight",
                fontSize: 12,
              }}
            />
          ))}

          {activePoint && (
            <ReferenceDot
              yAxisId="price"
              x={activePoint.date}
              y={activePoint.close ?? activePoint.price}
              r={6}
              fill="#facc15"
              stroke="#fff"
              strokeWidth={2}
            />
          )}

          {mode === "area" ? (
            <Area
              yAxisId="price"
              type="monotone"
              dataKey="price"
              stroke="#60a5fa"
              strokeWidth={2.4}
              fill="url(#priceFill)"
              dot={false}
              activeDot={{
                r: 6,
                stroke: "#fff",
                strokeWidth: 2,
                fill: "#8b5cf6",
              }}
            />
          ) : (
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="price"
              stroke="#60a5fa"
              strokeWidth={2.4}
              dot={false}
              activeDot={{
                r: 6,
                stroke: "#fff",
                strokeWidth: 2,
                fill: "#8b5cf6",
              }}
            />
          )}

          <Bar
            yAxisId="volume"
            dataKey="volume"
            barSize={3}
            fill="url(#volumeFill)"
            opacity={0.6}
          />

          <Brush
            dataKey="date"
            height={28}
            stroke="#60a5fa"
            fill="rgba(15, 23, 42, 0.95)"
            travellerWidth={10}
            startIndex={activeRange?.startIndex}
            endIndex={activeRange?.endIndex}
            onChange={onRangeChange}
          />
        </ComposedChart>
      </ResponsiveContainer>

      {drawMode && <div className="chart-draw-hint">Click two points to draw a trend line.</div>}
    </motion.div>
  );
}

export default PriceChart;
