import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  YAxis,
} from "recharts";

import { motion } from "framer-motion";
import "../styles/pricechart.css";

function PriceChart({ data }) {
  return (
    <motion.div
      className="chart-container"
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.4,
      }}
    >
      <ResponsiveContainer
        width="100%"
        height={400}
      >
        <LineChart data={data}>
          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip
            formatter={(value) => [
              `$${Number(value).toLocaleString()}`,
              "Price",
            ]}
          />

          <Line
            type="monotone"
            dataKey="price"
            stroke="#3b82f6"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export default PriceChart;