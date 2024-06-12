import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import { getAssetsData } from "@/lib/appwrite/api";

interface Asset {
  AssetsID: string;
  AssetsName: string;
  AssetsStatus: string;
  AssetsType: string;
}


const AssetsPieChart: React.FC = () => {
  const [assets, setAssets] = useState<Asset[] | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const fetchAssets = async () => {
      const assetsData = await getAssetsData() as Asset[] | null;
      if (assetsData) {
        setAssets(assetsData);
      }
    };
    fetchAssets();
  }, []);

const onPieEnter = (_: null | undefined, index: number) => {
    setActiveIndex(index);
};


  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * (startAngle + endAngle) / 2);
    const cos = Math.cos(-RADIAN * (startAngle + endAngle) / 2);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;

    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
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
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        {/* <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Number of Assets: ${payload.value}`}</text> */}
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
          <tspan x={ex + (cos >= 0 ? 1 : -1) * 12} dy="0">Number of</tspan>
          <tspan x={ex + (cos >= 0 ? 1 : -1) * 12} dy="1.2em">Assets: {payload.value}</tspan>
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy="2.4em" textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
  

  const data = assets?.reduce((acc, asset) => {
    const existing = acc.find(item => item.name === asset.AssetsStatus);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: asset.AssetsStatus, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx="50%"
        cy="45%"
        innerRadius={70}
        outerRadius={90}
        fill="#9c27b0"
        dataKey="value"
        paddingAngle={4}
        onMouseEnter={onPieEnter}
        animationBegin={0} // Start animation immediately
        animationDuration={1000} // Animation duration in milliseconds
        
      />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AssetsPieChart;
