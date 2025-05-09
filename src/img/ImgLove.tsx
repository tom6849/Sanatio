import React from "react";
import Svg, { Path } from "react-native-svg";

const ImgLove = ({ size = 40, color = "black" }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <Path
      d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.99 10.99 0 0 0 15 8"
      fill={color}
      stroke="#4D82F3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
);

export default ImgLove;
