import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', uv: 4000, amt: 2400 },
  { name: 'Feb', uv: 3000, amt: 2210 },
  { name: 'Mar', uv: 2000, amt: 2290 },
  { name: 'Apr', uv: 2780, amt: 2000 },
  { name: 'May', uv: 1890, amt: 2181 },
  { name: 'June', uv: 2390, amt: 2500 },
  { name: 'July', uv: 3490, amt: 2100 },
  { name: 'Aug', uv: 1490, amt: 2100 },
  { name: 'Sep', uv: 3090, amt: 2100 },
  { name: 'Oct', uv: 3111, amt: 2100 },
  { name: 'Nov', uv: 1987, amt: 2100 },
  { name: 'Dec', uv: 2490, amt: 2100 },
];

const BarChartComponent = () => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid  horizontal={true} vertical={false} />
          <XAxis dataKey="name" />
          <YAxis
            tickFormatter={(value) => `${value / 1000}k`} // Converts numbers to "k" format
          />
          <Tooltip cursor={{fill: 'transparent'}} />
          <Legend />
          <Bar dataKey="uv" fill="#00000" barSize={40}  />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default BarChartComponent;