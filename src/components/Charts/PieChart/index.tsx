import { useCallback, useState } from 'react';
import { 
  PieChart as PieRechart,
  Pie,
  Cell,
  ResponsiveContainer,
  Sector,
  Text
} from 'recharts';

const colors = ['#03bb85', '#e57878', '#8884d8', '#ff8042', '#ffbb28', '#8257e5'];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Text 
        x={cx} 
        y={cy} 
        width={100} 
        textAnchor="middle"
        verticalAnchor='middle'
      >
        {payload.name}
      </Text>

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />

      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />

      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />

      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />

      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {value}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        dominantBaseline="central"
        textAnchor={textAnchor}
        fill="#999"
      >
        ({(percent * 100).toFixed(2)}%)
      </text>
    </g>
  );
};

export function PieChart({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = useCallback((_, index) => {
    setActiveIndex(index);
  }, [setActiveIndex]);
  
  return (
    <ResponsiveContainer height={300} width="100%">
      <PieRechart>
        <Pie
          data={data}
          dataKey="value"
          cx='50%'
          cy='50%'
          startAngle={90}
          endAngle={-270}
          innerRadius={70}
          outerRadius={100}
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          onMouseEnter={onPieEnter}
          // label={renderActiveShape}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
      </PieRechart>
    </ResponsiveContainer>
  );
}