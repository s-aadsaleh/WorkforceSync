
import React from 'react';

const CustomizedContent: React.FC<any> = ({ x, y, width, height, name, color }) => {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color || 'transparent'} // Use color if available, else transparent
        stroke="none"
        strokeWidth={2}
      />
      {name && (
        <text
          x={x + width / 2} // Center horizontally
          y={y + height / 2} // Center vertically
          textAnchor="middle"
          fill="#000"
          fontSize={14}
          dominantBaseline="middle"
        >
          {name}
        </text>
      )}
    </g>
  );
};

export default CustomizedContent;
